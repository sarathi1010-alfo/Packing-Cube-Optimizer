import { TripPlan } from './store';

export interface HeuristicResult {
  nudges: string[];
  efficiencyScore: number;
}

export function generateHeuristics(tripPlan: TripPlan | null): HeuristicResult {
  const nudges: string[] = [];

  if (!tripPlan || !tripPlan.items || tripPlan.items.length === 0) {
    return { nudges, efficiencyScore: 0 };
  }

  const items = tripPlan.items;

  // Rule 1: Electronics Overload
  const electronics = items.filter(i => i.category === 'electronics');
  if (electronics.length > 5) {
    nudges.push("High electronics load detected. Consider consolidating chargers or using universal adapters to save weight.");
  }

  // Rule 2: Missing Essentials
  const hasPassport = items.some(i => i.name.toLowerCase().includes('passport'));
  if (tripPlan.scenario === 'backpacking' && !hasPassport) {
    nudges.push("You selected a 'backpacking' scenario, but 'passport' is missing. Double-check your documents!");
  }

  // Rule 3: Missing Toiletries
  const toiletries = items.filter(i => i.category === 'toiletries');
  if (toiletries.length === 0) {
    nudges.push("No toiletries packed. Make sure to pack toothbrush, toothpaste, and any essential liquids.");
  }

  // Rule 4: Duplicates
  const itemNames = items.map(i => i.name.toLowerCase().trim());
  const duplicates = itemNames.filter((item, index) => itemNames.indexOf(item) !== index);
  if (duplicates.length > 0) {
    // Unique duplicates for message
    const uniqueDuplicates = Array.from(new Set(duplicates));
    nudges.push(`You might have packed duplicates: ${uniqueDuplicates.join(', ')}.`);
  }

  // Scoring
  const essentials = items.filter(i => i.isEssential);
  const packedEssentials = essentials.filter(i => i.isPacked).length;
  const totalEssentials = essentials.length;

  let efficiencyScore = 100;

  if (totalEssentials > 0) {
    efficiencyScore = Math.round((packedEssentials / totalEssentials) * 100);
  } else if (items.length > 0) {
     // If no essentials marked, base it on overall packed items
     const packedItems = items.filter(i => i.isPacked).length;
     efficiencyScore = Math.round((packedItems / items.length) * 100);
  }

  // Deduct points for negative heuristics
  if (electronics.length > 5) efficiencyScore -= 5;
  if (duplicates.length > 0) efficiencyScore -= 5;

  // Ensure score stays within 0-100 bounds
  efficiencyScore = Math.max(0, Math.min(100, efficiencyScore));

  return { nudges, efficiencyScore };
}
