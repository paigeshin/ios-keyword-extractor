// Importing utility functions from an external module.
const {
  duplicatesRemoved,
  redundantPluralsRemoved,
  shuffled,
} = require("./utils/array-extension");

// Define a function to extract keywords from given titles and subtitles, and process them.
function extractKeywords(titlesArray, existingKeywords, newKeywords) {
  let trackingKeywords = [];
  // Initialize an array to hold the result keywords.
  let resultKeywords = [];
  // Initialize a counter for the number of characters in the result keywords.
  let charCount = 0;

  // Iterate over each title and subtitle in the given array.
  titlesArray.forEach((item) => {
    // Add words from title and subtitle to the existing keywords, after converting them to lowercase,
    // removing non-alphanumeric characters, and splitting them into individual words.
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

  // Shuffle the newKeywords array for randomness.
  let keywords = shuffled(newKeywords);
  // Remove redundant plurals from the keywords array.
  keywords = redundantPluralsRemoved(keywords);
  // Remove duplicate keywords.
  keywords = duplicatesRemoved(keywords);

  // Iterate over each keyword in the processed list.
  keywords.forEach((keyword) => {
    // Split the keyword into individual words after converting it to lowercase and removing non-alphanumeric characters.
    const currentKeywords = keyword
      .toLowerCase()
      .replace(
        /[^\w\s\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7A3]/g,
        ""
      )
      // .replace(/[^a-zA-Z0-9\s]/g, "")
      .split(" ");

    // Calculate the total character count of the current keyword.
    let totalWordCount = currentKeywords.reduce(
      (acc, word) => acc + word.length,
      0
    );

    // Check if any word in the current keywords exists either in the existing keywords or result keywords.
    const anyWordExists = currentKeywords.some(
      (word) => existingKeywords.includes(word) || resultKeywords.includes(word)
    );

    // If any word exists, skip to the next keyword.
    if (anyWordExists) {
      return;
    }

    // If adding the current keyword would exceed 100 characters in total, skip to the next keyword.
    if (charCount + totalWordCount > 100) {
      return;
    }

    // Add the current keywords to the result and update the character count.
    trackingKeywords.push(keyword);
    resultKeywords.push(...currentKeywords);
    charCount += totalWordCount;
  });

  // Return the processed list of keywords.
  return {
    tracking: trackingKeywords,
    appstore: resultKeywords,
  };
}

module.exports = {
  extractKeywords,
};
