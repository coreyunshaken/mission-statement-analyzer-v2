#!/bin/bash

echo "🚀 Performance Testing for Mission Statement Analyzer"
echo "===================================================="

# Create performance reports directory
mkdir -p performance-reports

# Test production site response time
echo "📊 Testing production site performance..."
curl -w "Response time: %{time_total}s\nSize: %{size_download} bytes\nStatus: %{http_code}\n" \
     -s https://mission-statement-analyzer.vercel.app > performance-reports/prod-response-$(date +%Y%m%d).txt

# Test if Lighthouse is available
if command -v lighthouse &> /dev/null; then
    echo "🔍 Running Lighthouse audit..."
    lighthouse https://mission-statement-analyzer.vercel.app \
      --preset=desktop \
      --output=html \
      --output-path=./performance-reports/lighthouse-$(date +%Y%m%d).html \
      --quiet
    
    echo "📱 Running mobile Lighthouse audit..."
    lighthouse https://mission-statement-analyzer.vercel.app \
      --preset=mobile \
      --output=html \
      --output-path=./performance-reports/lighthouse-mobile-$(date +%Y%m%d).html \
      --quiet
else
    echo "⚠️  Lighthouse not installed. Install with: npm install -g lighthouse"
fi

# Check bundle size if built
if [ -d ".next" ]; then
    echo "📦 Checking bundle sizes..."
    du -sh .next/static/**/*.js 2>/dev/null | sort -hr > performance-reports/bundle-sizes-$(date +%Y%m%d).txt || echo "No bundle files found"
fi

# Quick health check
echo "🩺 Health check..."
if curl -s https://mission-statement-analyzer.vercel.app > /dev/null; then
    echo "✅ Site is responsive"
else
    echo "❌ Site is not responding"
fi

echo ""
echo "✅ Performance testing complete!"
echo "📁 Reports saved in: ./performance-reports/"
echo "🔍 Next steps:"
echo "   - Review Lighthouse reports for optimization opportunities"
echo "   - Check bundle sizes for any large increases"
echo "   - Monitor response times for trends"