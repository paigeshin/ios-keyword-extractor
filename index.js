const {
  duplicatesRemoved,
  redundantPluralsRemoved,
  shuffled,
} = require("./utils/array-extension");

function extractKeywords(titlesArray, existingKeywords, newKeywords) {
  let resultKeywords = [];
  let charCount = 0;

  // extract all words from titles and subtitles and add it to existing keywords
  titlesArray.forEach((item) => {
    existingKeywords = existingKeywords.concat(
      ...item.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(" "),
      ...item.subtitle
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(" ")
    );
  });

  let keywords = shuffled(newKeywords);
  keywords = redundantPluralsRemoved(keywords);
  keywords = duplicatesRemoved(keywords);

  keywords.forEach((keyword) => {
    const currentKeywords = keyword
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .split(" ");

    let totalWordCount = currentKeywords.reduce(
      (acc, word) => acc + word.length,
      0
    );

    // Check if any word in currentKeywords is in extractedTitles or resultKeywords
    const anyWordExists = currentKeywords.some(
      (word) => existingKeywords.includes(word) || resultKeywords.includes(word)
    );

    if (anyWordExists) {
      return;
    }

    // If totalWordCount + charCount exceeds 100 or any word exists, skip the currentKeywords
    if (charCount + totalWordCount > 100) {
      return;
    }

    resultKeywords.push(...currentKeywords);
    charCount += totalWordCount;
  });

  return resultKeywords;
}
