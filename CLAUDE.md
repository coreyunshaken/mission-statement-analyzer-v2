# CLAUDE.md - Project Instructions for Claude Code

This file helps Claude Code understand your project and work exactly how you prefer.

## Project Overview

**Mission Statement Analyzer** - A Next.js app that analyzes company mission statements using Fortune 500 standards, providing scores across 5 metrics with real-time feedback.

## Quick Start Commands

```bash
# ALWAYS run these from /Users/coreynew/mission-statement-analyzer/

# Start development server
npm run dev          # Runs on http://localhost:3000 (or 3001 if occupied)

# Build for production
npm run build

# Check for issues
npm run lint
```

## 🤖 Automation Scripts

```bash
# One-line commands for common tasks:

# Quick Fix - Fix all issues and verify build
npm run lint -- --fix && npm run build && echo "✅ All issues fixed!"

# Safe Deploy - Test everything before pushing
npm run lint && npm run build && git status && echo "✅ Ready to deploy! Run: git add . && git commit -m 'Your message' && git push"

# Clean Start - When things aren't working right
rm -rf node_modules .next && npm install && npm run dev

# Check Everything - Run before important commits
npm run lint && npm run build && git diff --stat && echo "✅ Code is clean and ready!"

# Quick Save - Save work without deploying
git add . && git commit -m "WIP: $(date +%Y-%m-%d_%H:%M)" && echo "✅ Work saved locally!"

# Update and Deploy - Full deployment workflow
npm run lint -- --fix && npm run build && git add . && git commit -m "Update: $(date +%Y-%m-%d)" && git push && echo "🚀 Deployed to Vercel!"
```

### When to Use Each Script:

