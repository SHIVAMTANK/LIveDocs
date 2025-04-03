import React from 'react';
import { Check, X, Plus } from 'lucide-react';
import { addWordToDictionary } from '@/services/spell-checker';

interface SpellCheckResultsProps {
  misspelledWords: Array<{
    word: string;
    index: number;
    suggestions: string[];
    isProperNoun: boolean;
  }>;
  onReplaceWord: (originalWord: string, newWord: string) => void;
  onIgnoreWord: (word: string) => void;
}

const SpellCheckResults: React.FC<SpellCheckResultsProps> = ({
  misspelledWords,
  onReplaceWord,
  onIgnoreWord,
}) => {
  const handleAddToDictionary = (word: string) => {
    addWordToDictionary(word);
    onIgnoreWord(word);
  };

  if (misspelledWords.length === 0) {
    return (
      <div className="p-4 text-center text-green-600">
        <Check className="mx-auto h-6 w-6 mb-2" />
        <p>No spelling errors found!</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-h-[300px] overflow-y-auto">
      <h3 className="text-lg font-medium mb-4">Spelling Errors</h3>
      <div className="space-y-4">
        {misspelledWords.map((item, index) => (
          <div key={`${item.word}-${index}`} className="border rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-medium text-red-600">{item.word}</span>
                {item.isProperNoun && (
                  <span className="ml-2 text-xs text-gray-500">(Proper Noun?)</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToDictionary(item.word)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Add to dictionary"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onIgnoreWord(item.word)}
                  className="text-gray-500 hover:text-gray-700"
                  title="Ignore word"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            {item.suggestions.length > 0 ? (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {item.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => onReplaceWord(item.word, suggestion)}
                      className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No suggestions available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpellCheckResults; 