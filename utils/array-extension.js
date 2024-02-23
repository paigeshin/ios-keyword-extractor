function shuffled(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate random index
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at index i and j
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function duplicatesRemoved(arr) {
  return [...new Set(arr)];
}

function redundantPluralsRemoved(arr) {
  const result = [];
  const seenWords = new Set();

  // Sort so singular comes before plural
  arr.sort();

  for (const word of arr) {
    if (seenWords.has(word)) continue; // If this word was processed, skip

    if (arr.includes(word + "s")) {
      result.push(word);
      seenWords.add(word);
      seenWords.add(word + "s"); // Mark both singular and plural as seen
    } else {
      result.push(word);
      seenWords.add(word);
    }
  }

  return result;
}

module.exports = {
  shuffled,
  duplicatesRemoved,
  redundantPluralsRemoved,
};
