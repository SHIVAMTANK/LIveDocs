declare module 'cspell' {
  export class CSpell {
    checkWord(word: string): Promise<boolean>;
    suggest(word: string): Promise<string[]>;
  }
} 