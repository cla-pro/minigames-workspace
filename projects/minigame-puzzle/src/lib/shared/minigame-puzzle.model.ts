import { MinigameCommonStorageService } from "projects/minigame-common/src/lib/minigame-common-storage.service";

export class MinigamePuzzlePiece {
  public displayed: boolean = true;

  constructor(
    public id: number,
    public boardY: number,
    public boardX: number,
    public goalY: number,
    public goalX: number) {}
  
  public isOnBoard(): boolean { return this.boardX > -1; }

  public store(prefix: string): void {
    localStorage.setItem(`${prefix}-piece-id-${this.id}`, `${this.id}`);
    localStorage.setItem(`${prefix}-boardY-${this.id}`, `${this.boardY}`);
    localStorage.setItem(`${prefix}-boardX-${this.id}`, `${this.boardX}`);
    localStorage.setItem(`${prefix}-goalY-${this.id}`, `${this.goalY}`);
    localStorage.setItem(`${prefix}-goalX-${this.id}`, `${this.goalX}`);
  }

  public static load(prefix: string, id: number): MinigamePuzzlePiece {
    return new MinigamePuzzlePiece(
      id,
      MinigameCommonStorageService.loadNumberFromStorage(`${prefix}-boardY-${id}`, -1),
      MinigameCommonStorageService.loadNumberFromStorage(`${prefix}-boardX-${id}`, -1),
      MinigameCommonStorageService.loadNumberFromStorage(`${prefix}-goalY-${id}`, -1),
      MinigameCommonStorageService.loadNumberFromStorage(`${prefix}-goalX-${id}`, -1)
    );
  }
}