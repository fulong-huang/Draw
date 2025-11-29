import Shape from './Shape.tsx'
export default class Rectangle extends Shape {
  w: number;
  h: number;
  color: string;
  stroke: boolean;
  constructor(x: number, y: number, w = 50, h = 20, color = 'grey', stroke = true) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.color = color;
    this.stroke = stroke;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    if (this.stroke) {
      ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
    else {
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
};

