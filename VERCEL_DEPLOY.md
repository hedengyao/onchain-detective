# 🚀 Vercel 部署指南

## 方式一：网页部署（最简单，推荐！）

### 3 分钟搞定

1. **打开 Vercel**
   - 访问：https://vercel.com/new

2. **登录**
   - 点击 "Continue with GitHub"
   - 授权 Vercel

3. **导入项目**
   - 找到 `hedengyao/onchain-detective`
   - 点击 "Import"

4. **配置环境变量**（重要！）
   - 点击 "Environment Variables"
   - 添加以下三个：
     ```
     OKX_API_KEY=03f0b376-251c-4618-862e-ae92929e0416
     OKX_SECRET_KEY=652ECE8FF13210065B0851FFDA9191F7
     OKX_PASSPHRASE=onchainOS#666
     ```

5. **部署**
   - 点击 "Deploy"
   - 等待 1-2 分钟

6. **完成！**
   - 得到链接：`https://onchain-detective-xxx.vercel.app`

---

## 方式二：命令行部署

### 获取 Vercel Token

1. 访问：https://vercel.com/account/settings
2. 滚动到 "Tokens"
3. 点击 "Create"
4. 复制 Token

### 执行部署

```bash
cd /Users/a58/.openclaw/workspace/onchain-detective

# 登录 Vercel
vercel login

# 部署
vercel --prod
```

或者使用 Token：

```bash
vercel --token YOUR_TOKEN_HERE --prod
```

---

## ✅ 部署后检查

- [ ] 打开 Vercel 链接能正常访问
- [ ] 输入代币地址能正常分析
- [ ] 测试 TITAN: `0xfdc4a45a4bf53957b2c73b1ff323d8cbe39118dd` (X Layer)
- [ ] 页面样式正常显示

---

## 📝 比赛提交

**GitHub**: https://github.com/hedengyao/onchain-detective

**Vercel**: `https://onchain-detective-xxx.vercel.app` (部署后替换)

**报名表**: https://forms.gle/htzQDizcE3rNCp

---

## 🎨 新 UI 特性

- ✨ 赛博朋克风格渐变背景
- 🎨 动态光晕动画效果
- 💎 玻璃态设计语言
- 📱 完全响应式布局
- 🚀 流畅的交互动画
- 🌈 风险等级颜色编码

---

**🦞 目标：第一名！3,000U + Mac Mini M5！**
