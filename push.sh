#!/bin/bash

echo "🚀 开始推送到 GitHub..."
echo ""

cd /Users/a58/.openclaw/workspace/onchain-detective

# 设置 Git 用户信息
git config user.name "hedengyao"
git config user.email "hedengyao@users.noreply.github.com"

# 设置远程仓库为 HTTPS
git remote set-url origin https://github.com/hedengyao/onchain-detective.git

echo "📦 推送代码到 GitHub..."
echo ""
echo "当提示输入用户名时，输入：hedengyao"
echo "当提示输入密码时，粘贴你的 Personal Access Token"
echo ""
echo "如果还没有 Token，请访问：https://github.com/settings/tokens/new"
echo ""

# 推送
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "🔗 GitHub 仓库：https://github.com/hedengyao/onchain-detective"
    echo ""
    echo "下一步：去 Vercel 部署"
    echo "👉 https://vercel.com/new"
else
    echo ""
    echo "❌ 推送失败，请检查网络或权限"
fi