- **Quick Fix**: When you see lint errors
- **Safe Deploy**: Before pushing to production
- **Clean Start**: When npm packages are acting weird
- **Check Everything**: Before important changes
- **Quick Save**: End of work session (doesn't push online)
- **Update and Deploy**: When ready to go live

## Testing Commands (To Be Implemented)

```bash
# When tests are set up, use these commands:

# Run all tests
npm test                    # Runs all test suites

# Run specific test types
npm run test:unit          # Test individual functions/components
npm run test:e2e           # Test full user workflows
npm run test:integration   # Test component interactions

# Run tests with coverage report
npm run test:coverage      # Shows % of code covered by tests

# Run tests in watch mode (reruns when files change)
npm run test:watch         # Useful during development

# Test a specific file
npm test -- page.test.tsx  # Test just the main page component
```

### What Each Test Type Checks:

- **Unit Tests**: Individual scoring functions work correctly
- **E2E Tests**: User can input mission statement and see accurate results
- **Integration Tests**: Components communicate properly
- **Coverage**: Ensures critical code paths are tested

## Code Style Preferences

- **NO COMMENTS** in code unless specifically requested
- Use TypeScript for all new files
- Prefer `const` over `let`
- Use functional components with hooks (no class components)
- Keep components in `app/` directory (using App Router)
- Use Tailwind CSS for styling (no separate CSS files)

## Git Workflow

1. Make changes incrementally
2. Test locally before committing
3. Use descriptive commit messages
4. **ONLY push to GitHub when explicitly asked**
5. Never commit `dev.log` or test files

## Project Structure

```
/mission-statement-analyzer
├── app/
│   ├── page.tsx         # Main analyzer component (1500+ lines)
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Tailwind imports only
├── components/ui/       # shadcn/ui components
├── public/             # Static assets
└── CLAUDE.md          # This file
```

## Common Tasks

### Adding a New Feature

1. Identify where in `app/page.tsx` it belongs
2. Add necessary state with `useState`
3. Implement UI using existing Tailwind classes
4. Test locally before committing
5. Save to localStorage if data should persist

### Modifying Scoring Algorithm

- All scoring functions are in `app/page.tsx` lines 246-329
- Each metric returns 0-100
- Overall score is average of 5 metrics

### Adding New Industry Examples

- Edit `industryExamples` object in `app/page.tsx`
- Include name, mission, and score
- Aim for scores 90+ for aspirational examples

### UI Changes

- Use existing color scheme (blue primary, dark background)
- Maintain card-based layout
- Keep mobile responsiveness
- Use shadcn/ui components when possible

## Testing Checklist

Before marking any task complete:

- [ ] Dev server runs without errors
- [ ] Feature works as expected
- [ ] No TypeScript errors
- [ ] Mobile responsive
- [ ] localStorage persists correctly

## Important Notes

- This is a single-page application - everything is in `app/page.tsx`
- No backend/API - all processing is client-side
- Uses localStorage for persistence
- Deployed automatically via Vercel when pushed to GitHub

## Productivity Tips for Corey

1. When adding features, I'll create a todo list automatically
2. I'll test everything locally before suggesting commits
3. I'll explain what each command does when running it
4. I'll batch related changes together
5. I'll warn before any breaking changes

## MCP (Model Context Protocol) Integrations

### What is MCP?

MCP lets Claude Code connect to external services and tools for enhanced capabilities.

### ✅ Currently Active MCP Servers:

```bash
# Check your MCP servers:
claude mcp list

# Current servers:
1. filesystem - Enhanced file operations for /Users/coreynew/mission-statement-analyzer
2. memory - Persistent memory across Claude sessions
3. github - Direct access to GitHub repos, issues, and PRs (Authenticated ✓)
```

### How to Add More MCP Servers:

```bash
# Basic syntax:
claude mcp add <name> -- npx -y <server-package>

# Examples:
# Add GitHub integration (requires GitHub CLI):
claude mcp add github --env GITHUB_TOKEN="$(gh auth token)" -- npx -y @modelcontextprotocol/server-github

# Add Google Drive:
claude mcp add gdrive -- npx -y @modelcontextprotocol/server-gdrive

# Add Slack:
claude mcp add slack --env SLACK_TOKEN="your-token" -- npx -y @modelcontextprotocol/server-slack
```

### Managing MCP Servers:

```bash
claude mcp list          # See all servers
claude mcp get <name>    # Get server details
claude mcp remove <name> # Remove a server
```

### What Each Server Does:

- **filesystem**: Advanced file search, bulk operations, pattern matching
- **memory**: Remember context between sessions (project notes, decisions, etc.)
- **github**: Track issues, PRs, commits (needs GitHub CLI installed first)
- **gdrive**: Access Google Docs, Sheets, Drive files
- **slack**: Read team discussions, get notifications

## 🪝 Pre-commit Hooks (Husky)

### Automatic Quality Checks

Every commit automatically runs these checks:

```bash
# What happens when you commit:
1. ✅ ESLint fixes code issues
2. ✅ Prettier formats your code
3. ✅ TypeScript checks for type errors
4. ✅ Only then allows the commit

# Skip hooks in emergency (use sparingly):
git commit --no-verify -m "Emergency fix"
```

### Customizing Hooks

Edit `.husky/pre-commit` to add/remove checks:

```bash
# Fast checks (current setup)
- Lint and format staged files only
- TypeScript type checking

# Optional slower checks (commented out)
- Full build verification
- Test suite execution
```

### Lint-Staged Configuration

Only checks files you're actually committing:

- `*.{ts,tsx,js,jsx}` → ESLint + Prettier
- `*.{json,md}` → Prettier only
- Ignores node_modules automatically

## 🖥️ Claude Code Scripting Capabilities

### Advanced Automation with Claude Code

Claude Code can be used in Unix-style pipes and scripts for powerful automation:

```bash
# Monitor logs for errors and get intelligent alerts
tail -f dev.log | claude -p "Alert me if you see any critical errors or unusual patterns"

# Analyze git diffs before committing
git diff | claude -p "Review this code change for potential issues"

# Process multiple files for improvements
find . -name "*.tsx" | head -5 | xargs -I {} claude -p "Suggest improvements for this React component" {}

# Generate release notes automatically
git log --since="1 week ago" --oneline | claude -p "Generate professional release notes from these commits"

# Monitor build output and suggest fixes
npm run build 2>&1 | claude -p "If there are errors, suggest specific fixes"

# Batch analyze mission statements
cat mission-examples.txt | claude -p "Score each mission statement using Fortune 500 standards"

# Smart deployment verification
curl -s https://mission-statement-analyzer.vercel.app/api/health | claude -p "Analyze this API response and tell me if deployment is healthy"

# Code quality analysis across files
git status --porcelain | grep -E '\.(tsx?|js)$' | cut -c4- | xargs -I {} claude -p "Quick code quality check for {}" {}
```

### Integration with Development Workflow

```bash
# Pre-commit hook using Claude Code
git diff --cached | claude -p "Review staged changes for mission statement analyzer. Flag any issues." && git commit

# Automated testing insights
npm test 2>&1 | claude -p "Analyze test results and suggest improvements"

# Performance monitoring
lighthouse https://mission-statement-analyzer.vercel.app --output json | claude -p "Analyze performance metrics and suggest optimizations"

# Smart error handling
npm run dev 2>&1 | grep -i error | claude -p "Help debug these development errors"
```

### Claude Code in CI/CD (GitHub Actions Example)

```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review
on: [pull_request]
jobs:
  claude-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code
      - name: Review Changes
        run: |
          git diff origin/main...HEAD | claude -p "Review this PR for the mission statement analyzer. Focus on code quality and potential issues."
```

## 📋 Project Templates

### React Component Template

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ComponentNameProps {
  title: string;
  onAction?: () => void;
}

export default function ComponentName({ title, onAction }: ComponentNameProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string>('');

  useEffect(() => {
    // Initialization logic
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      // Your logic here
      onAction?.();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleClick} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Click Me'}
        </Button>
      </CardContent>
    </Card>
  );
}
```

### API Route Template (Next.js App Router)

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    const data = { message: 'Success' };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.requiredField) {
      return NextResponse.json({ error: 'Missing required field' }, { status: 400 });
    }

    // Process request
    const result = { id: Date.now(), ...body };

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

### Custom Hook Template

```typescript
import { useState, useEffect, useCallback } from 'react';

interface UseCustomHookOptions {
  initialValue?: string;
  debounceMs?: number;
}

export function useCustomHook({ initialValue = '', debounceMs = 500 }: UseCustomHookOptions = {}) {
  const [value, setValue] = useState(initialValue);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const processValue = useCallback(
    async (newValue: string) => {
      setIsProcessing(true);
      setError(null);

      try {
        // Your async logic here
        await new Promise((resolve) => setTimeout(resolve, debounceMs));
        setValue(newValue);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsProcessing(false);
      }
    },
    [debounceMs]
  );

  return {
    value,
    isProcessing,
    error,
    processValue,
  };
}
```

### Mission Statement Scoring Function Template

```typescript
interface ScoringResult {
  score: number;
  feedback: string;
  suggestions: string[];
}

export function scoreMetric(text: string): ScoringResult {
  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  // Length check
  const wordCount = text.split(/\s+/).length;
  if (wordCount >= 10 && wordCount <= 30) {
    score += 25;
  } else {
    feedback.push('Length should be between 10-30 words');
    suggestions.push('Consider making it more concise');
  }

  // Keyword analysis
  const keywords = ['mission', 'value', 'purpose', 'vision'];
  const hasKeywords = keywords.some((keyword) => text.toLowerCase().includes(keyword));
  if (hasKeywords) {
    score += 25;
  }

  // Clarity check
  const complexWords = text.match(/\b\w{10,}\b/g) || [];
  if (complexWords.length < 3) {
    score += 25;
  } else {
    suggestions.push('Simplify complex terminology');
  }

  // Action-oriented check
  const actionWords = ['create', 'build', 'deliver', 'provide', 'enable'];
  const hasAction = actionWords.some((word) => text.toLowerCase().includes(word));
  if (hasAction) {
    score += 25;
  }

  return {
    score: Math.min(100, score),
    feedback: feedback.join('. '),
    suggestions,
  };
}
```

### Tailwind Component Variants Template

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const componentVariants = cva(
  'rounded-lg transition-all duration-200', // base styles
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  children: React.ReactNode;
}

export function Component({
  className,
  variant,
  size,
  fullWidth,
  children,
  ...props
}: ComponentProps) {
  return (
    <div
      className={cn(componentVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
```

### Form with Validation Template

```typescript
'use client';

import { useState } from 'react';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    try {
      formSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<FormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    // Submit
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Success handling
        setFormData({ email: '', message: '' });
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Message"
          className="w-full p-2 border rounded"
          rows={4}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
```

## 💻 VS Code Integration Tips

### Optimal VS Code Setup for Claude Code

#### Essential Extensions

```json
// Recommended extensions for mission statement analyzer:
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-eslint",
    "usernamehw.errorlens",
    "ms-vscode.vscode-claude-code"
  ]
}
```

#### Workspace Settings (Save as `.vscode/settings.json`)

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "emmet.includeLanguages": {
    "typescriptreact": "html"
  },
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.suggestSelection": "first",
  "terminal.integrated.defaultProfile.osx": "zsh"
}
```

#### Custom Keybindings (Save as `.vscode/keybindings.json`)

```json
[
  {
    "key": "cmd+shift+c",
    "command": "workbench.action.terminal.new",
    "when": "terminalProcessSupported"
  },
  {
    "key": "cmd+shift+t",
    "command": "workbench.action.tasks.runTask"
  },
  {
    "key": "cmd+k cmd+f",
    "command": "editor.action.formatDocument"
  },
  {
    "key": "cmd+shift+p",
    "command": "workbench.action.showCommands"
  }
]
```

#### Tasks Configuration (Save as `.vscode/tasks.json`)

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Dev Server",
      "type": "shell",
      "command": "npm run dev",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Build Project",
      "type": "shell",
      "command": "npm run build",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      },
      "problemMatcher": ["$tsc"]
    },
    {
      "label": "Run Linting",
      "type": "shell",
      "command": "npm run lint",
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "label": "Claude Code - Quick Fix",
      "type": "shell",
      "command": "npm run lint -- --fix && npm run build && echo '✅ Quick fix complete!'",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    }
  ]
}
```

