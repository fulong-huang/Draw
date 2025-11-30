import { useEffect, useState } from 'react'
import Shape from './display/shape/Shape.tsx'
import Rectangle from './display/shape/Rectangle.tsx'
import Line from './display/shape/Line.tsx'
import Sketch from './display/shape/Sketch.tsx'
import { CanvasClass } from './display/canvas/canvas.tsx'
import './manager.css'

class ManagerClass {
  scaleAmount: number = 1.1;
  currScale: number = 1;

  sk: Sketch = new Sketch(500, 500);
  elements: Array<Shape> = [this.sk];
  canvas!: CanvasClass;
  isMouseDown: boolean = false;
  backTrack = 0;
  currShape?: Sketch | Line | Rectangle;
  selectedShape: typeof Sketch | typeof Rectangle | typeof Line = Sketch;

  mouseDownHandler = (e: MouseEvent) => this.handleMouseDown(e);
  mouseUpHandler = () => this.handleMouseUp();
  mouseMoveHandler = (e: MouseEvent) => this.handleMouseMovement(e);

  wheelScrollHandler = (e: WheelEvent) => this.handleWheelScroll(e);

  constructor() {
  }

  handleWheelScroll(event: WheelEvent) {
    if (event.deltaY > 0)
      this.currScale *= this.scaleAmount;
    else if (event.deltaY < 0)
      this.currScale /= this.scaleAmount;
    this.canvas.zoom(event.offsetX, event.offsetY, this.currScale)

    this.updateCanvas();
  }
  setSelectedTool(toolSelected: number) {
    if (toolSelected == 0) {
      this.selectedShape = Sketch
    }
    else if (toolSelected == 1) {
      this.selectedShape = Line
    }
    else if (toolSelected == 2) {
      this.selectedShape = Rectangle
    }
    else {
      // TODO:
      // User not drawing
    }
  }
  getSelectedTool() {
    if (this.selectedShape instanceof Sketch) {
      return 0
    }
    else if (this.selectedShape instanceof Line) {
      return 1
    }
    else if (this.selectedShape instanceof Rectangle) {
      return 2
    }
    return -1
  }
  init() {
    const width = window.innerWidth;
    const height = window.innerHeight;

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

    drawingCanvas.addEventListener(
      'wheel', this.wheelScrollHandler
    )
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
  const [selectedTool, setSelectedTool] = useState(0);
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
    <div className='managerContainer'>

      <div
        className='test'
        onClick={() => {

        }}
      >
        test
      </div>

      <div className='toolList'>
        <div className={
          selectedTool == 0 ?
            'toolSelector selectedTool' :
            'toolSelector'
        }
          onClick={
            () => {
              MANAGER.setSelectedTool(0)
              setSelectedTool(0)
            }
          }
        >
          Sketch
        </div>
        <div className={
          selectedTool == 1 ?
            'toolSelector selectedTool' :
            'toolSelector'
        }
          onClick={
            () => {
              MANAGER.setSelectedTool(1)
              setSelectedTool(1)
            }
          }
        >
          Line
        </div>
        <div className={
          selectedTool == 2 ?
            'toolSelector selectedTool' :
            'toolSelector'
        }
          onClick={
            () => {
              MANAGER.setSelectedTool(2)
              setSelectedTool(2)
            }
          }
        >
          Rectangle

        </div>
      </div>
    </div>
  )
}

