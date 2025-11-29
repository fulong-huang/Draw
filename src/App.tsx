import {useEffect} from 'react'
import './App.css'
import Canvas, {CanvasClass} from './features/display/canvas/canvas.tsx'
import Manager from './features/manager.tsx'

const MANAGER = new Manager();
function App() {
  useEffect(() => {
    console.log("USE EFFECT");
    MANAGER.init();
//     function handleResize(){
//       const width = window.innerWidth;
//       const height = window.innerHeight;
//       MANAGER.resize(width, height);
//     }
    // window.addEventListener('resize', handleResize);
    // handleResize()
    // return ()=> window.removeEventListener('resize', handleResize);
  }, [])
  return (
    <>
      <div onClick={()=>{MANAGER.addShape(100, 100)}}>manager</div>
      <Canvas />
    </>
  )
}

export default App
