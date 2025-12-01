import Shape from './Shape.tsx'
export default class Rectangle extends Shape {
  width: number;
  height: number;
  color: string;
  stroke: boolean;
  lineWidth: number;
  constructor(x: number, y: number, width = 50, height = 20, color = 'black', stroke = true, lineWidth = 1) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.color = color;
    this.stroke = stroke;
    this.lineWidth = lineWidth;
  }
  rectExist() {
    return this.width != 0 && this.height != 0;
  }
  setDiagonal(x2: number, y2: number) {
    this.width = x2 - this.x;
    this.height = y2 - this.y;
  }
  changeDimension(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  draw(ctx: CanvasRenderingContext2D, shifted: [number, number], scale: number) {
    const x = (this.x + shifted[0]) * scale;
    const y = (this.y + shifted[1]) * scale;
    const width = this.width * scale;
    const height = this.height * scale;
    if (this.stroke) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.lineWidth * scale;
      ctx.strokeRect(x, y, width, height);
    }
    else {
      ctx.fillStyle = this.color;
      ctx.fillRect(x, y, width, height);
    }
  }
};