#### Launch Configuration (Save as `.vscode/launch.json`)

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}",
      "runtimeArgs": ["--inspect"],
      "env": {
        "NODE_OPTIONS": "--inspect"
      }
    },
    {
      "name": "Debug TypeScript",
      "type": "node",
      "request": "launch",
      "program": "${file}",
      "outFiles": ["${workspaceFolder}/**/*.js"],
      "resolveSourceMapLocations": ["${workspaceFolder}/**", "!**/node_modules/**"]
    }
  ]
}
```

### Claude Code Integration Workflow

#### Terminal Setup

1. **Split Terminal Layout**: `Cmd+Shift+5` to split terminal
   - Left: Claude Code sessions
   - Right: Development server (`npm run dev`)

2. **Terminal Shortcuts**:
   ```bash
   # Quick access to Claude Code
   alias cc="claude"
   alias ccr="claude -p 'Review this code for issues'"
   alias cca="claude -p 'Analyze this output and suggest fixes'"
   ```

#### Multi-Window Management

```bash
# Open new VS Code window for another project:
code -n /path/to/other/project

# Open current project in new window:
code -n .

# Switch between windows:
Cmd + ` (backtick)
```

#### Snippet Integration

Create custom snippets (File → Preferences → User Snippets):

```json
{
  "Claude Code Review": {
    "prefix": "ccreview",
    "body": [
      "// TODO: Ask Claude to review this section",
      "// Command: git diff | claude -p \"Review this change for potential issues\"",
      "$0"
    ],
    "description": "Add Claude Code review marker"
  },
  "React Component Template": {
    "prefix": "rcomp",
    "body": [
      "interface ${1:ComponentName}Props {",
      "  $2",
      "}",
      "",
      "export default function ${1:ComponentName}({ $3 }: ${1:ComponentName}Props) {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  );",
      "}"
    ],
    "description": "React component with TypeScript"
  }
}
```

