import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MinigameMemoryImageService {
  private idUrl: Map<string, string> = new Map();

  constructor() {
    this.fillImageUrls();
  }

  public url(id: string): string | undefined {
    return this.idUrl.get(id);
  }

  private fillImageUrls(): void {
    this.idUrl.set('0', 'data:image/png;base64,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');
  }
}