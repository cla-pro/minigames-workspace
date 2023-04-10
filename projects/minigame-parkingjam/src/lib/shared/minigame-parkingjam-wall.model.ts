import { MinigameParkingjamConst } from "./minigame-parkingjam-const.model";

export class MinigameParkingjamWall {
    constructor(
        private ctx: CanvasRenderingContext2D,
        public vertical: boolean,
        public lineFrom: number,
        public lineTo: number,
        public columnFrom: number,
        public columnTo: number) {}

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
}