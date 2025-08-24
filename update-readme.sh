#!/bin/bash

echo "📚 Auto-updating README.md for Mission Statement Analyzer"

# Create docs directory if it doesn't exist
mkdir -p docs

# Extract current features from package.json and code
FEATURES=$(grep -r "// FEATURE:" src/ 2>/dev/null | sed 's/.*FEATURE: /- /' | sort -u)
if [ -z "$FEATURES" ]; then
    FEATURES="- Mission statement analysis with 5 key metrics
- Real-time scoring and feedback  
- Industry-specific examples and benchmarking
- Export and sharing capabilities
- Mobile-responsive design"
fi

# Get component list
COMPONENTS=""
if [ -d "src/components" ]; then
    COMPONENTS=$(find src/components -name "*.tsx" 2>/dev/null | sed 's|src/components/||' | sed 's|.tsx||' | sort)
fi

# Generate performance metrics from latest test
PERF_DATA="Performance metrics updated daily via automated testing"
if [ -f "performance-reports/prod-response-$(date +%Y%m%d).txt" ]; then
    PERF_DATA=$(cat "performance-reports/prod-response-$(date +%Y%m%d).txt")
fi

# Create comprehensive README
cat > README.md << EOF
# 📊 Mission Statement Analyzer

> Analyze your organization's mission statement using Fortune 500 standards and get actionable insights for improvement.

## 🚀 Features

$FEATURES

## 📈 Analysis Metrics

Our analyzer evaluates mission statements across 5 key dimensions:

1. **Clarity Score (0-100)** - Readability and simplicity of language
2. **Purpose Score (0-100)** - Clear articulation of organizational purpose  
3. **Values Score (0-100)** - Representation of core values and beliefs
4. **Uniqueness Score (0-100)** - Differentiation from competitors
5. **Actionability Score (0-100)** - Inspiring and actionable language

## 🛠️ Development

\`\`\`bash
# Start development server
npm run dev

# Build for production  
npm run build

# Run code quality checks
npm run lint

# Performance testing
./test-performance.sh

# Documentation updates
./update-readme.sh
\`\`\`

## 🔧 Performance

**Last measured:** $(date)

$PERF_DATA

**Optimization Features:**
- Lighthouse score monitoring
- Bundle size tracking  
- Response time measurement
- Mobile performance testing

## 📚 Documentation

- **API Documentation**: Auto-generated from TypeScript interfaces
- **Component Documentation**: Generated via TypeDoc
- **Performance Reports**: Located in \`./performance-reports/\`
- **Development Guide**: See \`CLAUDE.md\` for comprehensive setup

## 🚦 Quality Assurance

- ✅ **Pre-commit hooks** - Automatic code formatting and linting
- ✅ **TypeScript** - Full type safety
- ✅ **Performance monitoring** - Automated Lighthouse audits  
- ✅ **Mobile responsive** - Optimized for all device sizes
- ✅ **SEO optimized** - Meta tags and structured data

## 🔄 Automation

This project includes comprehensive automation:
- Pre-commit quality checks with Husky
- Performance regression detection
- Documentation auto-generation
- Bundle size monitoring
- Claude Code integration for intelligent analysis

## 📦 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS  
- **UI Components**: shadcn/ui + Radix UI
- **Deployment**: Vercel
- **Quality**: ESLint + Prettier + Husky

## 🤝 Development Workflow

1. **Planning**: Features tracked via CLAUDE.md templates
2. **Development**: VS Code integration with custom tasks  
3. **Quality**: Pre-commit hooks ensure code standards
4. **Testing**: Automated performance and functionality testing
5. **Deployment**: Automated via Vercel on push to main

## 📊 Project Stats

- **Build Size**: Optimized for fast loading
- **Performance**: Monitored via Lighthouse automation
- **Code Quality**: Enforced via automated linting and formatting
- **Documentation**: Auto-updated with code changes

---

**🤖 This README is automatically updated via documentation automation.**

Last updated: $(date)

EOF

echo "✅ README.md updated with current project state"
echo "📁 Updated sections:"
echo "   - Features and metrics"
echo "   - Development commands" 
echo "   - Performance data"
echo "   - Quality assurance info"
echo "   - Tech stack and automation details"