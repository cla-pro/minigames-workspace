import { Injectable } from '@angular/core';
import { MinigameMemoryCardDataModel } from './shared/minigame-memory-card-data.model';
import { MinigameMemoryImageService } from './minigame-memory-image.service';

@Injectable({
  providedIn: 'root'
})
export class MinigameMemoryService {
  public static BONUS_COUNT = 45;
  prefix: string = "";
  width: number = -1;
  height: number = -1;
  cardSetId: string = "";
  private _board: MinigameMemoryCardDataModel[][] = [];
  private fliped: MinigameMemoryCardDataModel[] = [];
  private loaded: boolean = false;
  private _count: number = 0;
  private _zoomUrl: string | undefined = undefined;

  private _completionCallback!: (bonus: boolean) => void;

  public get board(): MinigameMemoryCardDataModel[][] { return this._board; }
  public get count(): number { return this._count; }
  public get zoomUrl(): string | undefined { return this._zoomUrl; }

  public set completionCallback(callback: (bonus: boolean) => void) {
    this._completionCallback = callback;
  }

  constructor(private service: MinigameMemoryImageService) {}

  public setupComplete(): void {
    this.loadFromStorage();
    if (!this.loaded) {
      this.defineBoard();
    }
  }

  private defineBoard(): void {
    if (!this.loaded && this.width > -1 && this.height > -1 && this.cardSetId !== "") {
      let cardSet = this.service.cardSet(this.cardSetId);
      let nbCards = cardSet.length * 2;
      let ids: number[] = Array(nbCards).fill(-1).map((value, index) => Math.floor(index / 2));

      this._board = [];
      for (let i = 0; i < this.height; i++) {
        let line: MinigameMemoryCardDataModel[] = [];
        for (let j = 0; j < this.width; j++) {
          let index = Math.floor(Math.random() * ids.length);
          let value = cardSet[ids[index]];
          ids = ids.slice(0, index).concat(ids.slice(index + 1));
          line.push(new MinigameMemoryCardDataModel(`${value}`, false, false));
        }
        this._board.push(line);
      }
      this.loaded = true;
      this.updateStorage();
    }
  }

  cardFliped(cardData: MinigameMemoryCardDataModel): void {
    this._zoomUrl = this.service.url(cardData.id);
    this.fliped.push(cardData);

    let that = this;
    setTimeout(function callback() {
      that._zoomUrl = undefined;
      if (that.fliped.length == 2) {
        that._count++;
        let first = that.fliped[0];
        let second = that.fliped[1];
  
        if (first.id === second.id) {
          first.found = true;
          second.found = true;
          that.updateStorage();
  
          if (that.areAllPairsFound()) {
            that.setCompleted();
          }
        }
        
        that.fliped = [];
        setTimeout(function callback() { that.resetCards(first, second); }, 1000);
      }
    }, 1000);
  }

  private areAllPairsFound(): boolean {
    return this.board.flatMap(line => line).filter(c => !c.found).length === 0;
  }

  private setCompleted(): void {
    let bonus = this.count <= MinigameMemoryService.BONUS_COUNT;
    this._completionCallback(bonus);
    console.log(`memory completed with ${this.count} with bonus ${bonus}`);
  }

  private resetCards(first: MinigameMemoryCardDataModel, second: MinigameMemoryCardDataModel): void {
    first.displayed = first.found;
    second.displayed = second.found;
  }

  private loadFromStorage(): void {
    this.width = this.extractNumberFromStorage(this.prefix + "_width");
    this.height = this.extractNumberFromStorage(this.prefix + "_height");
    this._count = this.extractNumberFromStorage(this.prefix + "_count");
    if (this.width > 0 && this.height > 0) {
      let loaded: MinigameMemoryCardDataModel[][] = [];
      for (let i = 0; i < this.height; i++) {
        let line: MinigameMemoryCardDataModel[] = [];
        for (let j = 0; j < this.width; j++) {
          let key: string = this.prefix + "_" + i + "_" + j;
          let stored = localStorage.getItem(key);
          if (stored) {
            let found = stored?.split(":")[1] === "true";
            line.push(new MinigameMemoryCardDataModel(stored?.split(":")[0], found, found));
          } else {
            line.push(new MinigameMemoryCardDataModel('-1', false, false));
          }
        }

        loaded.push(line);
      }

      this._board = loaded;
      this.loaded = this._board.flatMap(line => line).filter(c => c.id === '-1').length === 0;
    }
  }

  private extractNumberFromStorage(key: string): number {
    let value = localStorage.getItem(key);
    return (value) ? +value : -1;
  }

  private updateStorage(): void {
    localStorage.setItem(this.prefix + "_width", "" + this.width);
    localStorage.setItem(this.prefix + "_height", "" + this.height);
    localStorage.setItem(this.prefix + "_count", "" + this.count);
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        let elem = this._board[i][j];
        let key: string = this.prefix + "_" + i + "_" + j;
        localStorage.setItem(key, elem.id + ":" + elem.found);
      }
    }
  }
}
