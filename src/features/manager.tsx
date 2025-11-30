import Shape from './display/shape/Shape.tsx'
import Rectangle from './display/shape/Rectangle.tsx'
import Line from './display/shape/Line.tsx'
import Sketch from './display/shape/Sketch.tsx'
import { CanvasClass } from './display/canvas/canvas.tsx'

export default class Manager {
  private sk: Sketch = new Sketch(500, 500);
  private elements: Array<Shape> = [this.sk];
  private canvas!: CanvasClass;

  constructor() {
  }

  init() {
    console.log("INIT MANAGER");
    this.canvas = new CanvasClass();

    const width = window.innerWidth;
    const height = window.innerHeight;
    this.resize(width, height);
  }

  resize(width: number, height: number) {
    this.canvas.resize(width, height);
    this.canvas.draw(this.elements);
  }

  updateCanvas() {
    this.canvas.draw(this.elements);
  }

  addShape(w: number, h: number) {

    const newRect = new Rectangle(this.elements.length * 10, this.elements.length * 10, w, h);
    this.elements.push(newRect);

    const newLines = new Line(100 + this.elements.length, 500,
      [
        75 * this.elements.length, 300,
        175 * this.elements.length, 300,
        175 * this.elements.length, 800,
      ]);
    this.elements.push(newLines);

    this.sk.addPoint(280 * this.elements.length % 138, 250 * this.elements.length % 368)

    this.updateCanvas();
  }
}

