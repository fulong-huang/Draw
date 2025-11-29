import React, { useEffect, useState} from 'react';
import Manager from '../manager.tsx';

import './canvas.css'

export default function Canvas(){
  const [elements, setElements] = useState([]);
  const manager = new Manager(elements, setElements);

  useEffect(()=>{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < elements.length; i++){
      elements[i].draw(ctx);
    }
  });

  return (
    <>
      <div onClick={()=>{manager.addShape(elements.length*10, elements.length*10, 100, 100)}}>manager</div>
      <canvas id='canvas' className='canvas'>
      </canvas>
    </>
  )
}

