import { useEffect } from 'react'
import Shape from './display/shape/Shape.tsx'
import Rectangle from './display/shape/Rectangle.tsx'
import Line from './display/shape/Line.tsx'
import Sketch from './display/shape/Sketch.tsx'
import { CanvasClass } from './display/canvas/canvas.tsx'

class ManagerClass {
  sk: Sketch = new Sketch(500, 500);
  elements: Array<Shape> = [this.sk];
  canvas!: CanvasClass;
  isMouseDown: boolean = false;
  backTrack = 0;
  currShape?: Sketch | Line | Rectangle;
  selectedShape: typeof Sketch | typeof Rectangle | typeof Line = Line;

  mouseDownHandler = (e: MouseEvent) => this.handleMouseDown(e);
  mouseUpHandler = () => this.handleMouseUp();
  mouseMoveHandler = (e: MouseEvent) => this.handleMouseMovement(e);

  constructor() {
  }

  init() {
    this.canvas = new CanvasClass();
    const drawingCanvas = this.canvas.getCanvas();
    drawingCanvas.addEventListener(
      'mousedown', this.mouseDownHandler
    )
    drawingCanvas.addEventListener(
      'mouseup', this.mouseUpHandler
    )
    drawingCanvas.addEventListener(
      'mousemove', this.mouseMoveHandler
    )
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.resize(width, height);
  }

  cleanUp() {
    const drawingCanvas = this.canvas.getCanvas();
    drawingCanvas.removeEventListener(
      'mousedown', this.mouseDownHandler
    )
    drawingCanvas.removeEventListener(
      'mouseup', this.mouseUpHandler
    )
    drawingCanvas.removeEventListener(
      'mousemove', this.mouseMoveHandler
    )
  }

  updateCanvas() {
    this.canvas.clear()
    this.canvas.drawElements(this.elements.slice(0, this.elements.length - this.backTrack));
    if (this.currShape) this.canvas.draw(this.currShape);
  }

  handleMouseMovement(event: MouseEvent) {
    if (!this.isMouseDown) return
    if (this.currShape instanceof Sketch) {
      this.currShape.addPoint(event.offsetX, event.offsetY)
    }
    else if (this.currShape instanceof Rectangle) {
      this.currShape.setDiagonal(event.offsetX, event.offsetY)
    }
    else if (this.currShape instanceof Line) {
      this.currShape.movePoint2(event.offsetX, event.offsetY)
    }
    else {
      console.log("else")
    }
    this.updateCanvas();

  }
  handleMouseDown(event: MouseEvent) {
    if (this.isMouseDown) return
    this.isMouseDown = true;
    if (this.selectedShape == Sketch) {
      this.currShape = new Sketch(event.offsetX, event.offsetY);
    }
    else if (this.selectedShape == Rectangle) {
      this.currShape = new Rectangle(
        event.offsetX, event.offsetY, 0, 0
      );
    }
    else if (this.selectedShape == Line) {
      this.currShape = new Line(event.offsetX, event.offsetY, event.offsetX, event.offsetY);
    }
    else {
      // TODO: 
      // displace image
    }
  }
  handleMouseUp() {
    this.isMouseDown = false;
    if (this.currShape instanceof Sketch) {
      this.elements.push(this.currShape)
    }
    else if (this.currShape instanceof Rectangle) {
      if (this.currShape.rectExist()) {
        this.elements.push(this.currShape)
      }
    }
    else if (this.currShape instanceof Line) {
      if (this.currShape.lineExist()) {
        this.elements.push(this.currShape)
      }
    }
    else {
      // TODO: 
      // displace image
    }
    this.updateCanvas();
  }

  resize(width: number, height: number) {
    this.canvas.resize(width, height);
    this.updateCanvas();
  }

}

const MANAGER = new ManagerClass();
export default function Manager() {

  useEffect(() => {
    MANAGER.init();
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      MANAGER.resize(width, height);
    }
    window.addEventListener('resize', handleResize);
    handleResize()
    return () => {
      MANAGER.cleanUp();
      window.removeEventListener('resize', handleResize);
    }
  }, [])
  return (
    <>
    </>
  )
}

