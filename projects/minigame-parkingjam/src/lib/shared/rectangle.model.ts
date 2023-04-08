export class Rectangle {
    constructor(public x: number, public y: number, public width: number, public height: number) {}

    isInside(x: number, y: number): boolean {
        return this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y;
    }

    intersect(other: Rectangle): boolean {
        let result = other.x <= this.x + this.width
            && other.x + other.width >= this.x
            && other.y <= this.y + this.height
            && other.y + other.height >= this.y;
        console.log(this.toString() + " - " + other.toString() + " = " + result);
        return result;
    }

    toString(): string {
        return "(" + this.x + ", " + this.y + ", " + this.width + ", " + this.height + ")";
    }
}