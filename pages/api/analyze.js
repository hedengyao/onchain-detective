import crypto from 'crypto'

const OKX_API_KEY = process.env.OKX_API_KEY || '03f0b376-251c-4618-862e-ae92929e0416'
const OKX_SECRET_KEY = process.env.OKX_SECRET_KEY || '652ECE8FF13210065B0851FFDA9191F7'
const OKX_PASSPHRASE = process.env.OKX_PASSPHRASE || 'onchainOS#666'
const BASE_URL = 'https://web3.okx.com'

function generateSignature(timestamp, method, path, body = '') {
  const message = timestamp + method + path + body
  return crypto
    .createHmac('sha256', OKX_SECRET_KEY)
    .update(message)
    .digest('base64')
}

async function okxFetch(method, path, body = null) {
  const timestamp = new Date().toISOString()
  const bodyStr = body ? JSON.stringify(body) : ''
  const signature = generateSignature(timestamp, method, path, bodyStr)

  const headers = {
    'OK-ACCESS-KEY': OKX_API_KEY,
    'OK-ACCESS-SIGN': signature,
    'OK-ACCESS-PASSPHRASE': OKX_PASSPHRASE,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'Content-Type': 'application/json',
  }

  const url = `${BASE_URL}${path}`
  const response = await fetch(url, {
    method,
    headers,
    ...(body && { body: bodyStr }),
  })

  const json = await response.json()
  if (json.code !== '0') {
    throw new Error(`API Error: ${json.code} - ${json.msg}`)
  }
  return json.data
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { tokenAddress, chainId } = req.body

    // 1. 获取代币基本信息
    const tokenInfo = await okxFetch('POST', '/api/v6/dex/market/token/basic-info', [
      { chainIndex: chainId, tokenContractAddress: tokenAddress.toLowerCase() }
    ])

    // 2. 获取价格和市值信息
    const priceInfo = await okxFetch('POST', '/api/v6/dex/market/price-info', [
      { chainIndex: chainId, tokenContractAddress: tokenAddress.toLowerCase() }
    ])

    // 3. 获取持有人分布
    const holders = await okxFetch('GET', `/api/v6/dex/market/token/holder?chainIndex=${chainId}&tokenContractAddress=${tokenAddress.toLowerCase()}`)

    // 4. 分析风险
    const analysis = analyzeRisk(tokenInfo[0], priceInfo[0], holders)

    res.status(200).json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    res.status(500).json({ error: error.message })
  }
}

function analyzeRisk(tokenInfo, priceInfo, holders) {
  const riskFactors = []
  let riskScore = 100

  // 分析持有人集中度
  const holderData = holders || []
  const totalSupply = parseFloat(priceInfo?.circSupply || 1)
  
  let top10Percent = 0
  let maxHolderPercent = 0

  holderData.slice(0, 10).forEach(holder => {
    const percent = (parseFloat(holder.holdAmount) / totalSupply) * 100
    top10Percent += percent
    if (percent > maxHolderPercent) maxHolderPercent = percent
  })

  // 风险评分逻辑
  if (top10Percent > 80) {
    riskScore -= 30
    riskFactors.push({
      title: '持有人高度集中',
      description: `前 10 大持有人持有 ${top10Percent.toFixed(1)}% 代币，存在庄家控盘风险`,
      severity: 'high'
    })
  } else if (top10Percent > 50) {
    riskScore -= 15
    riskFactors.push({
      title: '持有人较为集中',
      description: `前 10 大持有人持有 ${top10Percent.toFixed(1)}% 代币`,
      severity: 'medium'
    })
  }

  if (maxHolderPercent > 30) {
    riskScore -= 20
    riskFactors.push({
      title: '单一持有人占比过高',
      description: `最大持有人持有 ${maxHolderPercent.toFixed(1)}% 代币`,
      severity: 'high'
    })
  }

  // 流动性风险
  const liquidity = parseFloat(priceInfo?.liquidity || 0)
  if (liquidity < 10000) {
    riskScore -= 25
    riskFactors.push({
      title: '流动性极低',
      description: `流动性仅 $${liquidity.toFixed(2)}，可能存在无法卖出的风险`,
      severity: 'high'
    })
  } else if (liquidity < 100000) {
    riskScore -= 10
    riskFactors.push({
      title: '流动性较低',
      description: `流动性 $${liquidity.toFixed(2)}，大额交易可能导致较大滑点`,
      severity: 'medium'
    })
  }

  // 市值风险
  const marketCap = parseFloat(priceInfo?.marketCap || 0)
  if (marketCap < 100000) {
    riskScore -= 15
    riskFactors.push({
      title: '市值过小',
      description: `市值仅 $${marketCap.toFixed(2)}，价格波动可能非常剧烈`,
      severity: 'medium'
    })
  }

  // 如果没有风险因素
  if (riskFactors.length === 0) {
    riskFactors.push({
      title: '风险较低',
      description: '未发现明显风险因素，但仍需谨慎投资',
      severity: 'low'
    })
  }

  // 生成 AI 分析
  const aiAnalysis = generateAIAnalysis(tokenInfo, priceInfo, riskFactors)

  return {
    riskScore: Math.max(0, riskScore),
    tokenInfo: {
      name: tokenInfo?.tokenName || '未知',
      symbol: tokenInfo?.tokenSymbol || 'UNKNOWN',
      marketCap: formatNumber(priceInfo?.marketCap),
      liquidity: formatNumber(priceInfo?.liquidity),
      price: priceInfo?.price || '0',
    },
    holders: {
      total: holderData.length,
      top10Percent: top10Percent.toFixed(2),
      maxHolderPercent: maxHolderPercent.toFixed(2),
    },
    riskFactors,
    aiAnalysis,
  }
}

function generateAIAnalysis(tokenInfo, priceInfo, riskFactors) {
  const name = tokenInfo?.tokenName || '该代币'
  const symbol = tokenInfo?.tokenSymbol || 'TOKEN'
  
  let analysis = `根据对 ${name} (${symbol}) 的链上数据分析，`
  
  const highRisks = riskFactors.filter(f => f.severity === 'high')
  const mediumRisks = riskFactors.filter(f => f.severity === 'medium')
  
  if (highRisks.length > 0) {
    analysis += `发现 ${highRisks.length} 个高风险因素：${highRisks.map(f => f.title).join('、')}。`
    analysis += '建议谨慎投资，避免大额买入。'
  } else if (mediumRisks.length > 0) {
    analysis += `发现 ${mediumRisks.length} 个中等风险因素。`
    analysis += '可以小额参与，但需设置止损。'
  } else {
    analysis += '未发现重大风险因素。'
    analysis += '基本面较为健康，可适当关注。'
  }

  const liquidity = parseFloat(priceInfo?.liquidity || 0)
  if (liquidity > 1000000) {
    analysis += ` 流动性充足 ($${(liquidity/1000000).toFixed(2)}M)，交易滑点可控。`
  }

  return analysis
}

function formatNumber(num) {
  if (!num) return 'N/A'
  const n = parseFloat(num)
  if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`
  if (n >= 1e3) return `$${(n/1e3).toFixed(2)}K`
  return `$${n.toFixed(2)}`
}
