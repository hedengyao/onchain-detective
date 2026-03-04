# 🚀 链上侦探 - 快速部署指南

> 🦞 OKX OnchainOS「AI 松」比赛 - 5 分钟部署上线

---

## 方式一：全自动部署（推荐）

### 步骤 1：创建 GitHub 仓库（1 分钟）

1. 访问 https://github.com/new
2. 填写：
   - **Repository name**: `onchain-detective`
   - **Description**: `AI-powered on-chain detective for token risk analysis - OKX OnchainOS AI Hack`
   - **Public** ✅
   - **不要** 勾选 "Add a README file"
3. 点击 "Create repository"

### 步骤 2：推送代码（1 分钟）

在终端执行以下命令（替换 `YOUR_USERNAME` 为你的 GitHub 用户名）：

```bash
cd /Users/a58/.openclaw/workspace/onchain-detective

# 配置 Git 用户信息
git config user.name "a58"
git config user.email "a58@users.noreply.github.com"

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/onchain-detective.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤 3：部署到 Vercel（2 分钟）

1. 访问 https://vercel.com/new
2. 点击 "Continue with GitHub" 登录
3. 点击 "Import Git Repository"
4. 找到 `onchain-detective` 仓库，点击 "Import"
5. **配置环境变量**（重要！）：
   ```
   OKX_API_KEY=03f0b376-251c-4618-862e-ae92929e0416
   OKX_SECRET_KEY=652ECE8FF13210065B0851FFDA9191F7
   OKX_PASSPHRASE=onchainOS#666
   ```
6. 点击 "Deploy"
7. 等待 1-2 分钟，部署完成！🎉

### 步骤 4：获取在线链接

部署完成后，Vercel 会给你一个链接，格式类似：
```
https://onchain-detective-xxx.vercel.app
```

**保存这个链接！** 这是你要提交到比赛的在线演示地址。

---

## 方式二：本地测试（可选）

如果你想先在本地看看效果：

```bash
cd /Users/a58/.openclaw/workspace/onchain-detective

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

---

## ✅ 部署检查清单

- [ ] GitHub 仓库创建成功
- [ ] 代码推送成功（能看到 commit 记录）
- [ ] Vercel 部署成功（显示 "Ready"）
- [ ] 在线访问正常（打开网页能看到 UI）
- [ ] 环境变量配置正确（API 能正常调用）
- [ ] 测试一个代币分析（确保功能正常）

---

## 📝 比赛提交

### 1. 填写报名表

访问：https://forms.gle/htzQDizcE3rNCp

填写内容：
- **项目名称**: 链上侦探 / Onchain Detective
- **GitHub 仓库**: `https://github.com/YOUR_USERNAME/onchain-detective`
- **在线演示**: `https://onchain-detective-xxx.vercel.app`
- **Claw 型号**: OpenClaw 2026.3.2
- **大模型**: Qwen 3.5 Plus

### 2. 发布 X/星球推文

复制以下内容（替换链接）：

```
🦞 参加 @okxchinese OnchainOS「AI 松」比赛！

🕵️ 我做了个「链上侦探」- AI 驱动的代币风险分析工具

✨ 功能：
- 检测貔貅盘
- 分析持有人分布
- 评估流动性风险
- AI 智能报告

🛠️ 技术栈：
- Claw: OpenClaw 2026.3.2
- 大模型：Qwen 3.5 Plus
- 部署：Vercel + Next.js

🔗 在线演示：https://onchain-detective-xxx.vercel.app
💻 代码：https://github.com/YOUR_USERNAME/onchain-detective

#OKX #OnchainOS #Web3 #AI #DeFi
```

**记得三连原推文！**

### 3. 截图（重要！）

截取以下图片保存：

1. 主页 UI
2. 输入代币地址（推荐：`0xfdc4a45a4bf53957b2c73b1ff323d8cbe39118dd` - TITAN）
3. 分析结果（风险评分）
4. 详细数据（持有人、市值等）
5. GitHub 仓库页面
6. Vercel 部署成功页面

---

## 🎯 测试用的代币地址

**X Layer 链：**
- TITAN: `0xfdc4a45a4bf53957b2c73b1ff323d8cbe39118dd` （低风险）
- xETH: `0xe7b000003a45145decf8a28fc755ad5ec5ea025a`

**Solana 链：**
- BONK: 在搜索中输入 "BONK"

---

## 💡 常见问题

### Q: Vercel 部署失败？
A: 检查环境变量是否正确配置，特别是 OKX 的三个密钥。

### Q: API 调用报错？
A: 测试密钥有速率限制，如果超限可以等几分钟重试，或者申请自己的 API 密钥。

### Q: 页面样式不对？
A: 清除浏览器缓存，或者重新部署一次。

---

## 🏆 目标：第一名！

**奖品**: 3,000U + Mac Mini M5

**我们的优势**:
- ✅ 完整的前后端实现
- ✅ 真实的业务场景
- ✅ 优秀的用户体验
- ✅ AI 智能分析
- ✅ 快速部署上线

---

**🦞 加油！冠军是我们的！**