### Productivity Tips

#### File Navigation

- `Cmd+P`: Quick file open
- `Cmd+Shift+E`: Explorer sidebar
- `Cmd+Shift+F`: Search across files
- `Cmd+Shift+G`: Source control (Git)

#### Code Navigation

- `F12`: Go to definition
- `Shift+F12`: Find all references
- `Cmd+F12`: Go to implementation
- `Cmd+Shift+O`: Go to symbol

#### Integration with Claude Code

```bash
# Add to your shell profile (.zshrc or .bashrc):

# Quick Claude Code commands
alias ccd="cd /Users/Claude\ Projects/mission-statement-analyzer"
alias ccdev="ccd && npm run dev"
alias ccbuild="ccd && npm run build"
alias ccfix="ccd && npm run lint -- --fix && npm run build"

# Claude Code with VS Code integration
alias ccopen="code . && claude"
alias ccreview="git diff | claude -p 'Review these changes'"
```

### Debugging Integration

1. Set breakpoints with `F9`
2. Start debugging with `F5`
3. Step through code with `F10` (step over), `F11` (step into)
4. Use Claude Code to analyze stack traces:
   ```bash
   # Copy error from debug console and pipe to Claude:
   echo "Error message here" | claude -p "Help debug this Next.js error"
   ```

## 📊 Performance Monitoring Checklist

### Core Performance Metrics

