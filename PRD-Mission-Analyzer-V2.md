# Product Requirements Document (PRD)
## Mission Statement Analyzer 2.0
### Research-Driven Enhancement

---

## Executive Summary

Based on comprehensive research of academic frameworks, Fortune 500 practices, and psychological principles, this PRD outlines enhancements to transform the Mission Statement Analyzer from a basic scoring tool into a professional-grade analysis platform backed by proven methodologies.

## Current State Analysis

### What We Have (V1.0)
- 5 metric scoring system (Clarity, Specificity, Impact, Authenticity, Memorability)
- Basic word count optimization
- Industry examples
- Email capture for reports
- History & comparison feature (newly added)

### Research-Identified Gaps
1. Missing academic framework (Pearce-David 9 components)
2. Word count targets slightly misaligned (optimal: 33 words vs. current: 8-35)
3. No psychological memorability principles
4. Limited industry-specific benchmarking
5. No readability metrics
6. Missing emotional sentiment analysis
7. No component detection system

## Product Vision

**Transform the Mission Statement Analyzer into the industry-standard tool for mission statement creation and analysis, backed by academic research and Fortune 500 best practices.**

## Core Features & Requirements

### 1. Enhanced Scoring System

#### 1.1 Pearce-David Component Analysis (NEW)
**What:** Score mission statements against 9 essential components
**Why:** Academic gold standard used in business schools

**Components to Detect:**
```javascript
const pearceDatavidComponents = {
  customers: false,        // Who we serve
  products: false,         // What we provide
  markets: false,          // Where we operate
  technology: false,       // How we innovate
  profitability: false,   // Sustainability focus
  philosophy: false,       // Core values
  advantage: false,        // Unique position
  publicImage: false,      // Social responsibility
  employees: false         // People focus
}
```

**Scoring Logic:**
- 0-3 components: Poor (25 points)
- 4-5 components: Fair (50 points)
- 6-7 components: Good (75 points)
- 8-9 components: Excellent (100 points)

#### 1.2 Refined Word Count Optimization
**Current:** 8-35 words ideal
**Research-Based:** 
- 6-12 words: Perfect for memorability (100 points)
- 13-33 words: Optimal range (90 points)
- 34-50 words: Acceptable (70 points)
- 51-100 words: Too long (40 points)
- >100 words: Critically long (20 points)

#### 1.3 Psychological Memorability Score (NEW)
**Factors to Analyze:**
- Emotional words presence (+20 points)
- Metaphor usage (+15 points)
- Distinctive phrasing (+15 points)
- Rhythm and flow (+10 points)
- Concrete vs. abstract language (+10 points)
- Cognitive load (7±2 concepts) (+30 points)

### 2. Advanced Analysis Features

#### 2.1 Readability Index (NEW)
**Implementation:** Gunning Fog Index
```javascript
function calculateReadability(text) {
  const words = text.split(' ').length;
  const sentences = text.split(/[.!?]/).length;
  const complexWords = countSyllables(text, 3); // 3+ syllables
  
  const fogIndex = 0.4 * ((words/sentences) + 100 * (complexWords/words));
  
  // Scoring
  if (fogIndex < 8) return 100;  // Elementary
  if (fogIndex < 12) return 80;  // High school
  if (fogIndex < 16) return 60;  // College
  return 40; // Graduate level (too complex)
}
```

#### 2.2 Emotional Sentiment Analysis (NEW)
**Categories to Detect:**
- Inspirational words (inspire, empower, transform)
- Action words (accelerate, create, build)
- Connection words (together, community, unite)
- Purpose words (mission, meaning, impact)

#### 2.3 Industry Benchmarking System (ENHANCED)
**Current:** Static examples
**Enhanced:** Dynamic comparison with proven leaders

```javascript
const industryBenchmarks = {
  technology: {
    avgWordCount: 15,
    topComponents: ['innovation', 'global', 'transform'],
    avgScore: 92,
    examples: ['Google', 'Microsoft', 'Tesla']
  },
  healthcare: {
    avgWordCount: 22,
    topComponents: ['care', 'health', 'community'],
    avgScore: 78,
    examples: ['Mayo Clinic', 'Cleveland Clinic']
  }
  // ... more industries
}
```

### 3. New UI Components

#### 3.1 Component Coverage Visualization
**Visual:** Circular progress showing 9 components
```
[✓] Customers  [✓] Products  [✓] Markets
[✓] Technology [✗] Profit    [✓] Values
[✓] Advantage  [✗] Society   [✓] Employees
Score: 7/9 Components
```

