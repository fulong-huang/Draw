import Shape from '../shape/Shape.tsx'
import './canvas.css'

export class CanvasClass {
  private canvas: HTMLCanvasElement = document.getElementById("canvas")! as HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!;
  resize(width: number, height: number) {
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    this.canvas.width = width;
    this.canvas.height = height;
  }

  draw(elements: Shape[]) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < elements.length; i++) {
      elements[i].draw(this.ctx);
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