#### Web Vitals (Google's Core Metrics)

```bash
# Install Lighthouse CLI for automated testing
npm install -g lighthouse

# Run performance audit
lighthouse https://mission-statement-analyzer.vercel.app --output json --output html

# Quick performance check with curl
curl -w "@curl-format.txt" -s https://mission-statement-analyzer.vercel.app > /dev/null

# Create curl-format.txt with:
echo "     time_namelookup:  %{time_namelookup}\n        time_connect:  %{time_connect}\n     time_appconnect:  %{time_appconnect}\n    time_pretransfer:  %{time_pretransfer}\n       time_redirect:  %{time_redirect}\n  time_starttransfer:  %{time_starttransfer}\n                     ----------\n          time_total:  %{time_total}\n" > curl-format.txt
```

#### Performance Thresholds (Mission Statement Analyzer)

```typescript
// Performance targets for mission statement analyzer:
const PERFORMANCE_TARGETS = {
  // Core Web Vitals
  LCP: 2.5, // Largest Contentful Paint (seconds)
  FID: 100, // First Input Delay (milliseconds)
  CLS: 0.1, // Cumulative Layout Shift

  // Additional metrics
  TTFB: 800, // Time to First Byte (milliseconds)
  FCP: 1.8, // First Contentful Paint (seconds)
  TTI: 3.8, // Time to Interactive (seconds)

  // Mission-specific metrics
  analysisTime: 2000, // Time to analyze mission statement (ms)
  scoreCalculation: 500, // Time to calculate scores (ms)
  recommendationGeneration: 1000, // Time to generate suggestions (ms)
};
```

#### Real User Monitoring (RUM) Setup

```typescript
// Add to app/layout.tsx for production monitoring
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Web Vitals tracking
export function trackWebVitals(metric: any) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', metric.name, {
      custom_map: {
        metric_id: 'custom_metric',
        metric_value: metric.value,
        metric_delta: metric.delta,
      },
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric.name, metric.value);
  }
}

// Usage in app/layout.tsx:
import { trackWebVitals } from './lib/performance';
// Add to root layout component
```

### Performance Testing Automation

#### Automated Performance Tests

```bash
# Weekly performance test script (save as test-performance.sh)
#!/bin/bash

echo "🚀 Running Performance Tests for Mission Statement Analyzer"

# Test live site
echo "📊 Testing production site..."
lighthouse https://mission-statement-analyzer.vercel.app \
  --preset=desktop \
  --output=html \
  --output-path=./performance-reports/prod-$(date +%Y%m%d).html

# Test local development
echo "🔧 Testing local development..."
lighthouse http://localhost:3000 \
  --preset=desktop \
  --output=html \
  --output-path=./performance-reports/dev-$(date +%Y%m%d).html

# Test mobile performance
echo "📱 Testing mobile performance..."
lighthouse https://mission-statement-analyzer.vercel.app \
  --preset=mobile \
  --output=html \
  --output-path=./performance-reports/mobile-$(date +%Y%m%d).html

echo "✅ Performance tests complete! Check ./performance-reports/"
```

#### Bundle Size Monitoring

```bash
# Add to package.json scripts:
"analyze": "ANALYZE=true npm run build",
"size-check": "npm run build && du -sh .next/static/**/*.js | sort -hr",
"performance": "npm run build && npm run analyze && ./test-performance.sh"
```

### Performance Checklist

#### Before Every Release

- [ ] **Lighthouse Score**: Overall score ≥ 90
- [ ] **LCP**: ≤ 2.5 seconds
- [ ] **FID**: ≤ 100 milliseconds
- [ ] **CLS**: ≤ 0.1
- [ ] **Bundle Size**: JavaScript bundles ≤ 250KB gzipped
- [ ] **Image Optimization**: All images properly compressed and sized
- [ ] **Mission Analysis Speed**: ≤ 2 seconds for typical input
- [ ] **Mobile Performance**: Mobile Lighthouse score ≥ 85

#### Monthly Performance Review

- [ ] **Trend Analysis**: Compare performance over time
- [ ] **User Feedback**: Review any speed-related complaints
- [ ] **Analytics Review**: Check bounce rates and engagement metrics
- [ ] **Dependency Audit**: Review and update heavy dependencies
- [ ] **CDN Performance**: Verify global delivery speeds
- [ ] **Database Queries**: Optimize any slow queries (if applicable)

#### Performance Regression Detection

