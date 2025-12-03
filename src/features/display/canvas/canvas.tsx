import Shape from '../shape/Shape.tsx'
import Rectangle from '../shape/Rectangle.tsx'
import Line from '../shape/Line.tsx'
import Sketch from '../shape/Sketch.tsx'
import { useState } from 'react'
import './canvas.css'

export class CanvasClass {
  scaleAmount: number = 1.1;
  currScale: number = 1;
  shiftedAmount: [number, number] = [0, 0];

  canvas!: HTMLCanvasElement;
  // = document.getElementById("canvas")! as HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  // = this.canvas.getContext('2d')!;
  width: number = 0;
  height: number = 0;

  elements: Array<Shape> = [];
  isMouseDown: boolean = false;
  backTrack = 0;
  currShape?: Sketch | Line | Rectangle;
  selectedShape: typeof Sketch | typeof Rectangle | typeof Line = Sketch;

  mode: 'pointer' | 'draw' = 'draw'

  mouseDownHandler = (e: MouseEvent) => this.handleMouseDown(e);
  mouseUpHandler = () => this.handleMouseUp();
  mouseMoveHandler = (e: MouseEvent) => this.handleMouseMovement(e);

  wheelScrollHandler = (e: WheelEvent) => this.handleWheelScroll(e);

  constructor() {
  }

  cleanUp() {
    this.canvas.removeEventListener(
      'mousedown', this.mouseDownHandler
    )
    this.canvas.removeEventListener(
      'mouseup', this.mouseUpHandler
    )
    this.canvas.removeEventListener(
      'mousemove', this.mouseMoveHandler
    )

    this.canvas.removeEventListener(
      'wheel', this.wheelScrollHandler
    )
  }

  init() {
    this.canvas = document.getElementById("canvas")! as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.addEventListener(
      'mousedown', this.mouseDownHandler
    )
    this.canvas.addEventListener(
      'mouseup', this.mouseUpHandler
    )
    this.canvas.addEventListener(
      'mousemove', this.mouseMoveHandler
    )

    this.canvas.addEventListener(
      'wheel', this.wheelScrollHandler
    )
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.resize(width, height);
  }

  resize(width: number, height: number) {
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;

    this.updateCanvas();
  }

  updateCanvas() {
    this.clear()
    this.drawElements(
      this.elements.slice(0, this.elements.length - this.backTrack)
    );
    if (this.currShape) this.draw(this.currShape);
  }

  getActualCoordinate(x: number, y: number): [number, number] {
    x = x / this.currScale + this.shiftedAmount[0];
    y = y / this.currScale + this.shiftedAmount[1];
    return [x, y]
  }

  handleMouseMovement(event: MouseEvent) {
    if (!this.isMouseDown) return
    const [mousePosX, mousePosY] = this.getActualCoordinate(event.offsetX, event.offsetY)
    if (this.mode == 'pointer') {
      this.elements[0].moveTo(mousePosX, mousePosY)
    }
    else if (this.mode == 'draw') {
      if (this.currShape instanceof Sketch) {
        this.currShape.addPoint(mousePosX, mousePosY)
      }
      else if (this.currShape instanceof Rectangle) {
        this.currShape.setDiagonal(mousePosX, mousePosY)
      }
      else if (this.currShape instanceof Line) {
        this.currShape.movePoint2(mousePosX, mousePosY)
      }
      else {
        console.log("else")
      }
    }
    this.updateCanvas();

  }
  handleMouseDown(event: MouseEvent) {
    if (this.isMouseDown) return

    this.isMouseDown = true;
    const [mousePosX, mousePosY] = this.getActualCoordinate(event.offsetX, event.offsetY)

    if (this.mode == 'pointer') {
      console.log("POINTER")
      console.log("------")
      for (let i = 0; i < this.elements.length; i++) {
        if (this.elements[i].isClicked(mousePosX, mousePosY)) {
          console.log(this.elements[i])
        }
      }
      // this.elements[0].moveTo(mousePosX, mousePosY)
    }
    else if (this.mode == 'draw') {
      if (this.selectedShape == Sketch) {
        this.currShape = new Sketch(mousePosX, mousePosY);
      }
      else if (this.selectedShape == Rectangle) {
        this.currShape = new Rectangle(
          mousePosX, mousePosY, 0, 0
        );
      }
      else if (this.selectedShape == Line) {
        this.currShape = new Line(mousePosX, mousePosY, mousePosX, mousePosY);
      }
    }

  }
  handleMouseUp() {
    this.isMouseDown = false;

    if (this.mode == 'draw') {
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
    }
    this.updateCanvas();
  }

  handleWheelScroll(event: WheelEvent) {
    let scale: number;
    if (event.deltaY < 0)
      scale = this.currScale * this.scaleAmount;
    else
      scale = this.currScale / this.scaleAmount;
    this.zoom(event.offsetX, event.offsetY, scale)
  }
  setSelectedTool(toolSelected: number) {
    this.mode = 'draw'
    if (toolSelected == 0) {
      this.selectedShape = Sketch
    }
    else if (toolSelected == 1) {
      this.selectedShape = Line
    }
    else if (toolSelected == 2) {
      this.selectedShape = Rectangle
    }
    else if (toolSelected == 3) {
      this.mode = 'pointer'
      this.selectedShape = Rectangle
    }
    else {
      // TODO:
      // User not drawing
    }
  }

  getCurrSclae() {
    return this.currScale;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  getContext() {
    return this.ctx;
  }
  getCanvas() {
    return this.canvas;
  }

  resetZoom() {
    // TODO:
    // Elements should still be shifted, 
    // reset scale to 1 and change to appropriate values
    this.shiftedAmount = [0, 0];

    this.currScale = 1;
    this.updateCanvas();
  }
  zoom(x: number, y: number, newScale: number) {
    // Customize zooming and shifting 
    //  to change each element's position
    // this.ctx.setTransform(scaleBy, 0, 0, scaleBy, x, y);
    const actualX = x / this.currScale + this.shiftedAmount[0];
    const actualY = y / this.currScale + this.shiftedAmount[1];

    this.shiftedAmount = [
      actualX - actualX / newScale,
      actualY - actualY / newScale
    ]
    this.currScale = newScale;
    this.updateCanvas();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  draw(elements: Shape) {
    elements.draw(this.ctx, this.shiftedAmount, this.currScale);
  }
  drawElements(elements: Shape[]) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].draw(this.ctx, this.shiftedAmount, this.currScale);
    }
  }
}


export const CANVAS = new CanvasClass();
export default function Canvas() {
  const [selectedTool, setSelectedTool] = useState(0);

  return (
    <>
      <div className='managerContainer'>

        <div
          className='test'
          onClick={() => {
            CANVAS.resetZoom()
            CANVAS.setSelectedTool(3);
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
                CANVAS.setSelectedTool(0)
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
                CANVAS.setSelectedTool(1)
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
                CANVAS.setSelectedTool(2)
                setSelectedTool(2)
              }
            }
          >
            Rectangle

          </div>
        </div>
      </div>
      <canvas id='canvas' className='canvas'>
      </canvas>
    </>
  )
}

