import { MinigameParkingjamConst } from "./minigame-parkingjam-const.model";

export class MinigameParkingjamWall {
  public ctx!: CanvasRenderingContext2D;
  private id: number;
  public vertical: boolean = true;
  public lineFrom: number = 0;
  public lineTo: number = 0;
  public columnFrom: number = 0;
  public columnTo: number = 0;

  constructor(id: number) {
    this.id = id;
  }

  draw() {
    this.ctx.save();
    this.ctx.strokeStyle = "#FF0000";
    this.ctx.beginPath();
    this.ctx.moveTo(MinigameParkingjamConst.cellToPixelWithPadding(this.columnFrom),
      MinigameParkingjamConst.cellToPixelWithPadding(this.lineFrom));
    this.ctx.lineTo(MinigameParkingjamConst.cellToPixelWithPadding(this.columnTo),
      MinigameParkingjamConst.cellToPixelWithPadding(this.lineTo));
    this.ctx.stroke();
    this.ctx.restore();
  }

  store(prefix: string) {
    let base = prefix + "_" + this.id;
    localStorage.setItem(base + "_wall_id", "" + this.id);
    localStorage.setItem(base + "_wall_vertical", "" + this.vertical);
    localStorage.setItem(base + "_wall_lineFrom", "" + this.lineFrom);
    localStorage.setItem(base + "_wall_lineTo", "" + this.lineTo);
    localStorage.setItem(base + "_wall_columnFrom", "" + this.columnFrom);
    localStorage.setItem(base + "_wall_columnTo", "" + this.columnTo);
  }

  load(prefix: string): MinigameParkingjamWall {
    let base = prefix + '_' + this.id;
    this.vertical = localStorage.getItem(base + "_wall_vertical") === "true";
    this.lineFrom = this.convertToNumberWithDefault(localStorage.getItem(base + "_wall_lineFrom"), 0);
    this.lineTo = this.convertToNumberWithDefault(localStorage.getItem(base + "_wall_lineTo",), 0);
    this.columnFrom = this.convertToNumberWithDefault(localStorage.getItem(base + "_wall_columnFrom"), 0);
    this.columnTo = this.convertToNumberWithDefault(localStorage.getItem(base + "_wall_columnTo"), 0);
    return this;
  }

  private convertToNumberWithDefault(text: string | null, defaultValue: number): number {
    return (text) ? +text : defaultValue;
  }
}