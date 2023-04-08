import { MinigameParkingjamService } from "../minigame-parkingjam.service";
import { Rectangle } from "./rectangle.model";

export class MinigameParkingjamCar {
    public static CELL_SIZE = 25;

    // position of the head of the car
    line: number = 0;
    column: number = 0;
    size: number = 0;
    vertical: boolean = false;
    // distance in pixel to the position before the movement started
    private rectangle: Rectangle = new Rectangle(0, 0, 0, 0);

    private offset: number = 0;
    private initialPosition = 0;
    private minOffset: number = 0;
    private maxOffset: number = 0;
    
    constructor(public id: number, private ctx: CanvasRenderingContext2D, private service: MinigameParkingjamService) {}

    mapToGrid() {
        let width = (this.vertical) ? 1 : this.size;
        let height = (this.vertical) ? this.size : 1;
        this.rectangle.x = MinigameParkingjamCar.CELL_SIZE * this.column;
        this.rectangle.y = MinigameParkingjamCar.CELL_SIZE * this.line;
        this.rectangle.width = MinigameParkingjamCar.CELL_SIZE * width;
        this.rectangle.height = MinigameParkingjamCar.CELL_SIZE * height;
    }

    clear() {
        let rect = this.getDisplayRectangle(this.offset);
        this.ctx.clearRect(
            rect.x,
            rect.y,
            rect.width,
            rect.height);
    }

    draw() {
        let rect = this.getDisplayRectangle(this.offset);
        this.ctx.fillRect(
            rect.x,
            rect.y,
            rect.width,
            rect.height);
    }

    isPositionOnCar(x: number, y: number) {
        return this.rectangle.isInside(x, y);
    }

    onMouseClick(x: number, y: number) {
        this.service.startMoving(this);
        let bounds = this.service.rangeForMovement();
        let ref = this.vertical ? this.line : this.column;
        this.minOffset = (bounds[0] - ref) * MinigameParkingjamCar.CELL_SIZE;
        this.maxOffset = (bounds[1] - ref) * MinigameParkingjamCar.CELL_SIZE;
        this.initialPosition = (this.vertical) ? y : x;
    }

    onMouseMove(x: number, y: number) {
        this.clear();
        let newOffset = (this.vertical) ? y - this.initialPosition : x - this.initialPosition;
        if (this.isInBound(newOffset)) {
            this.offset = newOffset;
        }
        this.draw();
    }

    onMouseRelease() {
        this.service.movementComplete();
        this.clear();
        if (this.vertical) {
            let y = this.rectangle.y + this.offset;
            this.line = Math.round(y / MinigameParkingjamCar.CELL_SIZE);
        } else {
            let x = this.rectangle.x + this.offset;
            this.column = Math.round(x / MinigameParkingjamCar.CELL_SIZE);
        }
        this.offset = 0;
        this.initialPosition = 0;
        this.mapToGrid();
        this.draw();
    }

    lines(): number[] {
        let s = (this.vertical) ? this.size : 1;
        return Array.from(Array(s).keys()).map(x => x + this.line);
    }

    columns(): number[] {
        let s = (this.vertical) ? 1 : this.size;
        return Array.from(Array(s).keys()).map(x => x + this.column);
    }

    private isInBound(offset: number): boolean {
        return offset >= this.minOffset && offset <= this.maxOffset;
    }

    private getDisplayRectangle(offsetToAdd: number) {
        let offsetX = (this.vertical) ? 0 : offsetToAdd;
        let offsetY = (this.vertical) ? offsetToAdd : 0;
        return new Rectangle(
            this.rectangle.x + offsetX,
            this.rectangle.y + offsetY,
            this.rectangle.width,
            this.rectangle.height
        );
    }
}