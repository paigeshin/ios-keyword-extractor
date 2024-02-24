# ios-keyword-extractor

### How to use it

- Automatically Sorts All Keywords
- Plurals Removed
- Duplicates Removed
- Put all your exisiting keywords to avoid duplicate keywords

```jsx
const { extractKeywords } = require("extractKeywords");

const inputTitles = [
  {
    title: "Bulking with Ideal Protein, Super Power",
    subtitle: "Gain weight, muscle, meals",
  },
  {
    title: "Arise Bodybuilding meal plan",
    subtitle: "Body building app, bulq, plate",
  },
];

// My Previous Keywords.. You can give Empty Array
const existingKeywords = [
  "foodnoms",
  "bulk",
  "myprotein",
  "tracking",
  "well",
  "menu",
  "planner",
  "my",
  "fitness",
  "pal",
  "myfitnesspal",
  "calories",
  "diary",
  "macros",
  "clean",
  "simple",
  "eats",
];

const inputKeywords = [
  "Bulking with Ideal Protein, Super Power",
  "planning power hahaha kk",
  "workout",
  "healthy",
  "fitnesspal",
  "fit",
  "fit",
  "fit",
  "fit",
  "fits",
  "fitness",
  "fitnesses",
  "cycling",
  "para",
  "fire",
  "prep",
  "foodnoms",
  "bulk",
  "myprotein",
  "tracking",
  "well",
  "menu",
  "planner",
  "my",
  "fitness",
  "pal",
  "myfitnesspal",
  "calories",
  "diary",
  "macros",
  "clean",
  "simple",
  "eats",
  "intake",
  "strength",
];

const result = extractKeywords(inputTitles, existingKeywords, inputKeywords);
console.log(result);
let totalWordCount = result.reduce((acc, word) => acc + word.length, 0);
console.log(totalWordCount);
```