```bash
# Git hook to detect performance regressions
# Add to .husky/pre-push:
echo "🔍 Checking for performance regressions..."
npm run build > /dev/null 2>&1
BUNDLE_SIZE=$(du -s .next/static/chunks/pages | cut -f1)

if [ $BUNDLE_SIZE -gt 500 ]; then
  echo "⚠️  Bundle size increased significantly: ${BUNDLE_SIZE}KB"
  echo "Please review and optimize before pushing."
  exit 1
fi

echo "✅ Performance check passed"
```

### Monitoring Tools Integration

#### Real-Time Performance Alerts

```bash
# Claude Code integration for performance monitoring
# Run this as a cron job or in CI/CD:
lighthouse https://mission-statement-analyzer.vercel.app --output json | \
claude -p "Analyze this Lighthouse report. Alert me if performance scores drop below 85 or if there are critical issues."

# Bundle size monitoring
npm run build && \
find .next -name "*.js" -exec du -ch {} + | tail -1 | \
claude -p "Analyze bundle size. Alert if total exceeds 1MB or individual chunks exceed 250KB."
```

#### Performance Dashboard Command

```bash
# Quick performance overview (add to aliases)
alias perf-check='echo "🚀 Mission Statement Analyzer Performance Check" && \
  curl -s https://mission-statement-analyzer.vercel.app > /dev/null && \
  curl -w "Response Time: %{time_total}s\nSize: %{size_download} bytes\n" \
       -s https://mission-statement-analyzer.vercel.app > /dev/null && \
  echo "✅ Site is responding"'
```

### Performance Optimization Guidelines

#### Code-Level Optimizations

```typescript
// Mission statement processing optimization
import { useMemo, useCallback } from 'react';

// Memoize expensive calculations
const analysisResults = useMemo(() => {
  if (!missionStatement) return null;
  return analyzeMissionStatement(missionStatement);
}, [missionStatement]);

// Debounce user input
const debouncedAnalysis = useCallback(
  debounce((text: string) => {
    setAnalysisResults(analyzeMissionStatement(text));
  }, 300),
  []
);

// Optimize component re-renders
const MemoizedScoreCard = React.memo(({ score, title, feedback }: ScoreCardProps) => {
  return (
    <div className="score-card">
      <h3>{title}: {score}/100</h3>
      <p>{feedback}</p>
    </div>
  );
});
```

#### Asset Optimization Checklist

- [ ] **Images**: WebP format with fallbacks, proper sizing
- [ ] **Fonts**: Preload critical fonts, use font-display: swap
- [ ] **CSS**: Remove unused styles, use CSS-in-JS efficiently
- [ ] **JavaScript**: Code splitting, lazy loading non-critical components
- [ ] **Third-party Scripts**: Audit and minimize external scripts

### Claude Code Performance Commands

```bash
# Analyze performance impact of changes
git diff | claude -p "Analyze these code changes for potential performance impact on a Next.js mission statement analyzer"

# Review bundle analysis
npm run analyze && claude -p "Review this bundle analysis and suggest optimizations"

# Performance troubleshooting
lighthouse https://mission-statement-analyzer.vercel.app --output json | \
claude -p "Identify the top 3 performance issues and provide specific fix recommendations"

# Regular performance health check
echo "Checking mission statement analyzer performance..." | \
curl -s https://mission-statement-analyzer.vercel.app | \
claude -p "Based on site response, suggest any immediate performance concerns"
```

## 📚 Documentation Automation

### Automated Documentation Generation

#### API Documentation (Auto-generated)

````typescript
// Add JSDoc comments to functions for automatic documentation
/**
 * Analyzes a mission statement and returns scores across 5 metrics
 * @param missionStatement - The mission statement text to analyze
 * @param options - Configuration options for analysis
 * @returns Promise<AnalysisResult> Analysis results with scores and feedback
 * @example
 * ```typescript
 * const result = await analyzeMissionStatement(
 *   "We create innovative solutions for businesses",
 *   { includeRecommendations: true }
 * );
 * console.log(result.overallScore); // 85
 * ```
 */
export async function analyzeMissionStatement(
  missionStatement: string,
  options: AnalysisOptions = {}
): Promise<AnalysisResult> {
  // Implementation
}

/**
 * Calculates clarity score based on text complexity and readability
 * @param text - Mission statement text
 * @returns number Score from 0-100
 */