#### 3.2 Memorability Meter
**Visual:** Brain icon with fill level
- Emotional Impact: ████░░
- Distinctiveness: ███░░░
- Cognitive Load: █████░

#### 3.3 Competitive Benchmark Chart
**Visual:** Bar chart comparing to industry leaders
```
Your Score:        ████████░░ 82
Industry Average:  ██████░░░░ 65
Top Performer:     █████████░ 94
```

### 4. Enhanced Report Generation

#### 4.1 Academic Analysis Section
- Pearce-David component breakdown
- Missing components with suggestions
- Academic citation of framework

#### 4.2 Psychological Analysis Section
- Memory optimization score
- Cognitive load assessment
- Emotional resonance rating

#### 4.3 Competitive Analysis Section
- Industry positioning
- Benchmark comparisons
- Improvement recommendations

## Technical Requirements

### Data Model Updates
```typescript
interface MissionAnalysis {
  // Existing
  scores: {
    clarity: number;
    specificity: number;
    impact: number;
    authenticity: number;
    memorability: number;
    overall: number;
  };
  
  // New
  components: {
    pearceDatavid: ComponentScore;
    detected: string[];
    missing: string[];
  };
  
  readability: {
    fogIndex: number;
    gradeLevel: string;
    complexity: 'simple' | 'moderate' | 'complex';
  };
  
  sentiment: {
    emotional: number;
    action: number;
    purpose: number;
  };
  
  benchmark: {
    industryAvg: number;
    percentile: number;
    topCompetitor: string;
  };
}
```

### Algorithm Enhancements
1. **NLP for Component Detection**
   - Keywords mapping for each component
   - Synonym recognition
   - Context understanding

2. **Sentiment Analysis**
   - Emotion word dictionary
   - Weighted scoring by position
   - Industry-specific adjustments

3. **Benchmark Calculations**
   - Dynamic percentile ranking
   - Industry-specific weightings
   - Trend analysis over time

## Implementation Roadmap

### Phase 1: Core Algorithm Updates (Week 1)
- [ ] Implement Pearce-David component detection
- [ ] Update word count scoring to research-based model
- [ ] Add basic readability calculation

### Phase 2: Enhanced Analysis (Week 2)
- [ ] Build psychological memorability scoring
- [ ] Implement emotional sentiment analysis
- [ ] Create industry benchmark system

### Phase 3: UI Enhancements (Week 3)
- [ ] Add component coverage visualization
- [ ] Create memorability meter
- [ ] Build competitive benchmark chart

### Phase 4: Testing & Refinement (Week 4)
- [ ] Test with Fortune 500 examples
- [ ] Validate scoring against research
- [ ] User testing and feedback

## Success Metrics

### Quantitative
- Scoring accuracy: 90% correlation with expert assessment
- Component detection: 95% accuracy
- User engagement: 50% increase in analyses per session
- Report generation: 75% email capture rate

### Qualitative
- User feedback: "Most comprehensive tool available"
- Industry adoption: Used by 3+ Fortune 500 companies
- Academic validation: Cited in business publications

## MVP Definition

### Must Have (Phase 1)
1. Pearce-David component scoring
2. Research-based word count optimization
3. Basic readability index
4. Updated UI to show new metrics

### Should Have (Phase 2)
1. Psychological memorability scoring
2. Emotional sentiment analysis
3. Industry benchmarking

### Could Have (Phase 3)
1. AI-powered suggestions
2. Historical trend analysis
3. Multi-language support

## Risk Analysis

### Technical Risks
- **NLP Accuracy**: Component detection may have false positives
  - *Mitigation*: Manual override option
  
- **Performance**: Additional analysis may slow down app
  - *Mitigation*: Progressive enhancement, show basic first

### User Experience Risks
- **Complexity**: Too many metrics may overwhelm users
  - *Mitigation*: Progressive disclosure, basic/advanced modes

## Next Steps

1. **Validate Requirements**: Review with potential users
2. **Technical Spike**: Test NLP libraries for component detection
3. **Design Mockups**: Create UI designs for new features
4. **Begin Phase 1**: Start with core algorithm updates

---

## Appendix: Research Sources

1. David, F. R., David, M. E., & David, F. R. (2020). Mission statement theory and practice
2. Pearce, J. A., & David, F. (1987). Corporate mission statements framework
3. McKinsey & Company consulting methodologies
4. Fortune 500 mission statement analysis (2024-2025)
5. Cognitive psychology memory principles
6. Gunning Fog readability index

---

*Document Version: 1.0*
*Created: 2025-01-16*
*Based on: Academic research and industry best practices*