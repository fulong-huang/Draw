import { canvasSetSelectedTool } from './canvasFunction.tsx';
import ToolBox from './components/tool-box.tsx';
import './canvas.css'

export default function Canvas() {

  const toolList = [
    'Pointer',
    'Sketch',
    'Line',
    'Circle',
    'Rectangle',
  ]

  // @ts-expect-error varuable only used during testing
  // eslint-disable-next-line
  const test = (
    <div
      className='test'
      onClick={() => {
        // CANVAS.test()
      }}
    >
      test
    </div>
  )
  return (
    <>
      <div className='canvas-container'>

        <div className='tool-box-container'>
          {
            // test
          }
          <div className='tool-box'>
            <ToolBox
              toolList={toolList}
              onToolSelect={canvasSetSelectedTool}
            />

            <div className='tool-color-picker'>
              color picker
            </div>
          </div>
        </div>

        <canvas id='canvas' className='canvas'>
        </canvas>
      </div>
    </>
  )
}


