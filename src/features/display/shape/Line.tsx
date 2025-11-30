import Shape from './Shape.tsx'
export default class Line extends Shape {
  x2: number;
  y2: number
  lineWidth: number;
  color: string;
  constructor(x: number, y: number, x2: number, y2: number,
    lineWidth: number = 5, color = 'white') {
    super(x, y);
    this.x2 = x2;
    this.y2 = y2;
    this.lineWidth = lineWidth;
    this.color = color;
  }
  lineExist() {
    return this.x != this.x2, this.y != this.y2
  }
  movePoint2(x2: number, y2: number) {
    this.x2 = x2
    this.y2 = y2
  }
  setColor(color: string) {
    this.color = color;
  }
  setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  }
};

