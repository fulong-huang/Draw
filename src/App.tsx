import { useEffect } from 'react'
import './App.css'
import { MANAGER } from './features/manager.tsx'
import Canvas, { CANVAS } from './features/display/canvas/canvas.tsx'

function App() {
  useEffect(() => {
    CANVAS.init();
    MANAGER.setCanvas(CANVAS);
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      MANAGER.canvas.resize(width, height);
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
      {<Canvas />}
    </>
  )
}

export default App
