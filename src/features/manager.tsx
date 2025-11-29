import Shape from './display/shape/Shape.tsx'
import Rectangle from './display/shape/Rectangle.tsx'
import { CanvasClass } from './display/canvas/canvas.tsx'

export default class Manager {
  private elements: Array<Shape> = [];
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

  addShape(w: number, h: number) {
    const newRect = new Rectangle(this.elements.length * 10, this.elements.length * 10, w, h);
    if (this.elements.length >= 5) {
      const ele = this.elements
      ele.shift()
      this.elements = ([...ele, newRect]);
    }
    else {
      this.elements = ([...this.elements, newRect]);
    }
    this.canvas.draw(this.elements);
  }
}

