// Test script to calculate actual scores for researched mission statements

function calculateAllScores(text) {
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length
  
  return {
    clarity: calculateClarity(text, wordCount),
    specificity: calculateSpecificity(text),
    impact: calculateImpact(text),
    authenticity: calculateAuthenticity(text, wordCount),
    memorability: calculateMemorability(text, wordCount),
    overall: Math.round((
      calculateClarity(text, wordCount) +
      calculateSpecificity(text) +
      calculateImpact(text) +
      calculateAuthenticity(text, wordCount) +
      calculateMemorability(text, wordCount)
    ) / 5)
  }
}

function calculateClarity(text, wordCount) {
  let score = 83
  if (wordCount >= 8 && wordCount <= 20) score = 88
  else if (wordCount >= 21 && wordCount <= 30) score = 88
  else if (wordCount > 30) score = 82 - (wordCount - 30) * 1.2
  else if (wordCount < 8) score = 65 - (8 - wordCount) * 3
  const buzzwords = ["world-class", "leading", "solutions", "synergy", "innovative", "excellence"]
  const foundBuzz = buzzwords.filter((word) => text.toLowerCase().includes(word)).length
  score -= foundBuzz * 6
  return Math.max(25, Math.min(100, Math.round(score)))
}

function calculateSpecificity(text) {
  let score = 45
  const strongActions = ["accelerate", "organize", "empower", "unlock", "transform"]
  const foundStrong = strongActions.filter((verb) => text.toLowerCase().includes(verb)).length
  score += foundStrong * 25
  if (text.toLowerCase().includes("energy")) score += 13
  if (text.toLowerCase().includes("information")) score += 15
  if (text.toLowerCase().includes("planet")) score += 20
  return Math.max(15, Math.min(100, Math.round(score)))
}

function calculateImpact(text) {
  let score = 35
  const globalWords = ["world", "planet", "every person", "every organization", "humanity"]
  const foundGlobal = globalWords.filter((word) => text.toLowerCase().includes(word)).length
  score += foundGlobal * 22
  const transformWords = ["transition", "accelerate", "empower", "organize", "unlock"]
  const foundTransform = transformWords.filter((word) => text.toLowerCase().includes(word)).length
  score += foundTransform * 13
  if (text.toLowerCase().includes("sustainable") || text.toLowerCase().includes("planet")) score += 23
  if (text.toLowerCase().includes("accessible") || text.toLowerCase().includes("universally")) score += 20
  if (text.toLowerCase().includes("information")) score += 15
  if (text.toLowerCase().includes("organize") && text.toLowerCase().includes("information")) score += 5
  return Math.max(20, Math.min(100, Math.round(score)))
}

function calculateAuthenticity(text, wordCount) {
  let score = 75
  const corporateSpeak = ["stakeholders", "leverage", "optimize", "maximize", "strategically"]
  const foundCorp = corporateSpeak.filter((word) => text.toLowerCase().includes(word)).length
  score -= foundCorp * 15
  if (wordCount < 15 && !text.includes("innovative") && !text.includes("solutions")) score += 2
  if (
    text.toLowerCase().includes("save") ||
    text.toLowerCase().includes("transition") ||
    text.toLowerCase().includes("empower") ||
    text.toLowerCase().includes("organize")
  )
    score += 8
  return Math.max(30, Math.min(100, Math.round(score)))
}

function calculateMemorability(text, wordCount) {
  let score = 70
  if (wordCount >= 6 && wordCount <= 12) score = 93
  else if (wordCount >= 13 && wordCount <= 20) score = 90
  else if (wordCount >= 21 && wordCount <= 30) score = 82
  else if (wordCount > 30) score = 75 - (wordCount - 30) * 2
  if (text.startsWith("To ") || text.includes("We're in business to")) score += 5
  const ideas = text.split(/,|—|;/).length
  if (ideas === 1) score += 8
  return Math.max(35, Math.min(100, Math.round(score)))
}

// Test all researched mission statements
const missionStatements = {
  // Healthcare
  "Mayo Clinic": "Inspiring hope and promoting health through integrated clinical practice, education and research.",
  "CVS Health (current)": "To deliver superior and more connected experiences, lower the cost of care and improve the health and well-being of those we serve.",
  "CVS Health (purpose)": "Bringing our heart to every moment of your health.",
  
  // Finance  
  "JPMorgan Chase (current)": "To enable more people to contribute to and share in the rewards of a growing economy.",
  "PayPal (current)": "Revolutionize commerce globally by radically changing the way consumers shop and merchants do business.",
  "PayPal (simple)": "To democratize financial services to ensure that everyone has access to affordable, convenient, and secure products.",
  "Mastercard (current)": "Connect and power a digital economy that benefits people, businesses & governments worldwide by making transactions safe, simple & accessible.",
  
  // Retail
  "Amazon (current)": "To be Earth's most customer-centric company, Earth's best employer, and Earth's safest place to work.",
  "Amazon (simple)": "To be Earth's most customer-centric company.",
  "Walmart": "To save people money so that they can live better.",
  "Target": "To help all families discover the joy of everyday life.",
  
  // Education
  "Khan Academy": "Provide a free, world-class education to anyone, anywhere.",
  "Coursera": "Provide universal access to world-class learning.",
  
  // Non-profit
  "Red Cross": "The American Red Cross prevents and alleviates human suffering in the face of emergencies by mobilizing the power of volunteers and the generosity of donors.",
  "Red Cross (short)": "To prevent and alleviate human suffering in the face of emergencies.",
  "UNICEF": "To advocate for the protection of children's rights, to help meet their basic needs and to expand their opportunities to reach their full potential.",
  
  // Other
  "Airbnb": "Create a world where anyone can belong anywhere.",
  "FedEx": "FedEx Corporation will produce superior financial returns for its shareowners by providing high value-added logistics, transportation, and related business services through focused operating companies.",
  "FedEx (simple)": "To connect people and possibilities around the world.",
  "Cargill": "We work alongside farmers, producers, manufacturers, retailers, governments, and other organizations to fulfill our purpose to nourish the world in a safe, responsible and sustainable way.",
  "Cargill (simple)": "To nourish the world in a safe, responsible and sustainable way.",
  "Zillow (current)": "Make home a reality for more and more people.",
  "Zillow (alt)": "To give people the power to unlock life's next chapter."
}

console.log("=== MISSION STATEMENT SCORE ANALYSIS ===\n")

// Sort by score for easier analysis
const results = []
for (const [company, mission] of Object.entries(missionStatements)) {
  const scores = calculateAllScores(mission)
  results.push({ company, mission, ...scores })
}

results.sort((a, b) => b.overall - a.overall)

// Show results
results.forEach(result => {
  console.log(`${result.company}: ${result.overall} points`)
  console.log(`Mission: "${result.mission}"`)
  console.log(`Breakdown: Clarity=${result.clarity}, Specificity=${result.specificity}, Impact=${result.impact}, Authenticity=${result.authenticity}, Memorability=${result.memorability}`)
  console.log(`Words: ${result.mission.trim().split(/\s+/).length}`)
  console.log("---")
})

// Show high scorers (85+)
console.log("\n=== HIGH SCORERS (85+ points) ===")
results.filter(r => r.overall >= 85).forEach(result => {
  console.log(`${result.company}: ${result.overall} - "${result.mission}"`)
})

console.log("\n=== GOOD SCORERS (80-84 points) ===")  
results.filter(r => r.overall >= 80 && r.overall < 85).forEach(result => {
  console.log(`${result.company}: ${result.overall} - "${result.mission}"`)
})