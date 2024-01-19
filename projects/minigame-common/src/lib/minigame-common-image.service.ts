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
    this.loadImages();
  }

  getImageForKey(key: string): Observable<any> {
    return this.images.get(key);
  }

  private loadImages(): void {
    this.imageContent.forEach((value, key) => {
      console.log(`load image for name: ${key}`);
      let image = new Image();
      let observable = fromEvent(image, 'load')
        .pipe(map(() => image));
      this.images.set(key, observable);
      image.src = value;
    });
  }

  private fillImages() {
    this.imageContent.set("puzzle-test_set-123_11", "assets/20240117/20240117_puzzle-thermo-11.png");
    this.imageContent.set("puzzle-test_set-123_12", "assets/20240117/20240117_puzzle-thermo-12.png");
    this.imageContent.set("puzzle-test_set-123_13", "assets/20240117/20240117_puzzle-thermo-13.png");
    this.imageContent.set("puzzle-test_set-123_14", "assets/20240117/20240117_puzzle-thermo-14.png");
    this.imageContent.set("puzzle-test_set-123_21", "assets/20240117/20240117_puzzle-thermo-21.png");
    this.imageContent.set("puzzle-test_set-123_22", "assets/20240117/20240117_puzzle-thermo-22.png");
    this.imageContent.set("puzzle-test_set-123_23", "assets/20240117/20240117_puzzle-thermo-23.png");
    this.imageContent.set("puzzle-test_set-123_24", "assets/20240117/20240117_puzzle-thermo-24.png");
    this.imageContent.set("puzzle-test_set-123_31", "assets/20240117/20240117_puzzle-thermo-31.png");
    this.imageContent.set("puzzle-test_set-123_32", "assets/20240117/20240117_puzzle-thermo-32.png");
    this.imageContent.set("puzzle-test_set-123_33", "assets/20240117/20240117_puzzle-thermo-33.png");
    this.imageContent.set("puzzle-test_set-123_34", "assets/20240117/20240117_puzzle-thermo-34.png");
    this.imageContent.set("puzzle-test_set-123_41", "assets/20240117/20240117_puzzle-thermo-41.png");
    this.imageContent.set("puzzle-test_set-123_42", "assets/20240117/20240117_puzzle-thermo-42.png");
    this.imageContent.set("puzzle-test_set-123_43", "assets/20240117/20240117_puzzle-thermo-43.png");
    this.imageContent.set("puzzle-test_set-123_44", "assets/20240117/20240117_puzzle-thermo-44.png");
    this.imageContent.set("puzzle-test_set-123_51", "assets/20240117/20240117_puzzle-thermo-51.png");
    this.imageContent.set("puzzle-test_set-123_52", "assets/20240117/20240117_puzzle-thermo-52.png");
    this.imageContent.set("puzzle-test_set-123_53", "assets/20240117/20240117_puzzle-thermo-53.png");
    this.imageContent.set("puzzle-test_set-123_54", "assets/20240117/20240117_puzzle-thermo-54.png");
    this.imageContent.set("puzzle-test_set-123_61", "assets/20240117/20240117_puzzle-thermo-61.png");
    this.imageContent.set("puzzle-test_set-123_62", "assets/20240117/20240117_puzzle-thermo-62.png");
    this.imageContent.set("puzzle-test_set-123_63", "assets/20240117/20240117_puzzle-thermo-63.png");
    this.imageContent.set("puzzle-test_set-123_64", "assets/20240117/20240117_puzzle-thermo-64.png");
  }
}
