import Shape from './Shape.tsx'
export default class Sketch extends Shape {
  lineWidth: number;
  color: string;
  points: number[];
  constructor(x: number, y: number, points: number[] = [], lineWidth: number = 20, color: string = 'red') {
    super(x, y);
    this.color = color;
    this.lineWidth = lineWidth;
    this.points = points;
  }
  addPoint(x: number, y: number) {
    this.points.push(x);
    this.points.push(y);
  }

  draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth * scale;
    ctx.beginPath();
    ctx.moveTo(this.x * scale, this.y * scale);
    if (this.points.length == 0) {
      ctx.lineTo(this.x * scale, this.y * scale);

    }
    else {
      for (let i = 0; i < this.points.length; i += 2) {
        ctx.lineTo(this.points[i] * scale, this.points[i + 1] * scale);
      }
    }
    ctx.stroke();
  }
}

