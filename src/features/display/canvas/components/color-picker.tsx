import "./color-picker.css"
import {canvasSetColor} from "../canvasFunction.tsx"

export default function ColorPicker(){
  return (
  <div className="color-picker">
    <div
      className="background-white"
      onClick={()=>canvasSetColor("white")}
    />
    <div
      className="background-black"
      onClick={()=>canvasSetColor("black")}
    />
    <span className="break-flex"/>
    <div
      className="background-red"
      onClick={()=>canvasSetColor("red")}
    />
    <div
      className="background-green"
      onClick={()=>canvasSetColor("green")}
    />
    <div
      className="background-blue"
      onClick={()=>canvasSetColor("blue")}
    />
  </div>
  )
}

