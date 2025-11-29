import Rectangle from './display/shape/Rectangle.tsx'
import {CanvasClass} from './display/canvas/canvas.tsx'

export default class Manager{
  constructor(){
    this.elements = [];
    this.canvas = null;
  }

  init(){
    console.log("INIT MANAGER");
    this.canvas = new CanvasClass();

    const width = window.innerWidth;
    const height = window.innerHeight;
    this.resize(width, height);
  }

  resize(width, height){
    this.canvas.resize(width, height);
    this.canvas.draw(this.elements);
  }

  addShape(w, h){
    const newRect = new Rectangle(this.elements.length*10, this.elements.length*10, w, h);
    if(this.elements.length >= 5){
      const ele = this.elements
      ele.shift()
      this.elements = ([...ele, newRect]);
    }
    else{
      this.elements = ([...this.elements, newRect]);
    }
    this.canvas.draw(this.elements);
  }
}

