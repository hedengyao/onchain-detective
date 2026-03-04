#!/bin/bash

# 链上侦探 - GitHub 部署脚本
# 🦞 OKX OnchainOS「AI 松」比赛

echo "🚀 开始部署到 GitHub..."

# 配置 Git 用户信息（如果还没有配置）
git config user.name "a58"
git config user.email "a58@users.noreply.github.com"

# 创建 GitHub 仓库（需要手动执行）
echo ""
echo "📝 请按以下步骤操作："
echo ""
echo "1️⃣  在 GitHub 创建新仓库："
echo "   访问：https://github.com/new"
echo "   仓库名：onchain-detective"
echo "   描述：AI-powered on-chain detective for token risk analysis"
echo "   设为 Public ✅"
echo "   不要初始化 README 或 .gitignore ❌"
echo ""
echo "2️⃣  创建完成后，运行以下命令推送代码："
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/onchain-detective.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3️⃣  部署到 Vercel："
echo "   访问：https://vercel.com/new"
echo "   导入刚才创建的 GitHub 仓库"
echo "   添加环境变量（OKX_API_KEY 等）"
echo "   点击 Deploy 🚀"
echo ""

# 显示当前状态
echo "📊 当前 Git 状态："
git status
git log --oneline -5

echo ""
echo "✅ 本地 Git 仓库已准备好！"
