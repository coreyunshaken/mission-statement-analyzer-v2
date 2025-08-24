// Automated Script to Fix ALL Hardcoded Example Scores
// This script extracts all mission statements from the app and calculates their correct scores

const fs = require('fs');

// Copy the exact scoring functions from our score-calculator.js
function detectPearceDavidComponents(text) {
  const components = {
    customers: /customer|client|user|people|person|everyone|community|society|humanity|individuals/i.test(text),
    products: /product|service|solution|platform|technology|tool|system|energy|information/i.test(text),
    markets: /world|global|local|market|region|nation|everywhere|worldwide|planet/i.test(text),
    technology: /technology|innovation|digital|platform|data|information|software|energy|transition|accelerate/i.test(text),
    profitability: /sustainable|growth|value|profit|success|thrive|prosper|achieve|transition/i.test(text),
    philosophy: /believe|value|principle|culture|integrity|excellence|quality|mission|inspire/i.test(text),
    advantage: /best|leading|unique|first|only|superior|innovative|pioneer|accelerate|empower|organize|transform/i.test(text),
    publicImage: /responsible|ethical|sustainable|environment|social|community|society|planet|world/i.test(text),
    employees: /employee|team|people|talent|workforce|culture|empower|organization|every person/i.test(text)
  };
  
  const detectedCount = Object.values(components).filter(Boolean).length;
  let score = 25;
  if (detectedCount >= 4) score = 50;
  if (detectedCount >= 6) score = 75;
  if (detectedCount >= 8) score = 100;
  
  return { components, detectedCount, score };
}

function calculateReadability(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const sentenceCount = sentences.length || 1;
  
  const complexWords = words.filter(word => {
    const syllables = word.toLowerCase().replace(/[^aeiou]/g, '').length;
    return syllables >= 3;
  }).length;
  
  const avgWordsPerSentence = wordCount / sentenceCount;
  const percentComplexWords = (complexWords / wordCount) * 100;
  const fogIndex = 0.4 * (avgWordsPerSentence + percentComplexWords);
  
  let readabilityScore = 40;
  if (fogIndex < 8) readabilityScore = 100;
  else if (fogIndex < 12) readabilityScore = 80;
  else if (fogIndex < 16) readabilityScore = 60;
  
  return {
    fogIndex: Math.round(fogIndex * 10) / 10,
    score: readabilityScore
  };
}

function calculateClarity(text, wordCount) {
  let score = 70;
  
  if (wordCount >= 6 && wordCount <= 12) score = 100;
  else if (wordCount >= 13 && wordCount <= 33) score = 90;
  else if (wordCount >= 34 && wordCount <= 50) score = 70;
  else if (wordCount >= 51 && wordCount <= 100) score = 40;
  else if (wordCount > 100) score = 20;
  else if (wordCount < 6) score = 50;
  
  const buzzwords = ["world-class", "leading", "solutions", "synergy", "innovative", "excellence"];
  const foundBuzz = buzzwords.filter((word) => text.toLowerCase().includes(word)).length;
  score -= foundBuzz * 6;
  return Math.max(25, Math.min(100, Math.round(score)));
}

function calculateSpecificity(text) {
  let score = 45;
  const strongActions = ["accelerate", "organize", "empower", "unlock", "transform"];
  const foundStrong = strongActions.filter((verb) => text.toLowerCase().includes(verb)).length;
  score += foundStrong * 25;
  if (text.toLowerCase().includes("energy")) score += 13;
  if (text.toLowerCase().includes("information")) score += 15;
  if (text.toLowerCase().includes("planet")) score += 20;
  return Math.max(15, Math.min(100, Math.round(score)));
}

function calculateImpact(text) {
  let score = 35;
  const globalWords = ["world", "planet", "every person", "every organization", "humanity"];
  const foundGlobal = globalWords.filter((word) => text.toLowerCase().includes(word)).length;
  score += foundGlobal * 22;
  const transformWords = ["transition", "accelerate", "empower", "organize", "unlock"];
  const foundTransform = transformWords.filter((word) => text.toLowerCase().includes(word)).length;
  score += foundTransform * 13;
  if (text.toLowerCase().includes("sustainable") || text.toLowerCase().includes("planet")) score += 23;
  if (text.toLowerCase().includes("accessible") || text.toLowerCase().includes("universally")) score += 20;
  if (text.toLowerCase().includes("information")) score += 15;
  if (text.toLowerCase().includes("organize") && text.toLowerCase().includes("information")) score += 5;
  return Math.max(20, Math.min(100, Math.round(score)));
}

function calculateAuthenticity(text, wordCount) {
  let score = 75;
  const corporateSpeak = ["stakeholders", "leverage", "optimize", "maximize", "strategically"];
  const foundCorp = corporateSpeak.filter((word) => text.toLowerCase().includes(word)).length;
  score -= foundCorp * 15;
  if (wordCount < 15 && !text.includes("innovative") && !text.includes("solutions")) score += 2;
  if (
    text.toLowerCase().includes("save") ||
    text.toLowerCase().includes("transition") ||
    text.toLowerCase().includes("empower") ||
    text.toLowerCase().includes("organize")
  ) score += 8;
  return Math.max(30, Math.min(100, Math.round(score)));
}

function calculateMemorability(text, wordCount) {
  let score = 60;
  
  if (wordCount >= 6 && wordCount <= 12) score = 100;
  else if (wordCount >= 13 && wordCount <= 33) score = 85;
  else if (wordCount >= 34 && wordCount <= 50) score = 65;
  else if (wordCount > 50) score = 40;
  else if (wordCount < 6) score = 70;
  
  if (text.startsWith("To ") || text.includes("We're in business to")) score += 5;
  
  const concepts = text.split(/,|—|;|and|to|for/).length;
  if (concepts >= 3 && concepts <= 7) score += 10;
  
  return Math.max(35, Math.min(100, Math.round(score)));
}

