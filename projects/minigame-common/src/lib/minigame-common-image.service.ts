import { Injectable } from '@angular/core';
import { Observable, fromEvent, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinigameCommonImageService {
  private images: Map<string, any> = new Map();
  private imageContent: Map<string, string> = new Map();

  constructor() {
    this.fillImages();
  }

  getImageForKey(key: string): Observable<any> {
    if (this.images.get(key) !== undefined) {
      return this.images.get(key);
    } else {
      let obs = this.loadSingleImage(this.imageContent.get(key)!!, key);
      this.images.set(key, obs);
      return obs;
    }
  }

  getUrlForKey(key: string): string | undefined {
    return this.imageContent.get(key);
  }

  private loadSingleImage(url: string, key: string): Observable<HTMLImageElement> {
    let image = new Image();
    let observable = fromEvent(image, 'load').pipe(map(() => image));
    image.src = url;
    return observable;
  }

  private fillImages() {
    this.imageContent.set("15-puzzle_1", "assets/15-puzzle/tile-1.png");
    this.imageContent.set("15-puzzle_2", "assets/15-puzzle/tile-2.png");
    this.imageContent.set("15-puzzle_3", "assets/15-puzzle/tile-3.png");
    this.imageContent.set("15-puzzle_4", "assets/15-puzzle/tile-4.png");
    this.imageContent.set("15-puzzle_5", "assets/15-puzzle/tile-5.png");
    this.imageContent.set("15-puzzle_6", "assets/15-puzzle/tile-6.png");
    this.imageContent.set("15-puzzle_7", "assets/15-puzzle/tile-7.png");
    this.imageContent.set("15-puzzle_8", "assets/15-puzzle/tile-8.png");
    this.imageContent.set("15-puzzle_9", "assets/15-puzzle/tile-9.png");
    this.imageContent.set("15-puzzle_10", "assets/15-puzzle/tile-10.png");
    this.imageContent.set("15-puzzle_11", "assets/15-puzzle/tile-11.png");
    this.imageContent.set("15-puzzle_12", "assets/15-puzzle/tile-12.png");
    this.imageContent.set("15-puzzle_13", "assets/15-puzzle/tile-13.png");
    this.imageContent.set("15-puzzle_14", "assets/15-puzzle/tile-14.png");
    this.imageContent.set("15-puzzle_15", "assets/15-puzzle/tile-15.png");

    this.imageContent.set('2x1-red-car-bottom-up.png', 'assets/parkingjam/2x1-red-car-bottom-up.png');
    this.imageContent.set('2x1-red-car-top-down.png', 'assets/parkingjam/2x1-red-car-top-down.png');
    this.imageContent.set('1x2-red-car-left-right.png', 'assets/parkingjam/1x2-red-car-left-right.png');
    this.imageContent.set('1x2-red-car-right-left.png', 'assets/parkingjam/1x2-red-car-right-left.png');

    this.imageContent.set('3x1-blue-truck-bottom-up.png', 'assets/parkingjam/3x1-blue-truck-bottom-up.png');
    this.imageContent.set('3x1-blue-truck-top-down.png', 'assets/parkingjam/3x1-blue-truck-top-down.png');
    this.imageContent.set('1x3-blue-truck-left-right.png', 'assets/parkingjam/1x3-blue-truck-left-right.png');
    this.imageContent.set('1x3-blue-truck-right-left.png', 'assets/parkingjam/1x3-blue-truck-right-left.png');

    this.imageContent.set('1x2-green-truck-left-right.png', 'assets/parkingjam/1x2-green-truck-left-right.png');
    this.imageContent.set('1x2-green-truck-right-left.png', 'assets/parkingjam/1x2-green-truck-right-left.png');
    this.imageContent.set('2x1-green-truck-bottom-up.png', 'assets/parkingjam/2x1-green-truck-bottom-up.png');
    this.imageContent.set('2x1-green-truck-top-down.png', 'assets/parkingjam/2x1-green-truck-top-down.png');

    this.imageContent.set('3x1-red-car-bottom-up.png', 'assets/parkingjam/3x1-red-car-bottom-up.png');
    this.imageContent.set('3x1-red-car-top-down.png', 'assets/parkingjam/3x1-red-car-top-down.png');
    this.imageContent.set('1x3-red-car-left-right.png', 'assets/parkingjam/1x3-red-car-left-right.png');
    this.imageContent.set('1x3-red-car-right-left.png', 'assets/parkingjam/1x3-red-car-right-left.png');

    let groups = ['catry', 'lavanchy', 'benoist', 'doudette'];
    for (var groupId = 0; groupId < groups.length; groupId++) {
      let group = groups[groupId];

      // Memory
      for (var day = 1; day < 5; day++) {
        for (var tile = 0; tile < 12; tile++) {
          this.imageContent.set(`memory-${group}-${day}-${tile}`, `assets/memory/${group}-${day}/${group}-${day}-${tile}.jpg`);
        }
      }

      // Puzzle
      for (var day = 1; day < 5; day++) {
        for (var line = 1; line <= 6; line++) {
          for (var col = 1; col <= 4; col++) {
            this.imageContent.set(`puzzle-${group}-${day}-${line}${col}`, `assets/puzzle/${group}-${day}/${line}-${col}.png`);
          }
        }
      }
    }
  }
}
