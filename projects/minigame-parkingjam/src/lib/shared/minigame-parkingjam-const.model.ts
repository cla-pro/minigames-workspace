export class MinigameParkingjamConst {
  public static BOARD_PADDING = 25;
  public static CELL_SIZE = 25;

  public static cellToPixelWithPadding(cell: number): number {
    return this.cellToPixel(cell) + this.BOARD_PADDING;
  }

  public static cellToPixel(cell: number): number {
    return this.CELL_SIZE * cell;
  }

  public static pixelToCell(pixel: number): number {
    return Math.round((pixel - this.BOARD_PADDING) / this.CELL_SIZE);
  }
}