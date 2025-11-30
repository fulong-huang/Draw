import Shape from './Shape.tsx'
export default class Rectangle extends Shape {
  w: number;
  h: number;
  color: string;
  stroke: boolean;
  width: number;
  constructor(x: number, y: number, w = 50, h = 20, color = 'black', stroke = true, width = 1) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.color = color;
    this.stroke = stroke;
    this.width = width;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.stroke) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.width;
      ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
    else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
};

