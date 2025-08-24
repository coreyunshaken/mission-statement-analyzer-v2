'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronRight,
  Target,
  Sparkles,
  Share2,
  BookOpen,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  XCircle,
  History,
  Globe,
  Zap,
  Shield,
  Brain,
  Lock,
  CreditCard,
  ExternalLink,
  Trash2,
  GitCompare,
  X,
} from 'lucide-react';

const industries = [
  { value: 'technology', label: 'Technology', icon: '💻' },
  { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
  { value: 'finance', label: 'Finance', icon: '💰' },
  { value: 'retail', label: 'Retail', icon: '🛍️' },
  { value: 'manufacturing', label: 'Manufacturing', icon: '🏭' },
  { value: 'education', label: 'Education', icon: '🎓' },
  { value: 'nonprofit', label: 'Non-Profit', icon: '🤝' },
  { value: 'hospitality', label: 'Hospitality', icon: '🏨' },
  { value: 'energy', label: 'Energy', icon: '⚡' },
  { value: 'transportation', label: 'Transportation', icon: '🚗' },
  { value: 'media', label: 'Media & Entertainment', icon: '🎬' },
  { value: 'agriculture', label: 'Agriculture', icon: '🌾' },
  { value: 'realestate', label: 'Real Estate', icon: '🏠' },
  { value: 'other', label: 'Other', icon: '🏢' },
];

const industryExamples = {
  technology: [
    {
      name: 'Tesla',
      mission: "To accelerate the world's transition to sustainable energy.",
      score: 82,
    },
    {
      name: 'Google',
      mission: "To organize the world's information and make it universally accessible and useful.",
      score: 79,
    },
    {
      name: 'Microsoft',
      mission: 'To empower every person and every organization on the planet to achieve more.',
      score: 86,
    },
  ],
  healthcare: [
    {
      name: 'HealthTech Pioneer',
      mission: 'To transform healthcare accessibility for every person on the planet.',
      score: 83,
    },
    {
      name: 'MedAdvance Corp',
      mission: 'To accelerate medical breakthroughs for every person on the planet.',
      score: 82,
    },
    {
      name: 'Mayo Clinic',
      mission:
        'To inspire hope and promote health through integrated clinical practice, education and research.',
      score: 62,
    },
  ],
  finance: [
    {
      name: 'FinTech Leader',
      mission: 'To organize financial systems that empower every person worldwide.',
      score: 83,
    },
    {
      name: 'Mastercard',
      mission:
        'Connect and power a digital economy that benefits people, businesses & governments worldwide by making transactions safe, simple & accessible.',
      score: 67,
    },
    {
      name: 'PayPal',
      mission:
        'To democratize financial services to ensure that everyone has access to affordable, convenient, and secure products.',
      score: 60,
    },
  ],
  retail: [
    {
      name: 'RetailMax',
      mission: 'To empower families to transform their everyday lives.',
      score: 74,
    },
    {
      name: 'Walmart',
      mission: 'To save people money so they can live better.',
      score: 66,
    },
    {
      name: 'Target',
      mission: 'To help all families discover the joy of everyday life.',
      score: 58,
    },
  ],
  manufacturing: [
    {
      name: 'EcoManufacturing Co',
      mission: "To organize sustainable production that transforms the planet's future.",
      score: 83,
    },
    {
      name: 'Cargill',
      mission: 'To nourish the world in a safe, responsible and sustainable way.',
      score: 67,
    },
  ],
  education: [
    {
      name: 'EduGlobal',
      mission: 'To accelerate world-class education access for every person globally.',
      score: 79,
    },
    {
      name: 'Khan Academy',
      mission: 'Provide a free, world-class education to anyone, anywhere.',
      score: 62,
    },
  ],
  nonprofit: [
    {
      name: 'Global Relief',
      mission: 'To accelerate humanitarian relief for every person in crisis.',
      score: 70,
    },
    {
      name: 'Red Cross',
      mission: 'To prevent and alleviate human suffering in the face of emergencies.',
      score: 60,
    },
  ],
  hospitality: [
    {
      name: 'TravelForward',
      mission: 'To transform travel experiences for every person worldwide.',
      score: 78,
    },
    {
      name: 'Airbnb',
      mission: 'Create a world where anyone can belong anywhere.',
      score: 64,
    },
  ],
  energy: [
    {
      name: 'SustainEnergy Corp',
      mission: "To organize the world's transition to sustainable energy systems.",
      score: 81,
    },
    {
      name: 'Tesla Energy',
      mission: "To accelerate the world's transition to sustainable energy.",
      score: 82,
    },
  ],
  transportation: [
    {
      name: 'MobilityNext',
      mission: 'To transform global mobility for every person and community.',
      score: 75,
    },
    {
      name: 'FedEx',
      mission: 'To connect people and possibilities around the world.',
      score: 66,
    },
  ],
  media: [
    {
      name: 'EntertainForward',
      mission: 'To organize entertainment experiences that empower every person worldwide.',
      score: 81,
    },
    {
      name: 'Netflix',
      mission: 'To entertain the world.',
      score: 57,
    },
  ],
  agriculture: [
    {
      name: 'AgriSustain',
      mission: "To accelerate sustainable food systems for the planet's future.",
      score: 80,
    },
    {
      name: 'Cargill',
      mission: 'To nourish the world in a safe, responsible and sustainable way.',
      score: 67,
    },
  ],
  realestate: [
    {
      name: 'HomeUnlock',
      mission: 'To unlock homeownership opportunities for every family globally.',
      score: 66,
    },
    {
      name: 'Zillow',
      mission: "To give people the power to unlock life's next chapter.",
      score: 70,
    },
  ],
  other: [
    {
      name: 'Patagonia',
      mission: "We're in business to save our home planet.",
      score: 71,
    },
    {
      name: 'TechVision Corp',
      mission: 'To organize technology that empowers every person globally.',
      score: 81,
    },
  ],
};

// Pearce-David 9 Components Detection
function detectPearceDavidComponents(text: string) {
  const lowerText = text.toLowerCase();

  const components = {
    customers:
      /customer|client|user|people|person|everyone|community|society|humanity|individuals/i.test(
        text
      ),
    products: /product|service|solution|platform|technology|tool|system|energy|information/i.test(
      text
    ),
    markets: /world|global|local|market|region|nation|everywhere|worldwide|planet/i.test(text),
    technology:
      /technology|innovation|digital|platform|data|information|software|energy|transition|accelerate/i.test(
        text
      ),
    profitability:
      /sustainable|growth|value|profit|success|thrive|prosper|achieve|transition/i.test(text),
    philosophy:
      /believe|value|principle|culture|integrity|excellence|quality|mission|inspire/i.test(text),
    advantage:
      /best|leading|unique|first|only|superior|innovative|pioneer|accelerate|empower|organize|transform/i.test(
        text
      ),
    publicImage:
      /responsible|ethical|sustainable|environment|social|community|society|planet|world/i.test(
        text
      ),
    employees:
      /employee|team|people|talent|workforce|culture|empower|organization|every person/i.test(text),
  };

  const detectedCount = Object.values(components).filter(Boolean).length;
  const detectedComponents = Object.entries(components)
    .filter(([_, detected]) => detected)
    .map(([name, _]) => name);

  let score = 25;
  if (detectedCount >= 4) score = 50;
  if (detectedCount >= 6) score = 75;
  if (detectedCount >= 8) score = 100;

  return {
    components,
    detectedCount,
    detectedComponents,
    score,
  };
}

// Calculate Gunning Fog Readability Index
function calculateReadability(text: string) {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const wordCount = words.length;
  const sentenceCount = sentences.length || 1;

  // Count complex words (3+ syllables)
  const complexWords = words.filter((word) => {
    const syllables = word.toLowerCase().replace(/[^aeiou]/g, '').length;
    return syllables >= 3;
  }).length;

  const avgWordsPerSentence = wordCount / sentenceCount;
  const percentComplexWords = (complexWords / wordCount) * 100;

  const fogIndex = 0.4 * (avgWordsPerSentence + percentComplexWords);

  let readabilityScore = 40;
  if (fogIndex < 8)
    readabilityScore = 100; // Elementary
  else if (fogIndex < 12)
    readabilityScore = 80; // High school
  else if (fogIndex < 16) readabilityScore = 60; // College

  return {
    fogIndex: Math.round(fogIndex * 10) / 10,
    gradeLevel:
      fogIndex < 8
        ? 'Elementary'
        : fogIndex < 12
          ? 'High School'
          : fogIndex < 16
            ? 'College'
            : 'Graduate',
    score: readabilityScore,
  };
}

// Psychological Memorability Analysis
function calculatePsychologicalMemorability(text: string, wordCount: number) {
  let score = 50; // base score

  // 1. Cognitive Load Assessment (7±2 Rule)
  const concepts = text.split(/,|;|and|to|for|with|by/).length;
  if (concepts >= 3 && concepts <= 7)
    score += 15; // Optimal cognitive load
  else if (concepts <= 2)
    score += 5; // Too simple
  else score -= 10; // Cognitive overload

  // 2. Emotional Word Detection (boosts memory encoding)
  const emotionalWords =
    /inspire|empower|transform|accelerate|create|build|achieve|unlock|breakthrough|innovate|revolutionize|pioneer/gi;
  const emotionalMatches = (text.match(emotionalWords) || []).length;
  score += emotionalMatches * 8;

  // 3. Concrete vs Abstract Language (concrete = better memory)
  const concreteWords =
    /energy|information|people|world|planet|health|money|technology|product|service/gi;
  const abstractWords = /excellence|synergy|optimization|leverage|strategic|innovative|solutions/gi;
  const concreteCount = (text.match(concreteWords) || []).length;
  const abstractCount = (text.match(abstractWords) || []).length;
  score += concreteCount * 5;
  score -= abstractCount * 3;

  // 4. Rhythm and Flow (repetitive patterns aid memory)
  const hasRhythm = /to \w+.*to \w+|every \w+.*every \w+|\w+ing.*\w+ing/i.test(text);
  if (hasRhythm) score += 10;

  // 5. Distinctive Phrasing (uniqueness improves recall)
  const distinctivePhrases =
    /world's|planet's|every person|every organization|transition to|accessible and useful/gi;
  const distinctiveMatches = (text.match(distinctivePhrases) || []).length;
  score += distinctiveMatches * 6;

  // 6. Alliteration and Sound Patterns
  const alliteration = /\b([a-z])\w*\s+\1\w*/gi;
  const alliterationMatches = (text.match(alliteration) || []).length;
  score += alliterationMatches * 4;

  return {
    score: Math.max(30, Math.min(100, Math.round(score))),
    concepts,
    emotionalWords: emotionalMatches,
    concreteWords: concreteCount,
    abstractWords: abstractCount,
    hasRhythm,
    distinctivePhrases: distinctiveMatches,
  };
}

// Emotional Sentiment Analysis
function calculateEmotionalSentiment(text: string) {
  let score = 40; // base emotional resonance

  // 1. Inspirational Language
  const inspirationalWords =
    /inspire|hope|dream|vision|future|better|transform|empower|elevate|uplift/gi;
  const inspirationalCount = (text.match(inspirationalWords) || []).length;
  score += inspirationalCount * 12;

  // 2. Action Intensity (strong action verbs)
  const actionWords =
    /accelerate|organize|revolutionize|transform|unlock|breakthrough|pioneer|create|build|achieve/gi;
  const actionCount = (text.match(actionWords) || []).length;
  score += actionCount * 10;

  // 3. Connection/Community Language
  const connectionWords =
    /together|community|everyone|every person|humanity|world|planet|unite|connect/gi;
  const connectionCount = (text.match(connectionWords) || []).length;
  score += connectionCount * 8;

  // 4. Purpose-Driven Language
  const purposeWords = /mission|purpose|meaning|impact|difference|change|better|improve|help/gi;
  const purposeCount = (text.match(purposeWords) || []).length;
  score += purposeCount * 6;

  // 5. Negative sentiment penalty
  const negativeWords = /problem|crisis|struggle|difficult|challenge|fail|impossible/gi;
  const negativeCount = (text.match(negativeWords) || []).length;
  score -= negativeCount * 8;

  return {
    score: Math.max(20, Math.min(100, Math.round(score))),
    inspirational: inspirationalCount,
    action: actionCount,
    connection: connectionCount,
    purpose: purposeCount,
    negative: negativeCount,
  };
}

// Smart Improvement Suggestions
function generateSmartSuggestions(scores: any, missionText: string, wordCount: number) {
  const suggestions = [];

  // Length Issues
  if (wordCount > 20) {
    suggestions.push({
      icon: '✂️',
      type: 'Length',
      issue: `Too long (${wordCount} words)`,
      suggestion: `Reduce to under 20 words for maximum impact`,
      priority: 'high',
      example:
        wordCount > 30
          ? "Try removing 'and' clauses or combining ideas"
          : 'Cut 3-5 non-essential words',
    });
  } else if (wordCount < 6) {
    suggestions.push({
      icon: '📝',
      type: 'Length',
      issue: 'Too brief',
      suggestion: 'Add more specific details about your impact',
      priority: 'medium',
      example: 'Specify WHO you serve and HOW you help them',
    });
  }

  // Action Verb Issues
  const hasStrongAction =
    /accelerate|transform|empower|organize|unlock|revolutionize|pioneer|create|build/i.test(
      missionText
    );
  if (!hasStrongAction && scores.specificity < 70) {
    suggestions.push({
      icon: '💪',
      type: 'Action',
      issue: 'Weak action language',
      suggestion: 'Start with a powerful action verb',
      priority: 'high',
      example: `Try "To accelerate..." or "To transform..." instead of "${missionText.split(' ').slice(0, 3).join(' ')}..."`,
    });
  }

  // Target Audience Issues
  const hasAudience =
    /every person|everyone|people|families|businesses|companies|organizations|community|humanity/i.test(
      missionText
    );
  if (!hasAudience && scores.components.detectedCount < 5) {
    suggestions.push({
      icon: '🎯',
      type: 'Audience',
      issue: 'Missing target audience',
      suggestion: 'Specify WHO you serve',
      priority: 'medium',
      example: "Add 'for every business', 'for families', or 'for manufacturers'",
    });
  }

  // Industry Specificity
  if (scores.specificity < 60) {
    suggestions.push({
      icon: '🔍',
      type: 'Specificity',
      issue: 'Too generic',
      suggestion: 'Add industry-specific terms or unique value',
      priority: 'medium',
      example: 'What makes your approach different from competitors?',
    });
  }

  // Emotional Impact
  if (scores.sentiment.score < 50) {
    suggestions.push({
      icon: '❤️',
      type: 'Emotion',
      issue: 'Low emotional impact',
      suggestion: 'Add inspirational or purpose-driven language',
      priority: 'medium',
      example: "Include words like 'inspire', 'empower', or focus on positive change",
    });
  }

  // Buzzword Penalty
  const buzzwords = ['world-class', 'leading', 'solutions', 'synergy', 'innovative', 'excellence'];
  const foundBuzz = buzzwords.filter((word) => missionText.toLowerCase().includes(word));
  if (foundBuzz.length > 0) {
    suggestions.push({
      icon: '🚫',
      type: 'Buzzwords',
      issue: `Contains buzzword${foundBuzz.length > 1 ? 's' : ''}: ${foundBuzz.join(', ')}`,
      suggestion: 'Replace with specific, concrete language',
      priority: 'high',
      example: "What do you actually DO instead of being 'innovative'?",
    });
  }

  // Readability Issues
  if (scores.readability.score < 60) {
    suggestions.push({
      icon: '📚',
      type: 'Clarity',
      issue: 'Too complex to read easily',
      suggestion: 'Simplify language and sentence structure',
      priority: 'medium',
      example: 'Break long sentences or use simpler words',
    });
  }

  // Sort by priority and return top 4
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return suggestions
    .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
    .slice(0, 4);
}

// Enhanced scoring function with new metrics
function calculateAllScores(text: string) {
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const pearceDavid = detectPearceDavidComponents(text);
  const readability = calculateReadability(text);
  const psychMemory = calculatePsychologicalMemorability(text, wordCount);
  const sentiment = calculateEmotionalSentiment(text);

  const allScores = {
    clarity: calculateClarity(text, wordCount),
    specificity: calculateSpecificity(text),
    impact: calculateImpact(text),
    authenticity: calculateAuthenticity(text, wordCount),
    memorability: calculateMemorability(text, wordCount),
    components: pearceDavid,
    readability: readability,
    psychMemory: psychMemory,
    sentiment: sentiment,
    overall: Math.round(
      (calculateClarity(text, wordCount) +
        calculateSpecificity(text) +
        calculateImpact(text) +
        calculateAuthenticity(text, wordCount) +
        calculateMemorability(text, wordCount) +
        pearceDavid.score +
        readability.score +
        psychMemory.score +
        sentiment.score) /
        9
    ),
  };

  // Add smart suggestions
  allScores.suggestions = generateSmartSuggestions(allScores, text, wordCount);

  return allScores;
}

function calculateClarity(text: string, wordCount: number): number {
  let score = 70;

  // Research-based optimal word count scoring
  if (wordCount >= 6 && wordCount <= 12)
    score = 100; // Perfect for memorability
  else if (wordCount >= 13 && wordCount <= 33)
    score = 90; // Optimal range
  else if (wordCount >= 34 && wordCount <= 50)
    score = 70; // Acceptable
  else if (wordCount >= 51 && wordCount <= 100)
    score = 40; // Too long
  else if (wordCount > 100)
    score = 20; // Critically long
  else if (wordCount < 6) score = 50; // Too short

  // Buzzword penalties
  const buzzwords = ['world-class', 'leading', 'solutions', 'synergy', 'innovative', 'excellence'];
  const foundBuzz = buzzwords.filter((word) => text.toLowerCase().includes(word)).length;
  score -= foundBuzz * 6;
  return Math.max(25, Math.min(100, Math.round(score)));
}

function calculateSpecificity(text: string): number {
  let score = 45;
  const strongActions = ['accelerate', 'organize', 'empower', 'unlock', 'transform'];
  const foundStrong = strongActions.filter((verb) => text.toLowerCase().includes(verb)).length;
  score += foundStrong * 25;
  if (text.toLowerCase().includes('energy')) score += 13;
  if (text.toLowerCase().includes('information')) score += 15;
  if (text.toLowerCase().includes('planet')) score += 20;
  return Math.max(15, Math.min(100, Math.round(score)));
}

function calculateImpact(text: string): number {
  let score = 35;
  const globalWords = ['world', 'planet', 'every person', 'every organization', 'humanity'];
  const foundGlobal = globalWords.filter((word) => text.toLowerCase().includes(word)).length;
  score += foundGlobal * 22;
  const transformWords = ['transition', 'accelerate', 'empower', 'organize', 'unlock'];
  const foundTransform = transformWords.filter((word) => text.toLowerCase().includes(word)).length;
  score += foundTransform * 13;
  if (text.toLowerCase().includes('sustainable') || text.toLowerCase().includes('planet'))
    score += 23;
  if (text.toLowerCase().includes('accessible') || text.toLowerCase().includes('universally'))
    score += 20;
  if (text.toLowerCase().includes('information')) score += 15;
  if (text.toLowerCase().includes('organize') && text.toLowerCase().includes('information'))
    score += 5;
  return Math.max(20, Math.min(100, Math.round(score)));
}

function calculateAuthenticity(text: string, wordCount: number): number {
  let score = 75;
  const corporateSpeak = ['stakeholders', 'leverage', 'optimize', 'maximize', 'strategically'];
  const foundCorp = corporateSpeak.filter((word) => text.toLowerCase().includes(word)).length;
  score -= foundCorp * 15;
  if (wordCount < 15 && !text.includes('innovative') && !text.includes('solutions')) score += 2;
  if (
    text.toLowerCase().includes('save') ||
    text.toLowerCase().includes('transition') ||
    text.toLowerCase().includes('empower') ||
    text.toLowerCase().includes('organize')
  )
    score += 8;
  return Math.max(30, Math.min(100, Math.round(score)));
}

function calculateMemorability(text: string, wordCount: number): number {
  let score = 60;

  // Research-based memorability scoring (aligns with 33-word optimal)
  if (wordCount >= 6 && wordCount <= 12)
    score = 100; // Perfect range
  else if (wordCount >= 13 && wordCount <= 33)
    score = 85; // Good range
  else if (wordCount >= 34 && wordCount <= 50)
    score = 65; // Getting long
  else if (wordCount > 50)
    score = 40; // Too long to remember
  else if (wordCount < 6) score = 70; // Too brief

  // Bonus for memorable patterns
  if (text.startsWith('To ') || text.includes("We're in business to")) score += 5;

  // Cognitive load check (7±2 rule)
  const concepts = text.split(/,|—|;|and|to|for/).length;
  if (concepts >= 3 && concepts <= 7) score += 10; // Optimal cognitive load

  return Math.max(35, Math.min(100, Math.round(score)));
}

export default function MissionStatementAnalyzer() {
  const [missionText, setMissionText] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('technology');
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [scores, setScores] = useState<any>(null);
  const [activeView, setActiveView] = useState('analyzer');
  const [savedAnalyses, setSavedAnalyses] = useState<any[]>([]);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [hasUnlimitedAccess, setHasUnlimitedAccess] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareItems, setCompareItems] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load analysis count and saved analyses from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load analysis count and saved analyses from localStorage on mount
  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      const stored = localStorage.getItem('analysisCount');
      setAnalysisCount(stored ? parseInt(stored) : 0);

      // Check if email was already submitted
      const emailSubmittedStored = localStorage.getItem('emailSubmitted');
      const storedEmail = localStorage.getItem('userEmail');
      if (emailSubmittedStored === 'true' && storedEmail) {
        setEmailSubmitted(true);
        setUserEmail(storedEmail);
      }

      // Check for unlimited access
      const unlimitedAccess = localStorage.getItem('hasUnlimitedAccess');
      if (unlimitedAccess === 'true') {
        setHasUnlimitedAccess(true);
      }

      // Load saved analyses from localStorage
      const storedAnalyses = localStorage.getItem('savedAnalyses');
      if (storedAnalyses) {
        try {
          setSavedAnalyses(JSON.parse(storedAnalyses));
        } catch (e) {
          console.error('Failed to parse saved analyses:', e);
        }
      }
    }
  }, [isMounted]);

  const wordCount = useMemo(() => {
    return missionText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  }, [missionText]);

  const FREE_ANALYSIS_LIMIT_WITHOUT_EMAIL = 1;
  const FREE_ANALYSIS_LIMIT_WITH_EMAIL = 2;

  const handleAnalyze = useCallback(() => {
    if (missionText.trim().length < 10) return;

    // Skip limits if user has unlimited access
    if (!hasUnlimitedAccess) {
      // Check analysis limits based on email status
      const currentLimit = emailSubmitted
        ? FREE_ANALYSIS_LIMIT_WITH_EMAIL
        : FREE_ANALYSIS_LIMIT_WITHOUT_EMAIL;

      if (analysisCount >= currentLimit) {
        if (!emailSubmitted) {
          setShowEmailCapture(true);
        } else {
          setShowPaywall(true);
        }
        return;
      }
    }

    const calculatedScores = calculateAllScores(missionText);
    setScores(calculatedScores);
    setIsAnalyzed(true);

    // Increment and store analysis count (only if not unlimited)
    if (!hasUnlimitedAccess) {
      const newCount = analysisCount + 1;
      setAnalysisCount(newCount);
      localStorage.setItem('analysisCount', newCount.toString());
    }

    // Add to saved analyses
    const newAnalysis = {
      id: Date.now(),
      mission: missionText,
      scores: calculatedScores,
      industry: selectedIndustry,
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString(),
    };
    const updatedAnalyses = [newAnalysis, ...savedAnalyses].slice(0, 10);
    setSavedAnalyses(updatedAnalyses);

    // Save to localStorage
    localStorage.setItem('savedAnalyses', JSON.stringify(updatedAnalyses));
  }, [
    missionText,
    selectedIndustry,
    analysisCount,
    savedAnalyses,
    emailSubmitted,
    hasUnlimitedAccess,
  ]);

  const handleExampleClick = useCallback(
    (example: any) => {
      setMissionText(example.mission);

      // Auto-analyze the example
      const calculatedScores = calculateAllScores(example.mission);
      setScores(calculatedScores);
      setIsAnalyzed(true);

      // Add to saved analyses
      const newAnalysis = {
        id: Date.now(),
        mission: example.mission,
        scores: calculatedScores,
        industry: selectedIndustry,
        date: new Date().toLocaleDateString(),
        timestamp: new Date().toISOString(),
        companyName: example.name,
      };
      const updatedAnalyses = [newAnalysis, ...savedAnalyses].slice(0, 10);
      setSavedAnalyses(updatedAnalyses);

      // Save to localStorage
      localStorage.setItem('savedAnalyses', JSON.stringify(updatedAnalyses));
    },
    [selectedIndustry, savedAnalyses]
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 60) return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Strong';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Work';
  };

  const handleDeleteAnalysis = useCallback(
    (id: number) => {
      const updatedAnalyses = savedAnalyses.filter((a) => a.id !== id);
      setSavedAnalyses(updatedAnalyses);
      localStorage.setItem('savedAnalyses', JSON.stringify(updatedAnalyses));
    },
    [savedAnalyses]
  );

  const handleToggleCompare = useCallback(
    (analysis: any) => {
      if (compareItems.find((item) => item.id === analysis.id)) {
        setCompareItems(compareItems.filter((item) => item.id !== analysis.id));
      } else if (compareItems.length < 2) {
        setCompareItems([...compareItems, analysis]);
      }
    },
    [compareItems]
  );

  const handleClearComparison = useCallback(() => {
    setCompareItems([]);
    setCompareMode(false);
  }, []);

  const getRecommendedProduct = useCallback((score: number) => {
    if (score <= 59) {
      return {
        title: '🚨 Emergency Kit Needed',
        description:
          'Your score indicates critical issues. Get the Emergency Kit to fix this in 15 minutes.',
        price: '$27',
        urgency: 'high',
        gumroadUrl: 'https://gumroad.com/l/mission-emergency-kit', // Replace with your actual URL
        buttonText: 'Get Emergency Kit Now',
      };
    } else if (score <= 79) {
      return {
        title: '📈 Optimization Guide Available',
        description:
          'Good start! Get the Optimization Guide to push your score into the excellent range.',
        price: '$19',
        urgency: 'medium',
        gumroadUrl: 'https://gumroad.com/l/mission-optimization-guide', // Replace with your actual URL
        buttonText: 'Get Optimization Guide',
      };
    } else {
      return {
        title: '🏆 Excellent Score!',
        description: 'Want advanced tips for Fortune 500 level mission statements?',
        price: '$9',
        urgency: 'low',
        gumroadUrl: 'https://gumroad.com/l/mission-advanced-tips', // Replace with your actual URL
        buttonText: 'Get Advanced Tips',
      };
    }
  }, []);

  const currentExamples = industryExamples[selectedIndustry as keyof typeof industryExamples] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 relative">
            <button
              onClick={() => setShowPaywall(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <XCircle className="h-6 w-6" />
            </button>

            <div className="text-center">
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">🚀 Ready for Unlimited Analyses?</h3>
              <p className="text-gray-600 mb-6">
                You've used your{' '}
                {emailSubmitted
                  ? FREE_ANALYSIS_LIMIT_WITH_EMAIL
                  : FREE_ANALYSIS_LIMIT_WITHOUT_EMAIL}{' '}
                free analyses. Get the Mission Mastery Framework for unlimited access forever!
              </p>

              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-4 mb-4 text-left">
                  <p className="font-semibold mb-2 text-blue-900">
                    Mission Mastery Framework ($97)
                  </p>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>✓ Unlimited mission statement analyses forever</li>
                    <li>✓ Complete workshop facilitation system</li>
                    <li>✓ Industry-specific templates</li>
                    <li>✓ Team collaboration tools</li>
                  </ul>
                </div>

                <Button
                  onClick={() =>
                    window.open(
                      'https://unshakenleader.gumroad.com/l/mission-mastery-framework',
                      '_blank'
                    )
                  }
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  size="lg"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Get Unlimited Access - $97
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setShowPaywall(false)}
                  className="w-full text-gray-500"
                >
                  Maybe later
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Instant access • 30-day money back guarantee
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Email Capture Modal */}
      {showEmailCapture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 relative">
            <button
              onClick={() => setShowEmailCapture(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center">
              <Lightbulb className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">🎯 Want to Keep Analyzing?</h3>
              <p className="text-gray-600 mb-6">
                Get our FREE Mission Statement Quick Guide PLUS one additional analysis!
              </p>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="text-left text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Instant download of Quick Guide (normally $19)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>One bonus analysis credit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Tips from Fortune 500 examples</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <Button
                  onClick={async () => {
                    if (userEmail && userEmail.includes('@')) {
                      // TODO: Submit to Google Sheets
                      setEmailSubmitted(true);
                      setShowEmailCapture(false);
                      localStorage.setItem('emailSubmitted', 'true');
                      localStorage.setItem('userEmail', userEmail);

                      // Redirect to Gumroad with pre-filled email
                      const gumroadUrl = `https://unshakenleader.gumroad.com/l/mission-statement-quick-guide?email=${encodeURIComponent(userEmail)}`;
                      window.open(gumroadUrl, '_blank');
                    }
                  }}
                  disabled={!userEmail || !userEmail.includes('@')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Get Free Guide + Bonus Analysis
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                No spam ever. Unsubscribe anytime. Used only for mission statement insights.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Mission Analyzer</h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                  Fortune 500 Standards
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                {hasUnlimitedAccess ? (
                  <span className="text-green-600 font-semibold">
                    ✅ Unlimited Access - Mission Mastery Framework Owner
                  </span>
                ) : (
                  <>
                    Free analyses: {analysisCount}/
                    {emailSubmitted
                      ? FREE_ANALYSIS_LIMIT_WITH_EMAIL
                      : FREE_ANALYSIS_LIMIT_WITHOUT_EMAIL}
                    {emailSubmitted && (
                      <span className="text-green-600 ml-2">✓ Email verified</span>
                    )}
                  </>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700"
                onClick={() =>
                  window.open(
                    'https://unshakenleader.gumroad.com/l/mission-statement-mastery-framework',
                    '_blank'
                  )
                }
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Workshop System
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin);
                  // You could add a toast notification here if needed
                  alert('Mission Statement Analyzer link copied to clipboard!');
                }}
                title="Share this Mission Statement Analyzer tool"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Tool
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Button
                  variant={activeView === 'analyzer' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveView('analyzer')}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Analyzer
                </Button>
                <Button
                  variant={activeView === 'tips' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveView('tips')}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Best Practices
                </Button>
              </CardContent>
            </Card>

            {/* Saved Analyses */}
            {savedAnalyses.length > 0 && (
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium">
                      <History className="inline h-4 w-4 mr-1" />
                      History
                    </CardTitle>
                    {savedAnalyses.length > 1 && (
                      <Button
                        size="sm"
                        variant={compareMode ? 'default' : 'outline'}
                        onClick={() => {
                          setCompareMode(!compareMode);
                          if (compareMode) {
                            setCompareItems([]);
                          }
                        }}
                        className="h-7 text-xs"
                      >
                        <GitCompare className="h-3 w-3 mr-1" />
                        Compare
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {compareMode && compareItems.length === 2 && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-3">
                      <div className="text-xs font-medium text-blue-900 mb-2">
                        Comparing 2 items
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={handleClearComparison}
                        className="h-7 text-xs w-full"
                      >
                        Clear Comparison
                      </Button>
                    </div>
                  )}
                  {savedAnalyses.map((analysis) => (
                    <div
                      key={analysis.id}
                      className={`p-3 rounded-lg transition-all ${
                        compareMode
                          ? compareItems.find((item) => item.id === analysis.id)
                            ? 'bg-blue-100 border-2 border-blue-400'
                            : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
                          : 'bg-gray-50 hover:bg-gray-100 cursor-pointer'
                      }`}
                      onClick={() => {
                        if (compareMode) {
                          handleToggleCompare(analysis);
                        } else {
                          setMissionText(analysis.mission);
                          setSelectedIndustry(analysis.industry);
                          setScores(analysis.scores);
                          setIsAnalyzed(true);
                        }
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {analysis.companyName || analysis.mission.substring(0, 30) + '...'}
                          </div>
                          <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {analysis.mission}
                          </div>
                        </div>
                        {!compareMode && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAnalysis(analysis.id);
                            }}
                            className="h-6 w-6 p-0 ml-2"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{analysis.date}</span>
                        <Badge variant="secondary" className="text-xs">
                          Score: {analysis.scores.overall}
                        </Badge>
                      </div>
                      {compareMode && (
                        <div className="mt-2 text-xs text-center">
                          {compareItems.find((item) => item.id === analysis.id)
                            ? '✓ Selected for comparison'
                            : compareItems.length < 2
                              ? 'Click to select'
                              : 'Max 2 items'}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            {/* Hero Section */}
            <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">
                  Analyze Your Mission Statement
                </CardTitle>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Get instant feedback based on Fortune 500 best practices
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Select Your Industry
                  </label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          <span className="flex items-center gap-2">
                            <span>{industry.icon}</span>
                            <span>{industry.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Your Mission Statement
                    </label>
                    <span className="text-xs text-gray-500">{wordCount} words</span>
                  </div>
                  <Textarea
                    placeholder="Enter your mission statement here..."
                    value={missionText}
                    onChange={(e) => setMissionText(e.target.value)}
                    className="min-h-[120px] sm:min-h-[150px] resize-none text-base touch-manipulation"
                  />
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={missionText.trim().length < 10}
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base touch-manipulation"
                  size="lg"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Analyze Mission Statement
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            {isAnalyzed && scores && (
              <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Analysis Results</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`text-lg px-3 py-1 ${
                          scores.overall >= 80
                            ? 'bg-green-100 text-green-800'
                            : scores.overall >= 60
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        Overall Score: {scores.overall}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Core Score Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          name: 'Clarity',
                          score: scores.clarity,
                          icon: <Globe className="h-4 w-4" />,
                        },
                        {
                          name: 'Specificity',
                          score: scores.specificity,
                          icon: <Target className="h-4 w-4" />,
                        },
                        { name: 'Impact', score: scores.impact, icon: <Zap className="h-4 w-4" /> },
                        {
                          name: 'Authenticity',
                          score: scores.authenticity,
                          icon: <Shield className="h-4 w-4" />,
                        },
                        {
                          name: 'Memorability',
                          score: scores.memorability,
                          icon: <Brain className="h-4 w-4" />,
                        },
                      ].map((metric) => (
                        <div key={metric.name} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="text-gray-600">{metric.icon}</div>
                              <span className="text-sm font-medium text-gray-700">
                                {metric.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {getScoreIcon(metric.score)}
                              <span className={`font-semibold ${getScoreColor(metric.score)}`}>
                                {metric.score}
                              </span>
                            </div>
                          </div>
                          <Progress value={metric.score} className="h-2" />
                          <span className="text-xs text-gray-500 mt-1 block">
                            {getScoreLabel(metric.score)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Industry Comparison */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <GitCompare className="h-4 w-4 text-indigo-600" />
                        Industry Comparison
                        <Badge variant="outline" className="text-xs">
                          {industries.find((i) => i.value === selectedIndustry)?.label}
                        </Badge>
                      </h4>
                      {(() => {
                        const industryData =
                          industryExamples[selectedIndustry as keyof typeof industryExamples] || [];

                        // Use all examples for better percentile calculation when industry has few examples
                        const allExamples = Object.values(industryExamples).flat();
                        const useAllForRanking = industryData.length < 5; // Use broader pool if less than 5 examples

                        const avgScore = Math.round(
                          industryData.reduce((a, b) => a + b.score, 0) / industryData.length
                        );
                        const maxScore = Math.max(...industryData.map((e) => e.score));
                        const minScore = Math.min(...industryData.map((e) => e.score));

                        // Calculate ranking - use all examples if industry has too few
                        const comparisonPool = useAllForRanking ? allExamples : industryData;
                        const betterThanCount = comparisonPool.filter(
                          (e) => e.score < scores.overall
                        ).length;
                        const worseThanCount = comparisonPool.filter(
                          (e) => e.score > scores.overall
                        ).length;
                        const rank = betterThanCount + 1; // Rank from bottom
                        const rankFromTop = worseThanCount + 1; // Rank from top
                        const totalInPool = comparisonPool.length;
                        const percentile = Math.round((betterThanCount / totalInPool) * 100);

                        return (
                          <>
                            <div className="space-y-3">
                              {/* Visual comparison bars */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="font-medium text-gray-700">Your Score</span>
                                  <span className={`font-bold ${getScoreColor(scores.overall)}`}>
                                    {scores.overall}
                                  </span>
                                </div>
                                <div className="relative">
                                  <Progress value={scores.overall} className="h-3" />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-600">Industry Average</span>
                                  <span className="font-medium text-gray-700">{avgScore}</span>
                                </div>
                                <div className="relative">
                                  <Progress value={avgScore} className="h-2 opacity-60" />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-600">Industry Best</span>
                                  <span className="font-medium text-green-600">{maxScore}</span>
                                </div>
                                <div className="relative">
                                  <Progress value={maxScore} className="h-2 opacity-60" />
                                </div>
                              </div>

                              {/* Ranking badge */}
                              <div className="flex items-center justify-between pt-2 border-t border-indigo-200">
                                <div className="text-sm">
                                  <span className="text-gray-600">You rank </span>
                                  <span
                                    className={`font-bold ${scores.overall >= avgScore ? 'text-indigo-600' : 'text-red-600'}`}
                                  >
                                    #{rankFromTop}
                                  </span>
                                  <span className="text-gray-600"> of {totalInPool}</span>
                                  {useAllForRanking && (
                                    <span className="text-xs text-gray-500 ml-1">
                                      (all industries)
                                    </span>
                                  )}
                                </div>
                                <Badge
                                  className={
                                    percentile >= 75
                                      ? 'bg-green-100 text-green-800'
                                      : percentile >= 50
                                        ? 'bg-blue-100 text-blue-800'
                                        : percentile >= 25
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-red-100 text-red-800'
                                  }
                                >
                                  {percentile >= 50
                                    ? `Top ${100 - percentile}%`
                                    : `Bottom ${Math.max(1, Math.round((rank / totalInPool) * 100))}%`}
                                </Badge>
                              </div>

                              {/* Contextual message */}
                              <div
                                className={`text-xs p-2 rounded ${
                                  scores.overall > avgScore
                                    ? 'bg-green-100 text-green-700 border border-green-300'
                                    : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                                }`}
                              >
                                {scores.overall > avgScore ? (
                                  <>
                                    ✅ <strong>Above average!</strong> You're{' '}
                                    {scores.overall - avgScore} points ahead of your industry peers.
                                    {maxScore - scores.overall <= 10 &&
                                      " You're close to industry-leading!"}
                                  </>
                                ) : scores.overall === avgScore ? (
                                  <>
                                    📊 <strong>Exactly average.</strong> Room to differentiate from
                                    competitors.
                                  </>
                                ) : (
                                  <>
                                    📈{' '}
                                    <strong>
                                      {avgScore - scores.overall} points below average.
                                    </strong>
                                    {avgScore - scores.overall > 15
                                      ? ' Significant improvement needed to compete.'
                                      : ' Small improvements can help you stand out.'}
                                  </>
                                )}
                              </div>

                              {/* Top performer comparison */}
                              {industryData.length > 0 && (
                                <div className="text-xs text-gray-500 italic">
                                  Industry leader:{' '}
                                  {industryData.sort((a, b) => b.score - a.score)[0].name} (
                                  {maxScore} points)
                                </div>
                              )}
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Pearce-David Components Analysis */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-indigo-600" />
                        Academic Framework Analysis
                        <Badge variant="outline" className="text-xs">
                          {scores.components.detectedCount}/9 Components
                        </Badge>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                        {Object.entries(scores.components.components).map(
                          ([component, detected]) => (
                            <div
                              key={component}
                              className={`text-xs px-2 py-1 rounded ${
                                detected
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {detected ? '✓' : '○'}{' '}
                              {component.charAt(0).toUpperCase() + component.slice(1)}
                            </div>
                          )
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Based on Pearce & David Framework
                        </span>
                        <span
                          className={`text-sm font-medium ${getScoreColor(scores.components.score)}`}
                        >
                          {scores.components.score}/100
                        </span>
                      </div>
                    </div>

                    {/* Readability Analysis */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-indigo-600" />
                        Readability Analysis
                        <Badge variant="outline" className="text-xs">
                          {scores.readability.gradeLevel}
                        </Badge>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Fog Index</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {scores.readability.fogIndex}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Score</div>
                          <div
                            className={`text-lg font-semibold ${getScoreColor(scores.readability.score)}`}
                          >
                            {scores.readability.score}/100
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Lower Fog Index = Better readability for wider audiences
                      </div>
                    </div>

                    {/* Psychological Memorability Analysis */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Brain className="h-4 w-4 text-indigo-600" />
                        Psychological Memorability
                        <Badge variant="outline" className="text-xs">
                          {scores.psychMemory.score}/100
                        </Badge>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cognitive Load:</span>
                            <span
                              className={
                                scores.psychMemory.concepts >= 3 && scores.psychMemory.concepts <= 7
                                  ? 'text-green-600'
                                  : 'text-yellow-600'
                              }
                            >
                              {scores.psychMemory.concepts} concepts
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Emotional Words:</span>
                            <span className="text-purple-600">
                              {scores.psychMemory.emotionalWords}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Concrete Terms:</span>
                            <span className="text-green-600">
                              {scores.psychMemory.concreteWords}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rhythm/Flow:</span>
                            <span
                              className={
                                scores.psychMemory.hasRhythm ? 'text-green-600' : 'text-gray-400'
                              }
                            >
                              {scores.psychMemory.hasRhythm ? '✓' : '○'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Distinctive:</span>
                            <span className="text-purple-600">
                              {scores.psychMemory.distinctivePhrases}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Abstract Words:</span>
                            <span
                              className={
                                scores.psychMemory.abstractWords > 0
                                  ? 'text-red-600'
                                  : 'text-green-600'
                              }
                            >
                              {scores.psychMemory.abstractWords}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Based on cognitive psychology principles for memory optimization
                      </div>
                    </div>

                    {/* Emotional Sentiment Analysis */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-indigo-600" />
                        Emotional Resonance
                        <Badge variant="outline" className="text-xs">
                          {scores.sentiment.score}/100
                        </Badge>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Inspirational:</span>
                            <span className="text-blue-600">{scores.sentiment.inspirational}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Action Intensity:</span>
                            <span className="text-red-600">{scores.sentiment.action}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Connection:</span>
                            <span className="text-green-600">{scores.sentiment.connection}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Purpose-Driven:</span>
                            <span className="text-purple-600">{scores.sentiment.purpose}</span>
                          </div>
                        </div>
                      </div>
                      {scores.sentiment.negative > 0 && (
                        <div className="mt-2 text-xs text-red-600">
                          ⚠️ Contains {scores.sentiment.negative} negative sentiment word(s)
                        </div>
                      )}
                      <div className="mt-2 text-xs text-gray-500">
                        Measures emotional impact and inspirational language
                      </div>
                    </div>

                    {/* Smart Improvement Suggestions */}
                    {scores.suggestions && scores.suggestions.length > 0 && (
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-indigo-600" />
                          Quick Improvement Opportunities
                          <Badge
                            variant="outline"
                            className="text-xs bg-indigo-100 text-indigo-700"
                          >
                            {scores.suggestions.length} issue
                            {scores.suggestions.length > 1 ? 's' : ''} found
                          </Badge>
                        </h4>
                        <div className="space-y-3">
                          {scores.suggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              className="p-3 rounded-lg border bg-white border-indigo-200"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-lg">{suggestion.icon}</span>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm text-gray-900">
                                      {suggestion.type}
                                    </span>
                                    <Badge
                                      className={`text-xs ${
                                        suggestion.priority === 'high'
                                          ? 'bg-indigo-100 text-indigo-800'
                                          : 'bg-indigo-100 text-indigo-700'
                                      }`}
                                    >
                                      {suggestion.priority} priority
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-gray-700 mb-1">
                                    <strong>Issue:</strong> {suggestion.issue}
                                  </div>
                                  <div className="text-sm text-gray-600 mb-2">
                                    <strong>Fix:</strong> {suggestion.suggestion}
                                  </div>
                                  <div className="text-xs text-gray-500 italic">
                                    💡 {suggestion.example}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Call to Action - Removed old product offers
                        <div className="mt-4 p-3 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg border border-red-300">
                          <div className="text-center">
                            <div className="text-sm font-medium text-red-800 mb-1">
                              🚨 Need detailed guidance to fix these issues?
                            </div>
                            <div className="text-xs text-red-700 mb-3">
                              Get step-by-step instructions, templates, and examples in our improvement guides
                            </div>
                            <Button
                              onClick={() => {
                                const product = getRecommendedProduct(scores.overall);
                                window.open(product.gumroadUrl, '_blank');
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white text-sm"
                              size="sm"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Get Improvement Guide - {getRecommendedProduct(scores.overall).price}
                            </Button>
                          </div>
                        </div>
                        */}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mission Mastery System Upsell */}
            {isAnalyzed && scores && (
              <Card className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl mb-3">🏆</div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">
                      Ready to Transform Your Organization?
                    </h3>
                    <p className="text-base text-blue-700 mb-5">
                      Get the complete Fortune 500 workshop system with everything you need to
                      facilitate your own mission statement workshop.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-blue-700 mb-5">
                      <div className="text-left">
                        ✓ 3-Hour Workshop Playbook
                        <br />
                        ✓ Facilitator Scripts & Materials
                        <br />✓ Industry-Specific Templates
                      </div>
                      <div className="text-left">
                        ✓ Performance Measurement Dashboard
                        <br />
                        ✓ 90-Day Integration Plan
                        <br />✓ ROI Calculation Framework
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 mb-5">
                      <span className="text-base text-gray-500 line-through">
                        Regular Price: $299
                      </span>
                      <span className="text-xl font-bold text-blue-900">Launch Price: $97</span>
                    </div>
                    <Button
                      onClick={() =>
                        window.open(
                          'https://unshakenleader.gumroad.com/l/mission-statement-mastery-framework',
                          '_blank'
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white text-base"
                      size="lg"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Get Mission Mastery System - $97
                    </Button>
                    <p className="text-sm text-blue-600 mt-3">
                      Save $202 with launch pricing (67% off)
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comparison View */}
            {compareMode && compareItems.length === 2 && (
              <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <GitCompare className="h-5 w-5 mr-2" />
                      Mission Statement Comparison
                    </CardTitle>
                    <Button size="sm" variant="outline" onClick={handleClearComparison}>
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {compareItems.map((item, index) => (
                      <div key={item.id} className="space-y-3">
                        <div className="font-medium text-sm">
                          {item.companyName || `Analysis ${index + 1}`}
                        </div>
                        <div className="text-xs text-gray-600 italic">"{item.mission}"</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-xs">Overall</span>
                            <Badge
                              className={
                                item.scores.overall >= 80
                                  ? 'bg-green-100 text-green-800'
                                  : item.scores.overall >= 60
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                              }
                            >
                              {item.scores.overall}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-xs">Clarity</span>
                            <span className="text-xs font-medium">{item.scores.clarity}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-xs">Specificity</span>
                            <span className="text-xs font-medium">{item.scores.specificity}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-xs">Impact</span>
                            <span className="text-xs font-medium">{item.scores.impact}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-xs">Authenticity</span>
                            <span className="text-xs font-medium">{item.scores.authenticity}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-xs">Memorability</span>
                            <span className="text-xs font-medium">{item.scores.memorability}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-white rounded">
                    <div className="text-xs font-medium mb-2">Score Difference</div>
                    <div className="text-center">
                      <span className="text-2xl font-bold">
                        {Math.abs(compareItems[0].scores.overall - compareItems[1].scores.overall)}
                      </span>
                      <span className="text-sm text-gray-600 ml-2">points</span>
                    </div>
                    <div className="text-xs text-center text-gray-600 mt-2">
                      {compareItems[0].scores.overall > compareItems[1].scores.overall
                        ? `"${compareItems[0].companyName || 'First'}" scores higher`
                        : compareItems[1].scores.overall > compareItems[0].scores.overall
                          ? `"${compareItems[1].companyName || 'Second'}" scores higher`
                          : 'Both have equal scores'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Score-based Product Recommendation - Removed old product offers */}
            {/* {isAnalyzed && scores && (
              (() => {
                const product = getRecommendedProduct(scores.overall);
                return (
                  <Card className={`mb-6 ${
                    product.urgency === 'high' ? 'border-red-200 bg-red-50' :
                    product.urgency === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                    'border-green-200 bg-green-50'
                  }`}>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className={`text-lg font-semibold mb-2 ${
                          product.urgency === 'high' ? 'text-red-800' :
                          product.urgency === 'medium' ? 'text-yellow-800' :
                          'text-green-800'
                        }`}>
                          {product.title}
                        </h3>
                        <p className={`text-sm mb-4 ${
                          product.urgency === 'high' ? 'text-red-700' :
                          product.urgency === 'medium' ? 'text-yellow-700' :
                          'text-green-700'
                        }`}>
                          {product.description}
                        </p>
                        <Button
                          onClick={() => window.open(product.gumroadUrl, '_blank')}
                          className={`${
                            product.urgency === 'high' ? 'bg-red-600 hover:bg-red-700' :
                            product.urgency === 'medium' ? 'bg-yellow-600 hover:bg-yellow-700' :
                            'bg-green-600 hover:bg-green-700'
                          } text-white`}
                          size="lg"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {product.buttonText} - {product.price}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()
            )} */}

            {/* Industry Examples */}
            {activeView === 'analyzer' && currentExamples.length > 0 && (
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-lg">Industry Examples</CardTitle>
                  <p className="text-sm text-gray-600">
                    Click any example to test it in the analyzer
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentExamples.map((example) => (
                    <div
                      key={example.name}
                      onClick={() => handleExampleClick(example)}
                      className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{example.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              Score: {example.score}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{example.mission}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 mt-1" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 order-3 lg:order-3">
            {/* Quick Stats */}
            <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Analyses Today</span>
                  <span className="font-semibold">{savedAnalyses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg Score</span>
                  <span className="font-semibold">
                    {savedAnalyses.length > 0
                      ? Math.round(
                          savedAnalyses.reduce((acc, a) => acc + a.scores.overall, 0) /
                            savedAnalyses.length
                        )
                      : '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Best Score</span>
                  <span className="font-semibold">
                    {savedAnalyses.length > 0
                      ? Math.max(...savedAnalyses.map((a) => a.scores.overall))
                      : '-'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Mission Mastery Promo - Only show after email submission */}
            {emailSubmitted && (
              <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium text-gray-900 flex items-center">
                    <div className="text-lg mr-2">🎯</div>
                    For Organizations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700">
                    Get the complete workshop system to transform your entire organization's
                    mission.
                  </p>
                  <Button
                    onClick={() =>
                      window.open(
                        'https://unshakenleader.gumroad.com/l/mission-statement-mastery-framework',
                        '_blank'
                      )
                    }
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
                    size="sm"
                  >
                    Workshop System - $97
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-600">
                    Keep it under 20 words for maximum impact
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-600">
                    Start with an action verb like "To empower" or "To transform"
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-600">
                    Avoid buzzwords like "synergy" or "leverage"
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-600">
                    Focus on your unique value proposition
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
