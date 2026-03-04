# 🕵️ 链上侦探 - Onchain Detective

> 🦞 **OKX OnchainOS「AI 松」比赛参赛作品**

AI 驱动的链上代币风险分析工具，帮你识别貔貅盘、检测庄家控盘、追踪资金流向。

![Banner](./docs/banner.png)

---

## ✨ 功能特性

### 🔍 持有人分布分析
- 检测前 20 大持有人地址
- 计算持仓集中度
- 识别庄家控盘风险

### 🛡️ 貔貅盘检测
- 智能识别无法卖出的陷阱代币
- 流动性风险评估
- 交易异常检测

### 💸 资金流向追踪
- 大额转账监控
- 异常交易行为分析
- 钱包地址关联分析

### 🤖 AI 智能分析
- 自动生成风险评估报告
- 多维度风险评分 (0-100)
- 投资建议生成

---

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 填入你的 OKX API 密钥

# 启动开发服务器
npm run dev
```

访问 `http://localhost:3000`

### 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

或者在 Vercel 官网导入 GitHub 仓库自动部署。

---

## 📖 使用说明

1. **输入代币合约地址** - 支持多链 (X Layer, Solana, Ethereum, Base, BSC)
2. **点击"开始分析"** - 系统自动获取链上数据
3. **查看风险报告** - 包含风险评分、持有人分析、AI 建议

### 示例地址

**X Layer:**
- TITAN: `0xfdc4a45a4bf53957b2c73b1ff323d8cbe39118dd`
- xETH: `0xe7b000003a45145decf8a28fc755ad5ec5ea025a`

---

## 🏗️ 技术架构

### 前端
- **框架**: Next.js 14
- **样式**: Tailwind CSS
- **部署**: Vercel

### 后端
- **API**: Next.js API Routes
- **数据源**: OKX OnchainOS DEX API
- **认证**: HMAC-SHA256 签名

### AI 集成
- **Claw**: OpenClaw 2026.3.2
- **大模型**: Qwen 3.5 Plus
- **技能**: OKX OnchainOS Skills

---

## 📊 风险评分说明

| 分数 | 等级 | 建议 |
|------|------|------|
| 80-100 | 低风险 | 可放心投资 |
| 60-79 | 中风险 | 谨慎参与，设置止损 |
| 40-59 | 高风险 | 避免大额投入 |
| 0-39 | 极高风险 | 强烈建议避开 |

---

## 🔐 环境变量

```env
OKX_API_KEY=your_api_key
OKX_SECRET_KEY=your_secret_key
OKX_PASSPHRASE=your_passphrase
```

在 [OKX 开发者门户](https://web3.okx.com/onchain-os/dev-portal) 申请 API 密钥。

---

## 📝 比赛信息

**比赛名称**: OKX OnchainOS「AI 松」

**参赛信息**:
- **Claw 型号**: OpenClaw 2026.3.2
- **大模型**: Qwen 3.5 Plus
- **应用场景**: Web3 代币风险检测
- **提示词**: 见 [docs/prompt.md](./docs/prompt.md)

**提交内容**:
- ✅ 成品代码 (本仓库)
- ✅ 前端演示 (Vercel 部署)
- ✅ 互动截图/视频 (见 docs/)

---

## 🎯 核心优势

1. **实时数据** - 直连 OKX DEX API，数据准确及时
2. **多维度分析** - 持有人、流动性、市值综合评估
3. **AI 赋能** - 智能生成分析报告和投资建议
4. **用户友好** - 简洁界面，一键分析
5. **多链支持** - 覆盖主流公链

---

## 📸 截图

![主页](./docs/screenshot-home.png)
*主页 - 输入代币地址*

![分析结果](./docs/screenshot-result.png)
*分析结果 - 风险评分和详细报告*

---

## 🤝 贡献

欢迎提交 Issue 和 PR！

---

## 📄 许可证

Apache-2.0

---

## 🔗 链接

- **在线演示**: [https://onchain-detective.vercel.app](https://onchain-detective.vercel.app)
- **OKX OnchainOS**: [https://web3.okx.com/onchain-os](https://web3.okx.com/onchain-os)
- **比赛推文**: [https://x.com/okxchinese/status/2029144507737116988](https://x.com/okxchinese/status/2029144507737116988)

---

**🦞 Built for OKX OnchainOS「AI 松」by OpenClaw + Qwen 3.5 Plus**
