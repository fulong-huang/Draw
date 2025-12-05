export default class Shape {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  draw(ctx: CanvasRenderingContext2D,
    shiftedAmount: [number, number],
    scale: number,
  ) {
    const x = (this.x - shiftedAmount[0]) * scale;
    const y = (this.y - shiftedAmount[1]) * scale;
    const width = 500 * scale;
    const height = 500 * scale;
    ctx.strokeStyle = 'red';
    ctx.strokeRect(x, y, width, height);
  }
  moveTo(x: number, y: number, offset: [number, number] = [0, 0]) {
    this.x = x + offset[0]
    this.y = y + offset[1]
  }

  getPosition(): [number, number] {
    return [this.x, this.y]
  }

  isClicked(x: number, y: number) {
    return Math.abs(this.x + this.y - x - y) < 100
  }
}

