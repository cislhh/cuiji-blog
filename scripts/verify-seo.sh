#!/bin/bash

# SEO 快速验证脚本
# 使用方法: ./scripts/verify-seo.sh

echo "🔍 SEO 验证脚本"
echo "=================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查本地构建
echo "📦 1. 检查本地构建..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ 构建成功${NC}"
else
    echo -e "${RED}❌ 构建失败${NC}"
    exit 1
fi

# 检查 sitemap.xml 是否生成
echo ""
echo "📄 2. 检查 sitemap.xml..."
if [ -f ".next/server/app/sitemap.xml.body" ]; then
    echo -e "${GREEN}✅ sitemap.xml 已生成${NC}"

    # 检查是否包含正确的域名
    if grep -q "www.azocuiji.com" .next/server/app/sitemap.xml.body; then
        echo -e "${GREEN}✅ 域名正确${NC}"
    else
        echo -e "${RED}❌ 域名错误${NC}"
    fi

    # 检查是否包含 priority 和 changefreq
    if grep -q "priority" .next/server/app/sitemap.xml.body && grep -q "changefreq" .next/server/app/sitemap.xml.body; then
        echo -e "${GREEN}✅ 包含 priority 和 changefreq${NC}"
    else
        echo -e "${YELLOW}⚠️  缺少 priority 或 changefreq${NC}"
    fi
else
    echo -e "${RED}❌ sitemap.xml 未生成${NC}"
fi

# 检查 robots.txt
echo ""
echo "🤖 3. 检查 robots.txt..."
if [ -f ".next/server/app/robots.txt.body" ]; then
    echo -e "${GREEN}✅ robots.txt 已生成${NC}"

    if grep -q "www.azocuiji.com/sitemap.xml" .next/server/app/robots.txt.body; then
        echo -e "${GREEN}✅ sitemap URL 正确${NC}"
    else
        echo -e "${RED}❌ sitemap URL 错误${NC}"
    fi
else
    echo -e "${RED}❌ robots.txt 未生成${NC}"
fi

# 检查博客文章元数据
echo ""
echo "📝 4. 检查博客文章元数据..."
BLOG_COUNT=$(find data/blog -name "*.mdx" ! -name "draft*" | wc -l)
echo "博客文章总数: $BLOG_COUNT"

WITH_KEYWORDS=$(find data/blog -name "*.mdx" -exec grep -l "^keywords:" {} \; | wc -l)
echo "有 keywords 的文章: $WITH_KEYWORDS"

WITH_DESCRIPTION=$(find data/blog -name "*.mdx" -exec grep -l "^description:" {} \; | wc -l)
echo "有 description 的文章: $WITH_DESCRIPTION"

if [ $WITH_KEYWORDS -eq $BLOG_COUNT ]; then
    echo -e "${GREEN}✅ 所有文章都有 keywords${NC}"
else
    echo -e "${YELLOW}⚠️  有 $((BLOG_COUNT - WITH_KEYWORDS)) 篇文章缺少 keywords${NC}"
fi

if [ $WITH_DESCRIPTION -eq $BLOG_COUNT ]; then
    echo -e "${GREEN}✅ 所有文章都有 description${NC}"
else
    echo -e "${YELLOW}⚠️  有 $((BLOG_COUNT - WITH_DESCRIPTION)) 篇文章缺少 description${NC}"
fi

# 检查配置文件
echo ""
echo "⚙️  5. 检查配置文件..."
if grep -q "www.azocuiji.com" data/siteMetadata.js; then
    echo -e "${GREEN}✅ siteMetadata.js 域名正确${NC}"
else
    echo -e "${RED}❌ siteMetadata.js 域名错误${NC}"
fi

if grep -q "locale: 'zh_CN'" app/layout.tsx; then
    echo -e "${GREEN}✅ layout.tsx locale 正确${NC}"
else
    echo -e "${RED}❌ layout.tsx locale 错误${NC}"
fi

echo ""
echo "=================="
echo -e "${GREEN}✨ 验证完成！${NC}"
echo ""
echo "下一步："
echo "1. 部署到 Vercel: git push"
echo "2. 访问 https://www.azocuiji.com/sitemap.xml 验证"
echo "3. 使用 Google Rich Results Test 验证结构化数据"
echo "   https://search.google.com/test/rich-results"
echo ""
