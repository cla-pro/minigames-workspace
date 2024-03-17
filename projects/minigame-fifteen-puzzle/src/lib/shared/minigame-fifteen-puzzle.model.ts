export class MinigameFifteenPuzzlePiece {
  constructor(
    public value: number,
    public boardY: number,
    public boardX: number,
    public goalY: number,
    public goalX: number
  ) {}

  public isMisplaced() {
    return this.boardX !== this.goalX || this.boardY !== this.goalY;
  }
}