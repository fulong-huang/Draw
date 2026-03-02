import { useEffect, useState } from 'react'
type toolBoxProps = {
  toolList: ('Sketch' | 'Line' | 'Rectangle' | 'Circle' | 'Pointer' | 'Text')[],
  onToolSelect: (item: 'Sketch' | 'Line' | 'Rectangle' | 'Circle' | 'Pointer' | 'Text') => void,
}

export default function ToolBox(props: toolBoxProps) {
  const [selectedTool, setSelectedTool] = useState('Sketch');
  useEffect(() => {
    function keydownToolBox(event: KeyboardEvent) {
      const key = event.key;
      if (key == "Escape") {
        setSelectedTool("Pointer");
      }
    }
    window.addEventListener("keydown", keydownToolBox);
    return () => {
      window.removeEventListener("keydown", keydownToolBox);
    }
  }, [])
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
