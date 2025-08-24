// Automated Script to Apply ALL Score Fixes
const fs = require('fs');

// All the updates we need to make (from our analysis)
const updates = [
  { name: "HealthTech Pioneer", oldScore: 90, newScore: 83 },
  { name: "MedAdvance Corp", oldScore: 90, newScore: 82 },
  { name: "Mayo Clinic", oldScore: 68, newScore: 62 },
  { name: "FinTech Leader", oldScore: 88, newScore: 83 },
  { name: "Mastercard", oldScore: 75, newScore: 67 },
  { name: "PayPal", oldScore: 68, newScore: 60 },
  { name: "RetailMax", oldScore: 83, newScore: 74 },
  { name: "Walmart", oldScore: 71, newScore: 66 },
  { name: "Target", oldScore: 69, newScore: 58 },
  { name: "EcoManufacturing Co", oldScore: 93, newScore: 83 },
  { name: "Cargill", oldScore: 78, newScore: 67 },
  { name: "EduGlobal", oldScore: 84, newScore: 79 },
  { name: "Khan Academy", oldScore: 71, newScore: 62 },
  { name: "Global Relief", oldScore: 81, newScore: 70 },
  { name: "Red Cross", oldScore: 69, newScore: 60 },
  { name: "TravelForward", oldScore: 83, newScore: 78 },
  { name: "Airbnb", oldScore: 73, newScore: 64 },
  { name: "SustainEnergy Corp", oldScore: 91, newScore: 81 },
  { name: "MobilityNext", oldScore: 78, newScore: 75 },
  { name: "FedEx", oldScore: 73, newScore: 66 },
  { name: "EntertainForward", oldScore: 94, newScore: 81 },
  { name: "Netflix", oldScore: 63, newScore: 57 },
  { name: "AgriSustain", oldScore: 90, newScore: 80 },
  { name: "HomeUnlock", oldScore: 77, newScore: 66 },
  { name: "Zillow", oldScore: 77, newScore: 70 },
  { name: "Patagonia", oldScore: 84, newScore: 71 },
  { name: "TechVision Corp", oldScore: 90, newScore: 81 }
];

function applyAllFixes() {
  let appContent = fs.readFileSync('/Users/coreynew/mission-statement-analyzer/app/page.tsx', 'utf8');
  let changesApplied = 0;
  
  console.log("=== APPLYING ALL SCORE FIXES ===\n");
  
  updates.forEach(update => {
    // Create a more specific regex that looks for the name and old score
    const regex = new RegExp(
      `(\\s*name:\\s*"${update.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",\\s*(?:.*?\\s*)*?score:\\s*)${update.oldScore}(,?\\s*)`,
      'g'
    );
    
    const oldContent = appContent;
    appContent = appContent.replace(regex, `$1${update.newScore}$2`);
    
    if (oldContent !== appContent) {
      console.log(`✓ ${update.name}: ${update.oldScore} → ${update.newScore}`);
      changesApplied++;
    } else {
      console.log(`✗ ${update.name}: Pattern not found`);
    }
  });
  
  // Write the updated content back
  fs.writeFileSync('/Users/coreynew/mission-statement-analyzer/app/page.tsx', appContent);
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`Changes applied: ${changesApplied}/${updates.length}`);
  console.log(`File updated: app/page.tsx`);
  
  return changesApplied;
}

// Run the fixes
const applied = applyAllFixes();

if (applied > 0) {
  console.log("\n🎉 Score fixes applied! All hardcoded scores should now match the live algorithm.");
  console.log("Refresh your browser to see the corrected scores.");
} else {
  console.log("\n⚠️  No changes were applied. Check the regex patterns.");
}