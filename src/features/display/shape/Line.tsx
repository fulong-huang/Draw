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
  draw(ctx: CanvasRenderingContext2D, shiftedAmount: [number, number], scale: number) {
    const x1 = (this.x - shiftedAmount[0]) * scale
    const y1 = (this.y - shiftedAmount[1]) * scale
    const x2 = (this.x2 - shiftedAmount[0]) * scale
    const y2 = (this.y2 - shiftedAmount[1]) * scale
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth * scale;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
};

