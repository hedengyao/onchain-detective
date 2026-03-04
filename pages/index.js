import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [tokenAddress, setTokenAddress] = useState('')
  const [chainId, setChainId] = useState('196')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const chainOptions = [
    { value: '196', label: 'X Layer', color: 'from-blue-500 to-cyan-500' },
    { value: '501', label: 'Solana', color: 'from-purple-500 to-pink-500' },
    { value: '1', label: 'Ethereum', color: 'from-indigo-500 to-blue-500' },
    { value: '8453', label: 'Base', color: 'from-blue-600 to-blue-400' },
    { value: '56', label: 'BSC', color: 'from-yellow-500 to-orange-500' },
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
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenAddress, chainId }),
      })

      const data = await response.json()
      if (data.error) {
        setError(data.error)
      } else {
        setAnalysis(data)
      }
    } catch (err) {
      setError('分析失败，请检查地址是否正确')
    } finally {
      setLoading(false)
    }
  }

  const getRiskLevel = (score) => {
    if (score >= 80) return { 
      level: '安全', 
      color: 'from-emerald-400 to-cyan-400',
      bg: 'from-emerald-500/10 to-cyan-500/10',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/20'
    }
    if (score >= 60) return { 
      level: '关注', 
      color: 'from-blue-400 to-indigo-400',
      bg: 'from-blue-500/10 to-indigo-500/10',
      border: 'border-blue-500/30',
      glow: 'shadow-blue-500/20'
    }
    if (score >= 40) return { 
      level: '风险', 
      color: 'from-orange-400 to-amber-400',
      bg: 'from-orange-500/10 to-amber-500/10',
      border: 'border-orange-500/30',
      glow: 'shadow-orange-500/20'
    }
    return { 
      level: '危险', 
      color: 'from-red-500 to-rose-500',
      bg: 'from-red-500/10 to-rose-500/10',
      border: 'border-red-500/30',
      glow: 'shadow-red-500/20'
    }
  }

  const quickTokens = [
    { name: 'TITAN', address: '0xfdc4a45a4bf53957b2c73b1ff323d8cbe39118dd', chain: '196' },
    { name: 'xETH', address: '0xe7b000003a45145decf8a28fc755ad5ec5ea025a', chain: '196' },
    { name: 'xBTC', address: '0x753925d86b66626f8c45460b257b0a3e7999bf7e', chain: '196' },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Head>
        <title>链上侦探 | Onchain Detective</title>
        <meta name="description" content="AI 驱动的 Web3 代币风险分析工具" />
      </Head>

      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* 导航栏 */}
      <nav className="relative border-b border-white/10 backdrop-blur-xl bg-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🕵️</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  链上侦探
                </h1>
                <p className="text-xs text-gray-500">Onchain Detective</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 hidden sm:block">Powered by</span>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">OKX</span>
                <span className="text-gray-600">|</span>
                <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">OnchainOS</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="relative max-w-7xl mx-auto px-6 py-12">
        {!analysis ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
                <span className="text-2xl">🦞</span>
                <span className="text-sm text-purple-300">OKX OnchainOS「AI 松」参赛作品</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Web3 代币风险检测
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  专家
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                使用 AI 分析代币持有人分布、识别貔貅盘、追踪资金流向，让你的投资决策更明智
              </p>
            </div>

            {/* 输入区域 */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                        <span>💎</span> 代币合约地址
                      </label>
                      <input
                        type="text"
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        placeholder="0x..."
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                        <span>⛓️</span> 选择链
                      </label>
                      <select
                        value={chainId}
                        onChange={(e) => setChainId(e.target.value)}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition text-white"
                      >
                        {chainOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 快速选择 */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-500 mb-2">🔥 热门代币：</p>
                    <div className="flex flex-wrap gap-2">
                      {quickTokens.map((token) => (
                        <button
                          key={token.address}
                          onClick={() => {
                            setTokenAddress(token.address)
                            setChainId(token.chain)
                          }}
                          className="px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition"
                        >
                          {token.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={analyzeToken}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/25"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        AI 分析中...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>🚀</span> 开始分析
                      </span>
                    )}
                  </button>

                  {error && (
                    <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-center">
                      ⚠️ {error}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 功能特性 */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '📊',
                  title: '持有人分析',
                  desc: '检测前 20 大持有人，识别庄家控盘风险',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  icon: '🛡️',
                  title: '貔貅盘检测',
                  desc: '智能识别无法卖出的陷阱代币',
                  gradient: 'from-cyan-500 to-blue-500'
                },
                {
                  icon: '🤖',
                  title: 'AI 智能报告',
                  desc: '自动生成风险评估和投资建议',
                  gradient: 'from-pink-500 to-rose-500'
                }
              ].map((feature, idx) => (
                <div key={idx} className="group relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`}></div>
                  <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* 返回按钮 */}
            <button
              onClick={() => setAnalysis(null)}
              className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <span>←</span> 返回搜索
            </button>

            {/* 风险评分卡片 */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${getRiskLevel(analysis.riskScore).bg} border ${getRiskLevel(analysis.riskScore).border} backdrop-blur-xl`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"></div>
                <div className="relative text-center">
                  <p className="text-gray-400 mb-2 text-lg">风险评分</p>
                  <div className={`text-7xl font-bold bg-gradient-to-r ${getRiskLevel(analysis.riskScore).color} bg-clip-text text-transparent mb-4`}>
                    {analysis.riskScore}/100
                  </div>
                  <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${getRiskLevel(analysis.riskScore).color} ${getRiskLevel(analysis.riskScore).glow} shadow-lg`}>
                    <span className="text-2xl">{analysis.riskScore >= 80 ? '✅' : analysis.riskScore >= 60 ? '⚠️' : '🚫'}</span>
                    <span className="text-xl font-semibold text-white">{getRiskLevel(analysis.riskScore).level}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 详细信息 */}
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
              {/* 代币信息 */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-2xl">💰</span> 代币信息
                </h3>
                <div className="space-y-4">
                  {[
                    { label: '名称', value: analysis.tokenInfo?.name },
                    { label: '符号', value: analysis.tokenInfo?.symbol },
                    { label: '市值', value: analysis.tokenInfo?.marketCap },
                    { label: '流动性', value: analysis.tokenInfo?.liquidity },
                    { label: '价格', value: `$${parseFloat(analysis.tokenInfo?.price || 0).toFixed(6)}` },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="font-semibold">{item.value || 'N/A'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 持有人分析 */}
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-2xl">📊</span> 持有人分析
                </h3>
                <div className="space-y-4">
                  {[
                    { label: '总持有人数', value: analysis.holders?.total || 'N/A' },
                    { label: '前 10 大占比', value: `${analysis.holders?.top10Percent || 0}%`, warn: parseFloat(analysis.holders?.top10Percent) > 50 },
                    { label: '最大持有人', value: `${analysis.holders?.maxHolderPercent || 0}%`, warn: parseFloat(analysis.holders?.maxHolderPercent) > 20 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                      <span className="text-gray-400">{item.label}</span>
                      <span className={`font-semibold ${item.warn ? 'text-red-400' : ''}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 风险因素 */}
            <div className="max-w-6xl mx-auto mb-8">
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span> 风险因素
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {analysis.riskFactors?.map((factor, idx) => (
                    <div 
                      key={idx} 
                      className={`p-5 rounded-xl border ${
                        factor.severity === 'high' ? 'bg-red-500/10 border-red-500/30' : 
                        factor.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' : 
                        'bg-green-500/10 border-green-500/30'
                      }`}
                    >
                      <p className="font-semibold mb-2">{factor.title}</p>
                      <p className="text-sm text-gray-400">{factor.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI 分析 */}
            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-cyan-900/30 rounded-2xl p-6 border border-purple-500/30 backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 relative">
                  <span className="text-2xl">🤖</span> AI 智能分析
                </h3>
                <p className="text-gray-300 leading-relaxed relative">
                  {analysis.aiAnalysis || '暂无 AI 分析结果'}
                </p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 mb-2">
            🦞 参加 OKX OnchainOS「AI 松」比赛作品
          </p>
          <p className="text-sm text-gray-600">
            Built with ❤️ by OpenClaw 2026.3.2 + Qwen 3.5 Plus
          </p>
        </div>
      </footer>
    </div>
  )
}
