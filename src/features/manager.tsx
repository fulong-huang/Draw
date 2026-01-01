import { CanvasClass } from './display/canvas/canvas.tsx'
import './manager.css'

export class ManagerClass {
  canvas!: CanvasClass;
  constructor() {
  }

  init() {
    // this.canvas = new CanvasClass();
  }

  setCanvas(canvas: CanvasClass) {
    this.canvas = canvas;
  }

  cleanUp() {
    this.canvas.cleanUp();
  }

}

export const MANAGER = new ManagerClass();

