import { Injectable } from '@angular/core';
import { MinigameLiquidSortBottle } from './shared/minigame-liquidsort.model';
import { MinigameCommonStorageService } from 'projects/minigame-common/src/lib/minigame-common-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MinigameLiquidsortBottleService {
  bottles: MinigameLiquidSortBottle[] = [];
  
  prefix!: string;
  completionCallback!: () => void;

  constructor() {}

  setupComplete() {
    this.bottles = MinigameLiquidsortBottleService.loadBottlesFromStorage(this.prefix);
    console.log(`#bottles: ${this.bottles.length}`);
  }

  public replaceBottle(oldBottle: MinigameLiquidSortBottle, newBottle: MinigameLiquidSortBottle) {
    const idx = this.bottles.findIndex(b => b === oldBottle);
    if (idx > -1) {
      this.bottles[idx] = newBottle;
    }

    this.checkCompletion();
  }

  private checkCompletion() {
    if (this.bottles.every(bottle => bottle.isComplete() || bottle.isEmpty())) {
      if (this.completionCallback) {
        this.completionCallback();
      }
    }
  }
  
  public static loadBottlesFromStorage(prefix: string) {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(prefix))
      .filter(k => k.search('_bottle_idx') > -1)
      .map(k => {
        let idx = localStorage.getItem(k);
        return (idx) ? +idx : -1;
      })
      .filter(idx => idx > -1)
      .sort((a, b) => a - b)
      .map(idx => {
        let bottlePrefix = prefix + "_bottle_" + idx + "_";
        let size = MinigameCommonStorageService.loadNumberFromStorage(bottlePrefix + "_size", 1);
        let liquids = this.loadLiquidsFromStorage(bottlePrefix);
        return new MinigameLiquidSortBottle(idx, size, liquids);
      });
  }

  private static loadLiquidsFromStorage(prefix: string) {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(prefix))
      .filter(k => k.search('_liquid_idx') > -1)
      .map(k => {
        let idx = localStorage.getItem(k);
        return (idx) ? +idx : -1;
      })
      .filter(idx => idx > -1)
      .sort((a, b) => b - a) // Sort liquids in descending order so that the top liquid is always the first in the list
      .map(idx => {
        let color = localStorage.getItem(prefix + "liquid_" + idx + "_color");
        return { color: color || '' };
      });
  }

  public static storeBottlesToStorage(prefix: string, bottles: MinigameLiquidSortBottle[]) {
    bottles.forEach((bottle, idx) => {
      localStorage.setItem(`${prefix}_bottle_idx-${idx}`, idx.toString());
      let bottlePrefix = prefix + "_bottle_" + idx + "_";
      localStorage.setItem(`${bottlePrefix}_size`, bottle.size.toString());
      bottle.liquids.forEach((liquid, liquidIdx) => {
        localStorage.setItem(`${bottlePrefix}_liquid_idx-${liquidIdx}`, liquidIdx.toString());
        localStorage.setItem(bottlePrefix + "liquid_" + liquidIdx + "_color", liquid.color);
      });
    });
  }
}