export function calculateClarityScore(text: string): number {
  // Implementation
}
````

#### Component Documentation Generation

```bash
# Generate component documentation using TypeScript compiler API
# Add to package.json scripts:
"docs:generate": "npx typedoc src --out docs --theme default",
"docs:serve": "npx serve docs",
"docs:components": "npx react-docgen src/components --out docs/components.json"

# Auto-generate component usage examples
find src/components -name "*.tsx" | xargs -I {} claude -p "Generate usage documentation for this React component" {}
```

#### Automated README Updates

```bash
# Script to auto-update README with current features
# Save as: update-readme.sh
#!/bin/bash

echo "📚 Auto-updating README.md for Mission Statement Analyzer"

# Extract current features from package.json and code
FEATURES=$(grep -r "// FEATURE:" src/ | sed 's/.*FEATURE: /- /' | sort -u)

# Get component list
COMPONENTS=$(find src/components -name "*.tsx" | sed 's|src/components/||' | sed 's|.tsx||' | sort)

# Generate performance metrics from latest test
PERF_DATA=""
if [ -f "performance-reports/prod-response-$(date +%Y%m%d).txt" ]; then
    PERF_DATA=$(cat "performance-reports/prod-response-$(date +%Y%m%d).txt")
fi

# Create new README sections
cat > README-temp.md << EOF
# Mission Statement Analyzer

## 🚀 Features
$FEATURES

## 📊 Components
$COMPONENTS

## 🔧 Performance
Last measured: $(date)
$PERF_DATA

## 🛠️ Development
\`\`\`bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run linting
./test-performance.sh  # Run performance tests
\`\`\`

## 📈 Metrics Analyzed
1. **Clarity Score** - Readability and simplicity
2. **Purpose Score** - Clear organizational purpose
3. **Values Score** - Core values representation
4. **Uniqueness Score** - Differentiation from competitors
5. **Actionability Score** - Inspiring and actionable language

EOF

echo "✅ README updated with current project state"
```

#### Changelog Automation

```bash
# Auto-generate changelogs from git commits
# Add to package.json scripts:
"changelog": "git log --oneline --since='1 month ago' | claude -p 'Generate a professional changelog from these git commits for Mission Statement Analyzer'"

# Weekly changelog update
git log --since="1 week ago" --pretty=format:"- %s (%an)" | \
claude -p "Create a weekly changelog entry for Mission Statement Analyzer. Categorize changes as Features, Fixes, Performance, or Documentation"
```

### Code Documentation Standards

#### Function Documentation Template

````typescript
/**
 * Brief description of what the function does
 *
 * @param paramName - Description of parameter
 * @param optionalParam - Optional parameter description
 * @returns Description of return value
 * @throws {ErrorType} When this error occurs
 *
 * @example
 * ```typescript
 * const result = functionName('example');
 * console.log(result);
 * ```
 *
 * @since v1.0.0
 * @see {@link RelatedFunction} for related functionality
 */
````

#### Component Documentation Template

````typescript
/**
 * Component description and purpose
 *
 * @component
 * @example
 * ```tsx
 * <ComponentName
 *   prop1="value1"
 *   onAction={(data) => console.log(data)}
 * />
 * ```
 */
interface ComponentProps {
  /** Description of prop1 */
  prop1: string;
  /** Optional callback function */
  onAction?: (data: any) => void;
  /** CSS class for styling */
  className?: string;
}
````

### Documentation Maintenance Automation

#### Pre-commit Documentation Updates

```bash
# Add to .husky/pre-commit:
echo "📚 Updating documentation..."

# Auto-generate TypeScript documentation
npm run docs:generate > /dev/null 2>&1 || echo "⚠️  Could not generate TypeDoc"

# Update component documentation
npm run docs:components > /dev/null 2>&1 || echo "⚠️  Could not generate component docs"

# Check for outdated documentation
outdated_files=$(find . -name "*.md" -mtime +30 -not -path "./node_modules/*")
if [ ! -z "$outdated_files" ]; then
    echo "⚠️  These documentation files may need updates:"
    echo "$outdated_files"
fi

echo "✅ Documentation checks complete"
```

#### Automated Doc Health Checks

