import Shape from './Shape.tsx'
import Line from './Line.tsx'
export default class Sketch extends Shape {
  line: Line;
  constructor(x: number, y: number, width: number = 3, color: string = 'red') {
    super(x, y);
    this.line = new Line(x, y, [], width, color);
  }
  addPoint(x: number, y: number) {
    this.line.addPoint(x, y);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.line.draw(ctx);
  }
}

