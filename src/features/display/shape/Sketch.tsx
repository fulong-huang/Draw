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

  moveTo(x: number, y: number) {
    const diffX = x - this.x
    const diffY = y - this.y
    this.x = x
    this.y = y
    for (let i = 0; i < this.points.length; i += 2) {
      this.points[i] += diffX
      this.points[i + 1] += diffY
    }
  }

  draw(ctx: CanvasRenderingContext2D, shiftedAmount: [number, number], scale: number) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth * scale;
    ctx.beginPath();
    const x = (this.x - shiftedAmount[0]) * scale
    const y = (this.y - shiftedAmount[1]) * scale
    ctx.moveTo(x, y);
    if (this.points.length == 0) {
      ctx.lineTo(x, y);
    }
    else {
      for (let i = 0; i < this.points.length; i += 2) {
        const x2 = (this.points[i] - shiftedAmount[0]) * scale
        const y2 = (this.points[i + 1] - shiftedAmount[1]) * scale
        ctx.lineTo(x2, y2);
      }
    }
    ctx.stroke();
  }
}

