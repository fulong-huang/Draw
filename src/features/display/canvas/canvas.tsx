import { canvasSetSelectedTool } from './canvasFunction.tsx';
import ToolBox from './components/tool-box.tsx';
import ColorPicker from './components/color-picker.tsx';
import StrokePicker from './components/stroke-picker.tsx';
import './canvas.css'

export default function Canvas() {

  const toolList: ('Sketch' | 'Line' | 'Rectangle' | 'Circle' | 'Pointer')[] = [
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
            <ColorPicker
            />
            <StrokePicker
            />
          </div>
        </div>

        <canvas id='canvas' className='canvas'>
        </canvas>
      </div>
    </>
  )
}