```bash
# Documentation health check script
# Save as: check-docs.sh
#!/bin/bash

echo "🩺 Documentation Health Check"
echo "============================="

# Check for functions without JSDoc
echo "🔍 Checking for undocumented functions..."
grep -r "export function\|export const.*=" src/ | grep -v "/**" | head -5

# Check for components without documentation
echo "🔍 Checking for undocumented components..."
find src/components -name "*.tsx" -exec grep -L "@component\|@param\|interface.*Props" {} \; | head -5

# Check README freshness
if [ -f "README.md" ]; then
    readme_age=$(find README.md -mtime +7 -print)
    if [ ! -z "$readme_age" ]; then
        echo "⚠️  README.md hasn't been updated in over a week"
    fi
fi

# Check for broken internal links
echo "🔗 Checking for broken internal links..."
grep -r "\[.*\](" *.md | grep -v "http" | head -3

echo "✅ Documentation health check complete"
```

### Claude Code Documentation Integration

#### Smart Documentation Generation

```bash
# Generate comprehensive documentation with Claude Code
git diff --name-only | grep -E "\.(tsx?|jsx?)$" | \
xargs -I {} claude -p "Generate comprehensive JSDoc documentation for this file, including examples and parameter descriptions" {}

# Auto-document new components
find src/components -name "*.tsx" -newer README.md | \
xargs -I {} claude -p "Create component documentation including props, usage examples, and accessibility notes for this React component" {}

# Generate API documentation
find src -name "*.ts" -path "*/api/*" | \
xargs -I {} claude -p "Generate API endpoint documentation including request/response examples, error codes, and usage notes" {}
```

#### Documentation Review Automation

```bash
# Weekly documentation review
find . -name "*.md" -o -name "*.tsx" | \
xargs grep -l "TODO\|FIXME\|XXX" | \
claude -p "Review these files with TODOs and suggest documentation improvements or missing documentation"

# Documentation quality assessment
cat README.md CLAUDE.md | \
claude -p "Assess the quality and completeness of this project documentation. Suggest improvements for clarity, completeness, and developer experience"
```

### Living Documentation System

#### Auto-updating Architecture Diagrams

```bash
# Generate architecture documentation from codebase
find src -name "*.tsx" -o -name "*.ts" | \
xargs grep -l "import.*from" | \
claude -p "Analyze the import patterns in these files and generate a component dependency diagram description for Mission Statement Analyzer"

# Document data flow
grep -r "useState\|useEffect\|Props" src/ | \
claude -p "Analyze these React patterns and document the data flow and state management approach"
```

#### Performance Documentation Updates

```bash
# Auto-document performance metrics
if [ -f "performance-reports/lighthouse-$(date +%Y%m%d).html" ]; then
    claude -p "Extract key performance metrics from this Lighthouse report and update our performance documentation" \
    < performance-reports/lighthouse-$(date +%Y%m%d).html
fi

# Document bundle size changes
git diff HEAD~1 --stat | claude -p "Analyze these file changes and document any potential performance impacts for the Mission Statement Analyzer"
```

### Documentation Deployment

#### GitHub Pages Documentation

```yaml
# .github/workflows/docs.yml
name: Generate and Deploy Documentation
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Generate TypeDoc
        run: npm run docs:generate

      - name: Generate component docs
        run: npm run docs:components

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```

#### Documentation Validation

```bash
# Add to CI/CD pipeline
echo "📚 Validating documentation..."

# Check documentation coverage
doc_coverage=$(find src -name "*.ts" -o -name "*.tsx" | wargs grep -l "/**" | wc -l)
total_files=$(find src -name "*.ts" -o -name "*.tsx" | wc -l)
coverage_percent=$((doc_coverage * 100 / total_files))

if [ $coverage_percent -lt 70 ]; then
    echo "❌ Documentation coverage too low: ${coverage_percent}%"
    exit 1
fi

echo "✅ Documentation coverage: ${coverage_percent}%"
```

### Quick Documentation Commands

#### Daily Documentation Tasks

```bash
# Add these aliases to your shell profile
alias docs-update='./update-readme.sh && npm run docs:generate'
alias docs-check='./check-docs.sh'
alias docs-serve='npm run docs:serve'

# Generate documentation for recent changes
alias docs-recent='git diff --name-only HEAD~1 | grep -E "\.(tsx?|jsx?)$" | \
  xargs -I {} claude -p "Update documentation for recent changes in this file" {}'

# Document new features
alias docs-feature='git log --oneline -5 | \
  claude -p "Generate user-facing documentation for these recent features in Mission Statement Analyzer"'
```

---

Last Updated: 2025-01-16
