export default class Shape {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  draw(ctx: CanvasRenderingContext2D,
    scale: number,
  ) {
    ctx.fillStyle = 'red';
    ctx.strokeRect(this.x, this.y, 500 * scale, 500 * scale);
  }
}

