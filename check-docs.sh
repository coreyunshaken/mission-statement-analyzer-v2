#!/bin/bash

echo "🩺 Documentation Health Check for Mission Statement Analyzer"
echo "=========================================================="

# Create docs directory if needed
mkdir -p docs

# Check for functions without JSDoc
echo "🔍 Checking for undocumented functions..."
undocumented_funcs=$(find src -name "*.ts" -o -name "*.tsx" | xargs grep -l "export function\|export const.*=" | xargs grep -L "/**" | head -5)
if [ ! -z "$undocumented_funcs" ]; then
    echo "⚠️  Functions needing documentation:"
    echo "$undocumented_funcs"
else
    echo "✅ All exported functions have documentation"
fi

# Check for components without documentation  
echo ""
echo "🔍 Checking for undocumented components..."
if [ -d "src/components" ]; then
    undocumented_comps=$(find src/components -name "*.tsx" -exec grep -L "@component\|interface.*Props" {} \; | head -3)
    if [ ! -z "$undocumented_comps" ]; then
        echo "⚠️  Components needing documentation:"
        echo "$undocumented_comps"
    else
        echo "✅ All components have documentation"
    fi
else
    echo "ℹ️  No components directory found"
fi

# Check README freshness
echo ""
echo "📅 Checking README freshness..."
if [ -f "README.md" ]; then
    readme_age=$(find README.md -mtime +7 -print)
    if [ ! -z "$readme_age" ]; then
        echo "⚠️  README.md hasn't been updated in over a week"
        echo "    Run: ./update-readme.sh to refresh"
    else
        echo "✅ README.md is current"
    fi
else
    echo "❌ README.md not found"
fi

# Check CLAUDE.md completeness
echo ""
echo "🤖 Checking CLAUDE.md completeness..."
if [ -f "CLAUDE.md" ]; then
    sections=$(grep -c "^##" CLAUDE.md)
    echo "✅ CLAUDE.md has $sections sections"
    
    # Check for key sections
    key_sections=("Quick Start" "Automation Scripts" "Performance" "Templates")
    for section in "${key_sections[@]}"; do
        if grep -q "$section" CLAUDE.md; then
            echo "  ✅ Has $section section"
        else
            echo "  ⚠️  Missing $section section"
        fi
    done
else
    echo "❌ CLAUDE.md not found"
fi

# Check for broken internal links
echo ""
echo "🔗 Checking for internal links..."
broken_links=$(grep -r "\[.*\](" *.md 2>/dev/null | grep -v "http" | grep -v "mailto" | head -3)
if [ ! -z "$broken_links" ]; then
    echo "⚠️  Check these internal links:"
    echo "$broken_links"
else
    echo "✅ No obvious link issues found"
fi

# Check package.json documentation scripts
echo ""
echo "📦 Checking package.json documentation scripts..."
if [ -f "package.json" ]; then
    if grep -q '"docs:' package.json; then
        echo "✅ Documentation scripts found in package.json"
    else
        echo "⚠️  Consider adding documentation scripts to package.json:"
        echo '    "docs:generate": "npx typedoc src --out docs"'
        echo '    "docs:serve": "npx serve docs"'
    fi
fi

# Overall documentation score
echo ""
echo "📊 Documentation Health Score:"

# Count documented vs total files
doc_files=0
total_files=0

if [ -d "src" ]; then
    total_files=$(find src -name "*.ts" -o -name "*.tsx" | wc -l)
    doc_files=$(find src -name "*.ts" -o -name "*.tsx" | xargs grep -l "/\*\*" | wc -l)
fi

if [ $total_files -gt 0 ]; then
    doc_percentage=$((doc_files * 100 / total_files))
    echo "Documentation coverage: ${doc_percentage}% ($doc_files/$total_files files)"
    
    if [ $doc_percentage -gt 70 ]; then
        echo "🟢 EXCELLENT - Great documentation coverage!"
    elif [ $doc_percentage -gt 50 ]; then
        echo "🟡 GOOD - Decent documentation coverage"
        echo "   💡 Aim for >70% coverage for best practices"
    else
        echo "🟠 NEEDS WORK - Low documentation coverage"
        echo "   💡 Focus on documenting public APIs and complex functions"
    fi
else
    echo "ℹ️  No source files found for analysis"
fi

echo ""
echo "🎯 Recommendations:"
echo "   1. Document all exported functions with JSDoc"
echo "   2. Add @component tags to React components" 
echo "   3. Update README.md weekly with ./update-readme.sh"
echo "   4. Keep CLAUDE.md current with project changes"
echo "   5. Add examples to complex function documentation"

echo ""
echo "✅ Documentation health check complete!"