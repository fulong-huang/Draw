import { canvasElements, canvasSetSelectedTool, canvasUpdateCanvas } from './canvasFunction.tsx';
import { undoHistory, redoHistory } from './editHistory.tsx';
import ToolBox from './components/tool-box.tsx';
import ColorPicker from './components/color-picker.tsx';
import StrokePicker from './components/stroke-picker.tsx';
import Text from '../shape/Text.tsx';
import './canvas.css'

export default function Canvas() {
	
	const text = new Text(100, 100, 'new text');
	canvasElements.push(text);


  const toolList: ('Sketch' | 'Line' | 'Rectangle' | 'Circle' | 'Pointer' | 'Text')[] = [
    'Pointer',
    'Sketch',
    'Line',
    'Circle',
    'Rectangle',
		'Text',
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
        <div className='canvas-history-button'>
          <div onClick={() => { undoHistory(); canvasUpdateCanvas() }}>Undo</div>
          <div onClick={() => { redoHistory(); canvasUpdateCanvas() }}>Redo</div>
        </div>
      </div>
    </>
  )
}


