import { useState } from 'react'
type toolBoxProps = {
  toolList: ('Sketch' | 'Line' | 'Rectangle' | 'Circle' | 'Pointer' | 'Text')[],
  onToolSelect: (item: 'Sketch' | 'Line' | 'Rectangle' | 'Circle' | 'Pointer' | 'Text') => void,
}

export default function ToolBox(props: toolBoxProps) {
  const [selectedTool, setSelectedTool] = useState('Sketch');
  return (
    <div className="tool-list">
      {props.toolList.map((item, i) => {
        return (
          <div
            className={
              selectedTool == item
                ? "tool-selector selected-tool"
                : "tool-selector"
            }
            key={"tool-list" + i}
            onClick={() => {
              props.onToolSelect(item);
              setSelectedTool(item);
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