function calculatePsychologicalMemorability(text, wordCount) {
  let score = 50;
  
  const concepts = text.split(/,|;|and|to|for|with|by/).length;
  if (concepts >= 3 && concepts <= 7) score += 15;
  else if (concepts <= 2) score += 5;
  else score -= 10;
  
  const emotionalWords = /inspire|empower|transform|accelerate|create|build|achieve|unlock|breakthrough|innovate|revolutionize|pioneer/gi;
  const emotionalMatches = (text.match(emotionalWords) || []).length;
  score += emotionalMatches * 8;
  
  const concreteWords = /energy|information|people|world|planet|health|money|technology|product|service/gi;
  const abstractWords = /excellence|synergy|optimization|leverage|strategic|innovative|solutions/gi;
  const concreteCount = (text.match(concreteWords) || []).length;
  const abstractCount = (text.match(abstractWords) || []).length;
  score += concreteCount * 5;
  score -= abstractCount * 3;
  
  const hasRhythm = /to \w+.*to \w+|every \w+.*every \w+|\w+ing.*\w+ing/i.test(text);
  if (hasRhythm) score += 10;
  
  const distinctivePhrases = /world's|planet's|every person|every organization|transition to|accessible and useful/gi;
  const distinctiveMatches = (text.match(distinctivePhrases) || []).length;
  score += distinctiveMatches * 6;
  
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
    distinctivePhrases: distinctiveMatches
  };
}

function calculateEmotionalSentiment(text) {
  let score = 40;
  
  const inspirationalWords = /inspire|hope|dream|vision|future|better|transform|empower|elevate|uplift/gi;
  const inspirationalCount = (text.match(inspirationalWords) || []).length;
  score += inspirationalCount * 12;
  
  const actionWords = /accelerate|organize|revolutionize|transform|unlock|breakthrough|pioneer|create|build|achieve/gi;
  const actionCount = (text.match(actionWords) || []).length;
  score += actionCount * 10;
  
  const connectionWords = /together|community|everyone|every person|humanity|world|planet|unite|connect/gi;
  const connectionCount = (text.match(connectionWords) || []).length;
  score += connectionCount * 8;
  
  const purposeWords = /mission|purpose|meaning|impact|difference|change|better|improve|help/gi;
  const purposeCount = (text.match(purposeWords) || []).length;
  score += purposeCount * 6;
  
  const negativeWords = /problem|crisis|struggle|difficult|challenge|fail|impossible/gi;
  const negativeCount = (text.match(negativeWords) || []).length;
  score -= negativeCount * 8;
  
  return {
    score: Math.max(20, Math.min(100, Math.round(score))),
    inspirational: inspirationalCount,
    action: actionCount,
    connection: connectionCount,
    purpose: purposeCount,
    negative: negativeCount
  };
}

function calculateAllScores(text) {
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const pearceDavid = detectPearceDavidComponents(text);
  const readability = calculateReadability(text);
  const psychMemory = calculatePsychologicalMemorability(text, wordCount);
  const sentiment = calculateEmotionalSentiment(text);
  
  return {
    clarity: calculateClarity(text, wordCount),
    specificity: calculateSpecificity(text),
    impact: calculateImpact(text),
    authenticity: calculateAuthenticity(text, wordCount),
    memorability: calculateMemorability(text, wordCount),
    components: pearceDavid,
    readability: readability,
    psychMemory: psychMemory,
    sentiment: sentiment,
    overall: Math.round((
      calculateClarity(text, wordCount) +
      calculateSpecificity(text) +
      calculateImpact(text) +
      calculateAuthenticity(text, wordCount) +
      calculateMemorability(text, wordCount) +
      pearceDavid.score +
      readability.score +
      psychMemory.score +
      sentiment.score
    ) / 9)
  };
}

// Read the app file and extract all mission statements
function extractAndFixScores() {
  const appContent = fs.readFileSync('/Users/coreynew/mission-statement-analyzer/app/page.tsx', 'utf8');
  
  // Find all mission statements and their scores
  const missionRegex = /{\s*name:\s*"([^"]+)",\s*mission:\s*"([^"]+)",\s*score:\s*(\d+),?\s*}/g;
  let match;
  const updates = [];
  
  console.log("=== FIXING ALL HARDCODED SCORES ===\n");
  
  while ((match = missionRegex.exec(appContent)) !== null) {
    const [fullMatch, name, mission, oldScore] = match;
    const newScore = calculateAllScores(mission).overall;
    
    if (parseInt(oldScore) !== newScore) {
      console.log(`${name}: ${oldScore} → ${newScore} (${newScore - parseInt(oldScore) > 0 ? '+' : ''}${newScore - parseInt(oldScore)})`);
      console.log(`Mission: "${mission}"`);
      console.log(`---`);
      
      updates.push({
        oldMatch: fullMatch,
        newMatch: fullMatch.replace(`score: ${oldScore}`, `score: ${newScore}`),
        name,
        oldScore: parseInt(oldScore),
        newScore
      });
    }
  }
  
  console.log(`\nTotal mismatches found: ${updates.length}`);
  return updates;
}

// Run the analysis
const updates = extractAndFixScores();

if (updates.length > 0) {
  console.log("\nTo fix these, run the following commands:");
  updates.forEach((update, index) => {
    console.log(`\n// Update ${index + 1}: ${update.name}`);
    console.log(`// Change score from ${update.oldScore} to ${update.newScore}`);
  });
} else {
  console.log("\n✅ All scores are already correct!");
}