import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MinigameCommonStorageService {
  constructor() { }

  static loadNumberFromStorage(key: string, defaultValue: number): number {
    let value = localStorage.getItem(key);
    return (value) ? +value : defaultValue;
  }
}
