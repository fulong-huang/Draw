import React, { useEffect, useState} from 'react';

import './canvas.css'

export class CanvasClass{
  constructor(){
    console.log("INIT CANVAS");
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
  }
  resize(width, height){
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    this.canvas.width = width;
    this.canvas.height = height;
  }
  getContext(ct){
    return this.canvas.getContext(ct);
  }
  draw(elements){
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < elements.length; i++){
      elements[i].draw(this.ctx);
    }
  }
}

export default function Canvas(){

  return (
    <>
      <canvas id='canvas' className='canvas'>
      </canvas>
    </>
  )
}

