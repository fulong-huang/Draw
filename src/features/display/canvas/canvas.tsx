import Shape from '../shape/Shape.tsx'
import Rectangle from '../shape/Rectangle.tsx'
import Circle from '../shape/Circle.tsx'
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
  mouseMoved: boolean = false;
  currShape?: Sketch | Line | Rectangle | Circle;
  selectedShapeIdx: number = -1;
  isMovingShape: boolean = false;
  movementOffset: [number, number] = [0, 0];
  selectedShape: typeof Sketch | typeof Rectangle | typeof Line | typeof Circle = Sketch;

  mode: 'pointer' | 'draw' = 'draw'

  mouseDownHandler = (e: MouseEvent) => this.handleMouseDown(e);
  mouseUpHandler = (e: MouseEvent) => this.handleMouseUp(e);
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
    if (this.selectedShapeIdx >= 0) {
      this.elements[this.selectedShapeIdx].drawBoundingBox(this.ctx, this.shiftedAmount, this.currScale)
    }
  }

  calculateMovementOffset(mouseX: number, mouseY: number) {
    const [objX, objY] = this.elements[this.selectedShapeIdx].getPosition();
    this.movementOffset = [mouseX - objX, mouseY - objY]
  }
  getActualCoordinate(x: number, y: number): [number, number] {
    x = x / this.currScale + this.shiftedAmount[0];
    y = y / this.currScale + this.shiftedAmount[1];
    return [x, y]
  }

  handleMouseMovement(event: MouseEvent) {
    if (!this.isMouseDown) return
    this.mouseMoved = true;
    const [mousePosX, mousePosY] = this.getActualCoordinate(event.offsetX, event.offsetY)
    if (this.mode == 'pointer') {
      if (this.isMovingShape) {
        this.elements[this.selectedShapeIdx].moveTo(mousePosX, mousePosY, this.movementOffset)
      }
      else {
        // Use mouse event to calculate shifted amount instead
        this.shiftedAmount[0] -= event.movementX * (1 / this.currScale)
        this.shiftedAmount[1] -= event.movementY * (1 / this.currScale)
      }
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
      else if (this.currShape instanceof Circle) {
        this.currShape.setEndPoint(mousePosX, mousePosY)
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
    this.mouseMoved = false;

    if (this.mode == 'pointer') {
      if (this.selectedShapeIdx >= 0 &&
        this.elements[this.selectedShapeIdx].isClicked(mousePosX, mousePosY)
      ) {
        this.isMovingShape = true
        this.calculateMovementOffset(mousePosX, mousePosY);
      }
      else {
        this.isMovingShape = false
        // 
      }
    }
    else if (this.mode == 'draw') {
      this.selectedShapeIdx = -1
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
      else if (this.selectedShape == Circle) {
        this.currShape = new Circle(mousePosX, mousePosY, 0);
      }
    }

  }
  handleMouseUp(event: MouseEvent) {
    this.isMouseDown = false;
    const [mousePosX, mousePosY] = this.getActualCoordinate(event.offsetX, event.offsetY)

    if (this.mode == 'pointer') {
      if (!this.mouseMoved) {
        this.isMovingShape = false
        this.selectedShapeIdx = -1;
        for (let i = 0; i < this.elements.length; i++) {
          if (this.elements[i].isClicked(mousePosX, mousePosY)) {
            this.selectedShapeIdx = i;
            break;
          }
        }
      }
      else {
        // TODO: 
        // move image
      }
    }
    else if (this.mode == 'draw') {
      if (this.currShape && this.currShape.exist()) {
        this.elements.push(this.currShape)
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
  setSelectedTool(
    toolSelected: 'sketch' | 'line' | 'rectangle' | 'circle' | 'pointer'
  ) {
    this.mode = 'draw'
    if (toolSelected == 'sketch') {
      this.selectedShape = Sketch
    }
    else if (toolSelected == 'line') {
      this.selectedShape = Line
    }
    else if (toolSelected == 'rectangle') {
      this.selectedShape = Rectangle
    }
    else if (toolSelected == 'circle') {
      this.selectedShape = Circle
    }
    else if (toolSelected == 'pointer') {
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
    this.shiftedAmount[0] -= (x * (1 / newScale - 1 / this.currScale))
    this.shiftedAmount[1] -= (y * (1 / newScale - 1 / this.currScale))
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

  test() {
    this.setSelectedTool('pointer');
  }
}


export const CANVAS = new CanvasClass();
export default function Canvas() {
  const [selectedTool, setSelectedTool] = useState('sketch');

  return (
    <>
      <div className='managerContainer'>
        {
          // 
          //         <div
          //           className='test'
          //           onClick={() => {
          //             CANVAS.test()
          //           }}
          //         >
          //           test
          //         </div>
        }
        <div className='toolList'>
          <div className={
            selectedTool == 'pointer' ?
              'toolSelector selectedTool' :
              'toolSelector'
          }
            onClick={
              () => {
                CANVAS.setSelectedTool('pointer')
                setSelectedTool('pointer')
              }
            }
          >
            Pointer
          </div>
          <div className={
            selectedTool == 'sketch' ?
              'toolSelector selectedTool' :
              'toolSelector'
          }
            onClick={
              () => {
                CANVAS.setSelectedTool('sketch')
                setSelectedTool('sketch')
              }
            }
          >
            Sketch
          </div>
          <div className={
            selectedTool == 'line' ?
              'toolSelector selectedTool' :
              'toolSelector'
          }
            onClick={
              () => {
                CANVAS.setSelectedTool('line')
                setSelectedTool('line')
              }
            }
          >
            Line
          </div>
          <div className={
            selectedTool == 'circle' ?
              'toolSelector selectedTool' :
              'toolSelector'
          }
            onClick={
              () => {
                CANVAS.setSelectedTool('circle')
                setSelectedTool('circle')
              }
            }
          >
            Circle

          </div>
          <div className={
            selectedTool == 'rectangle' ?
              'toolSelector selectedTool' :
              'toolSelector'
          }
            onClick={
              () => {
                CANVAS.setSelectedTool('rectangle')
                setSelectedTool('rectangle')
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

