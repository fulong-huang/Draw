import Shape from './Shape.tsx'
export default class Line extends Shape {
  points: number[] = []
  width: number;
  color: string;
  constructor(x: number, y: number, points: number[],
    width: number = 5, color = 'white') {
    super(x, y);
    this.points = points;
    this.width = width;
    this.color = color;
  }
  addPoint(x: number, y: number) {
    this.points.push(x);
    this.points.push(y);
  }
  setColor(color: string) {
    this.color = color;
  }
  setLineWidth(width: number) {
    this.width = width;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    for (let i = 0; i < this.points.length; i += 2) {
      ctx.lineTo(this.points[i], this.points[i + 1]);
    }
    ctx.lineWidth = this.width;
    ctx.stroke();
  }
};

