import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [tokenAddress, setTokenAddress] = useState('')
  const [chainId, setChainId] = useState('196')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const chainOptions = [
    { value: '196', label: 'X Layer' },
    { value: '501', label: 'Solana' },
    { value: '1', label: 'Ethereum' },
    { value: '8453', label: 'Base' },
    { value: '56', label: 'BSC' },
  ]

  const analyzeToken = async () => {
    if (!tokenAddress) {
      setError('请输入代币合约地址')
      return
    }

    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      // 模拟 API 调用（实际应该调用后端 API）
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenAddress, chainId }),
      })

      const data = await response.json()
      setAnalysis(data)
    } catch (err) {
      setError('分析失败，请检查地址是否正确')
    } finally {
      setLoading(false)
    }
  }

  const getRiskLevel = (score) => {
    if (score >= 80) return { level: '低风险', color: 'text-green-400', bg: 'bg-green-900/30' }
    if (score >= 60) return { level: '中风险', color: 'text-yellow-400', bg: 'bg-yellow-900/30' }
    if (score >= 40) return { level: '高风险', color: 'text-orange-400', bg: 'bg-orange-900/30' }
    return { level: '极高风险', color: 'text-red-400', bg: 'bg-red-900/30' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Head>
        <title>链上侦探 | Onchain Detective</title>
        <meta name="description" content="AI 驱动的链上侦探工具" />
      </Head>

      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🕵️</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                链上侦探
              </h1>
            </div>
            <div className="text-sm text-gray-400">
              Powered by OKX OnchainOS + OpenClaw
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Web3 代币风险检测专家
          </h2>
          <p className="text-gray-400 text-lg mb-6">
            使用 AI 分析代币持有人分布、识别貔貅盘、追踪资金流向
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-gray-900/50 rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">代币合约地址</label>
              <input
                type="text"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder="0x..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">选择链</label>
              <select
                value={chainId}
                onChange={(e) => setChainId(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
              >
                {chainOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={analyzeToken}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? '分析中...' : '开始分析'}
          </button>
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        </div>

        {/* Results Section */}
        {analysis && (
          <div className="space-y-6">
            {/* Risk Score */}
            <div className={`rounded-2xl p-6 border ${getRiskLevel(analysis.riskScore).bg} border-gray-700`}>
              <div className="text-center">
                <p className="text-gray-400 mb-2">风险评分</p>
                <p className={`text-5xl font-bold ${getRiskLevel(analysis.riskScore).color}`}>
                  {analysis.riskScore}/100
                </p>
                <p className={`text-xl mt-2 ${getRiskLevel(analysis.riskScore).color}`}>
                  {getRiskLevel(analysis.riskScore).level}
                </p>
              </div>
            </div>

            {/* Analysis Details */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Holder Analysis */}
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span>📊</span> 持有人分析
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">总持有人</span>
                    <span className="font-semibold">{analysis.holders?.total || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">前 10 大持有人占比</span>
                    <span className={`font-semibold ${analysis.holders?.top10Percent > 50 ? 'text-red-400' : 'text-green-400'}`}>
                      {analysis.holders?.top10Percent || 'N/A'}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">最大持有人占比</span>
                    <span className={`font-semibold ${analysis.holders?.maxHolderPercent > 20 ? 'text-red-400' : 'text-green-400'}`}>
                      {analysis.holders?.maxHolderPercent || 'N/A'}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Token Info */}
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span>💰</span> 代币信息
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">代币名称</span>
                    <span className="font-semibold">{analysis.tokenInfo?.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">符号</span>
                    <span className="font-semibold">{analysis.tokenInfo?.symbol || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">市值</span>
                    <span className="font-semibold">{analysis.tokenInfo?.marketCap || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">流动性</span>
                    <span className={`font-semibold ${parseFloat(analysis.tokenInfo?.liquidity || 0) < 10000 ? 'text-red-400' : 'text-green-400'}`}>
                      {analysis.tokenInfo?.liquidity || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>⚠️</span> 风险因素
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {analysis.riskFactors?.map((factor, idx) => (
                  <div key={idx} className={`p-4 rounded-lg ${factor.severity === 'high' ? 'bg-red-900/30 border border-red-800' : factor.severity === 'medium' ? 'bg-yellow-900/30 border border-yellow-800' : 'bg-green-900/30 border border-green-800'}`}>
                    <p className="font-semibold mb-1">{factor.title}</p>
                    <p className="text-sm text-gray-400">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-800">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 智能分析
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {analysis.aiAnalysis || '暂无 AI 分析结果'}
              </p>
            </div>
          </div>
        )}

        {/* Features Section */}
        {!analysis && (
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">持有人分布分析</h3>
              <p className="text-gray-400">检测前 20 大持有人，识别庄家控盘风险</p>
            </div>
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">貔貅盘检测</h3>
              <p className="text-gray-400">智能识别无法卖出的陷阱代币</p>
            </div>
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-xl font-semibold mb-2">资金流向追踪</h3>
              <p className="text-gray-400">监控大额转账和异常交易行为</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>🦞 参加 OKX OnchainOS「AI 松」比赛作品</p>
          <p className="text-sm mt-2">Built with OpenClaw 2026.3.2 + OKX OnchainOS API</p>
        </div>
      </footer>
    </div>
  )
}
