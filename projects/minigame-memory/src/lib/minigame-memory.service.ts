import { Injectable } from '@angular/core';
import { MinigameMemoryCardDataModel } from './shared/minigame-memory-card-data.model';

@Injectable({
  providedIn: 'root'
})
export class MinigameMemoryService {
  private _prefix: string = "";
  private _width: number = -1;
  private _height: number = -1;
  private _board: MinigameMemoryCardDataModel[][] = [];
  private fliped: MinigameMemoryCardDataModel[] = [];
  private loaded: boolean = false;

  private _completionCallback!: (bonus: boolean) => void;

  public get width(): number { return this._width; }
  public get height(): number { return this._height; }
  public get board(): MinigameMemoryCardDataModel[][] { return this._board; }

  public set prefix(prefix: string) {
    this._prefix = prefix;
    this.loadFromStorage();
  }

  public set width(w: number) {
    this._width = w;
    this.defineBoard();
  }

  public set height(h: number) {
    this._height = h;
    this.defineBoard();
  }

  public set completionCallback(callback: (bonus: boolean) => void) {
    this._completionCallback = callback;
  }

  constructor() {}

  private defineBoard(): void {
    if (!this.loaded && this._width > -1 && this._height > -1) {
      let nbCards = this._width * this._height;
      let ids: number[] = Array(nbCards).fill(-1).map((value, index) => Math.floor(index / 2));

      this._board = [];
      for (let i = 0; i < this._height; i++) {
        let line: MinigameMemoryCardDataModel[] = [];
        for (let j = 0; j < this._width; j++) {
          let index = Math.floor(Math.random() * ids.length);
          let value = ids[index];
          ids = ids.slice(0, index).concat(ids.slice(index + 1));
          line.push(new MinigameMemoryCardDataModel(value, false, false));
        }
        this._board.push(line);
      }
      this.loaded = true;
      this.updateStorage();
    }
  }

  cardFliped(cardData: MinigameMemoryCardDataModel): void {
    this.fliped.push(cardData);
    if (this.fliped.length == 2) {
      let first = this.fliped[0];
      let second = this.fliped[1];

      if (first.id === second.id) {
        first.found = true;
        second.found = true;
        this.updateStorage();

        if (this.areAllPairsFound()) {
          this.setCompleted();
        }
      }
      
      this.fliped = [];
      let that = this;
      setTimeout(function callback() { that.resetCards(first, second); }, 1000);
    }
  }

  private areAllPairsFound(): boolean {
    return this.board.flatMap(line => line).filter(c => !c.found).length == 0;
  }

  private setCompleted(): void {
    this._completionCallback(false);
    console.log("memory completed");
  }

  private resetCards(first: MinigameMemoryCardDataModel, second: MinigameMemoryCardDataModel): void {
    first.displayed = false;
    second.displayed = false;
  }

  private loadFromStorage(): void {
    this._width = this.extractNumberFromStorage(this._prefix + "_width");
    this._height = this.extractNumberFromStorage(this._prefix + "_height");
    if (this._width > 0 && this._height > 0) {
      let loaded: MinigameMemoryCardDataModel[][] = [];
      for (let i = 0; i < this._height; i++) {
        let line: MinigameMemoryCardDataModel[] = [];
        for (let j = 0; j < this._width; j++) {
          let key: string = this._prefix + "_" + i + "_" + j;
          let stored = localStorage.getItem(key);
          if (stored) {
            line.push(new MinigameMemoryCardDataModel(+stored?.split(":")[0], false, stored?.split(":")[1] === "true"));
          } else {
            line.push(new MinigameMemoryCardDataModel(1, false, false));
          }
        }

        loaded.push(line);
      }

      this._board = loaded;
      this.loaded = true;
    }
  }

  private extractNumberFromStorage(key: string): number {
    let value = localStorage.getItem(key);
    return (value) ? +value : -1;
  }

  private updateStorage(): void {
    localStorage.setItem(this._prefix + "_width", "" + this._width);
    localStorage.setItem(this._prefix + "_height", "" + this._height);
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        let elem = this._board[i][j];
        let key: string = this._prefix + "_" + i + "_" + j;
        localStorage.setItem(key, elem.id + ":" + elem.found);
      }
    }
  }
}
