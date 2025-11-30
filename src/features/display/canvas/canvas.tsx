import Shape from '../shape/Shape.tsx'
import './canvas.css'

export class CanvasClass {
  currScale: number = 1;
  // board position indicated how much canvas have shifted 
  boardPosition: [number, number] = [0, 0];
  canvas: HTMLCanvasElement = document.getElementById("canvas")! as HTMLCanvasElement;
  ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!;
  width: number = 0;
  height: number = 0;

  resize(width: number, height: number) {
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
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

  zoom(x: number, y: number, currScale: number) {
    // Customize zooming and shifting 
    //  to change each element's position
    // this.ctx.setTransform(scaleBy, 0, 0, scaleBy, x, y);
    console.log(x, y);
    this.currScale = currScale;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  draw(elements: Shape) {
    elements.draw(this.ctx, this.currScale);
  }
  drawElements(elements: Shape[]) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].draw(this.ctx, this.currScale);
    }
  }
}

export default function Canvas() {

  return (
    <>
      <canvas id='canvas' className='canvas'>
      </canvas>
    </>
  )
}

