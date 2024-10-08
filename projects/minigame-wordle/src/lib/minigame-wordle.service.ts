import { Injectable } from '@angular/core';
import { MinigameWordleLetterModel } from './shared/minigame-wordle-letter.model';

@Injectable({
  providedIn: 'root'
})
export class MinigameWordleService {
  private static NB_COLUMNS: number = 5;
  private static NB_LINES: number = 6;

  private completed: boolean = false;
  private prefix: string = "";

  // Mock word: PLACE
  private mockWord: string[] = ["P", "L", "A", "C", "E"];

  // states: EMPTY, ENTERED, WRONG, BAD_PLACE, CORRECT
  private words: MinigameWordleLetterModel[][] = [];
  // states: OPEN, WRONG, BAD_PLACE, CORRECT
  private keyboardLetters = new Map<string, string>([
    ["A", "OPEN"],
    ["B", "OPEN"],
    ["C", "OPEN"],
    ["D", "OPEN"],
    ["E", "OPEN"],
    ["F", "OPEN"],
    ["G", "OPEN"],
    ["H", "OPEN"],
    ["I", "OPEN"],
    ["J", "OPEN"],
    ["K", "OPEN"],
    ["L", "OPEN"],
    ["M", "OPEN"],
    ["N", "OPEN"],
    ["O", "OPEN"],
    ["P", "OPEN"],
    ["Q", "OPEN"],
    ["R", "OPEN"],
    ["S", "OPEN"],
    ["T", "OPEN"],
    ["U", "OPEN"],
    ["V", "OPEN"],
    ["W", "OPEN"],
    ["X", "OPEN"],
    ["Y", "OPEN"],
    ["Z", "OPEN"],
  ]);

  private currentLine: number = 0;
  private currentIndex: number = 0;
  
  private _completionCallback!: () => void;

  constructor() {
    this.words = this.initEmpty();
  }

  public set completionCallback(callback: () => void) {
    this._completionCallback = callback;
  }

  public getKeyboardLetterState(): Map<string, string> {
    return this.keyboardLetters;
  }

  private initEmpty(): MinigameWordleLetterModel[][] {
    let loaded: MinigameWordleLetterModel[][] = [];
    for (let i = 0; i < MinigameWordleService.NB_LINES; i++) {
      let line: MinigameWordleLetterModel[] = [];
      for (let j = 0; j < MinigameWordleService.NB_COLUMNS; j++) {
        line.push(new MinigameWordleLetterModel("", "EMPTY"));
      }

      loaded.push(line);
    }

    return loaded;
  }

  setPrefix(prefix: string): void {
    this.prefix = prefix;
    this.words = this.loadFromStorage();
  }

  setWord(word: string[]): void {
    this.mockWord = word;
  }
  
  getLetter(line: number, index: number): MinigameWordleLetterModel {
    return this.words[line][index];
  }

  letterEntered(letter: string): void {
    if (this.currentLine > -1 && this.currentLine < 6 && this.currentIndex > -1 && this.currentIndex < 5) {
      let current = this.words[this.currentLine][this.currentIndex];
      current.letter = letter.toUpperCase();
      current.state = 'ENTERED';
      this.currentIndex++;
    } else {
      console.log('All letters entered, ignore this typing');
    }
  }

  removeLetter(): void {
    if (this.currentLine > -1 && this.currentLine < 6 && this.currentIndex > 0 && this.currentIndex < 6) {
      this.currentIndex--;
      let current = this.words[this.currentLine][this.currentIndex];
      current.letter = '';
      current.state = 'EMPTY';
    } else {
      console.log('Noting to remove');
    }
  }

  confirmWord(): void {
    console.log("confirm word, current index=" + this.currentIndex);
    // check all leters have been entered
    if (this.currentIndex < 5) {
      console.log('Word not complete, wait for the other inputs');
      return;
    }

    // check the word
    for (let i = 0; i < 5; i++) {
      let line: MinigameWordleLetterModel[] = this.words[this.currentLine];
      if (this.mockWord[i] === line[i].letter) {
        line[i].state = 'CORRECT';
        this.updateKeyboardLetterStatus(line[i].letter, line[i].state);
      } else if (this.isLetterAtWrongPlace(line[i].letter)) {
        line[i].state = 'BAD_PLACE';
        this.updateKeyboardLetterStatus(line[i].letter, line[i].state);
      } else {
        line[i].state = 'WRONG';
        this.updateKeyboardLetterStatus(line[i].letter, line[i].state);
      }
    }

    this.completed = this.words[this.currentLine].filter(e => e.state === 'CORRECT').length === 5;
    this.updateStorage();

    // move to the next line
    this.currentLine++;
    this.currentIndex = 0;

    if (!this.completed) {
      this.completed = this.currentLine === 6;
    }

    if (this.completed) {
      this._completionCallback();
    }
  }

  private updateKeyboardLetterStatus(letter: string, state: string) {
    let currentState = this.keyboardLetters.get(letter) ?? "OPEN";
    if (this.isStateHigher(state, currentState)) {
      this.keyboardLetters.set(letter, state);
    }
  }
  
  private isStateHigher(newState: string, oldState: string): boolean {
    return newState === 'CORRECT' || oldState === 'OPEN';
  }

  private isLetterAtWrongPlace(letter: string): boolean {
    for (let i = 0; i < 5; i++) {
      if (letter === this.mockWord[i]) {
        return true;
      }
    }
    return false;
  }

  isCompleted(): boolean {
    return this.completed;
  }

  private loadFromStorage(): MinigameWordleLetterModel[][] {
    let loaded: MinigameWordleLetterModel[][] = [];
    let lastLine = 0;
    let lastIndex = 0;
    for (let i = 0; i < MinigameWordleService.NB_LINES; i++) {
      let line: MinigameWordleLetterModel[] = [];
      for (let j = 0; j < MinigameWordleService.NB_COLUMNS; j++) {
        let key: string = this.prefix + "_" + i + "_" + j;
        let stored = localStorage.getItem(key);
        if (stored) {
          let state = stored?.split(":")[1];
          line.push(new MinigameWordleLetterModel(stored?.split(":")[0], state));
          if (state !== 'EMPTY') {
            lastLine = i;
            lastIndex = j;
          }
        } else {
          line.push(new MinigameWordleLetterModel("", "EMPTY"));
        }
      }

      if (lastIndex === MinigameWordleService.NB_COLUMNS - 1) {
        this.currentLine = lastLine + 1;
        this.currentIndex = 0;
      } else {
        this.currentLine = lastLine;
        this.currentIndex = lastIndex;
      }

      loaded.push(line);
    }

    return loaded;
  }

  private updateStorage(): void {
    for (let i = 0; i < MinigameWordleService.NB_LINES; i++) {
      for (let j = 0; j < MinigameWordleService.NB_COLUMNS; j++) {
        let elem = this.words[i][j];
        let key: string = this.prefix + "_" + i + "_" + j;
        localStorage.setItem(key, elem.letter + ":" + elem.state);
      }
    }
  }
}
