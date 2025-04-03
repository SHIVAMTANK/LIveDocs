// Dictionary-based spell checking implementation
const dictionary = new Set([
  // Common animal-related words
  'lion', 'tiger', 'elephant', 'giraffe', 'zebra',
  'legs', 'paws', 'tail', 'mane', 'fur',
  // Numbers and basic words
  'one', 'two', 'three', 'four', 'five',
  'has', 'have', 'had', 'is', 'are', 'was', 'were',
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at',
  // Add more words as needed...
]);

// Store custom words added by the user
const customDictionary = new Set<string>();

// Function to add a word to the custom dictionary
export const addWordToDictionary = (word: string): void => {
  customDictionary.add(word.toLowerCase().trim());
};

// Function to check if a word is spelled correctly
export const isWordSpelledCorrectly = (word: string): boolean => {
  // Convert to lowercase for case-insensitive comparison
  const normalizedWord = word.toLowerCase().trim();
  
  // Skip checking these cases:
  if (
    /^\d+$/.test(normalizedWord) || // Numbers
    normalizedWord.length <= 1 ||    // Single letters
    /^[A-Z][a-z]*$/.test(word) ||   // Proper nouns (capitalized words)
    /^[A-Z]+$/.test(word) ||        // Acronyms
    customDictionary.has(normalizedWord) // Custom added words
  ) {
    return true;
  }
  
  return dictionary.has(normalizedWord);
};

// Function to get suggestions for a misspelled word
export const getSuggestions = (word: string): string[] => {
  const normalizedWord = word.toLowerCase();
  const suggestions: string[] = [];
  
  // Convert both dictionaries to arrays and combine them
  const allWords = [...Array.from(dictionary), ...Array.from(customDictionary)];
  
  // Find words with similar length (±1 character)
  const similarLengthWords = allWords.filter(dictWord => 
    Math.abs(dictWord.length - normalizedWord.length) <= 1
  );
  
  // Calculate Levenshtein distance for each potential match
  similarLengthWords.forEach(dictWord => {
    if (levenshteinDistance(normalizedWord, dictWord) <= 2) {
      suggestions.push(dictWord);
    }
  });
  
  return suggestions;
};

// Function to check a block of text and return misspelled words with their positions
export const checkText = (text: string): Array<{ 
  word: string; 
  index: number; 
  suggestions: string[];
  isProperNoun: boolean;
}> => {
  const words = text.split(/\s+/);
  const results = [];
  
  let currentIndex = 0;
  
  for (const word of words) {
    // Skip empty strings and words that are just punctuation
    if (!word || /^[^\w]+$/.test(word)) {
      currentIndex += word.length + 1; // +1 for the space
      continue;
    }
    
    const isCorrect = isWordSpelledCorrectly(word);
    
    if (!isCorrect) {
      const suggestions = getSuggestions(word);
      const isProperNoun = /^[A-Z][a-z]*$/.test(word);
      results.push({
        word,
        index: currentIndex,
        suggestions,
        isProperNoun
      });
    }
    
    currentIndex += word.length + 1; // +1 for the space
  }
  
  return results;
};

// Helper function to calculate Levenshtein distance between two strings
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // substitution
          dp[i - 1][j] + 1,     // deletion
          dp[i][j - 1] + 1      // insertion
        );
      }
    }
  }

  return dp[m][n];
} 