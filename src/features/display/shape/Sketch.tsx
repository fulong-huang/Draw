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

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    if (this.points.length == 0) {
      ctx.lineTo(this.x, this.y);

    }
    else {
      for (let i = 0; i < this.points.length; i += 2) {
        ctx.lineTo(this.points[i], this.points[i + 1]);
      }
    }
    ctx.stroke();
  }
}

