import { useEffect } from 'react'
import './App.css'
import { managerInit, managerCleanUp } from './features/manager.tsx'
import Canvas from './features/display/canvas/canvas.tsx'

function App() {
  useEffect(() => {
		managerInit();
    return () => {
      managerCleanUp();
    }
  }, [])
  return (
    <>
      {<Canvas />}
    </>
  )
}

export default App
