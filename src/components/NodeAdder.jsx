import React, { useState, useEffect, useRef } from "react";
import "./NodeAdder.css";

const NodeAdder = ({ visible, onSubmit, onCancel }) => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (visible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [visible]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputText.trim() !== "") {
        onSubmit(inputText.trim());
        setInputText("");
      }
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  if (!visible) return null;

  return (
    <div className="node-adder-container">
      <input
        ref={inputRef}
        type="text"
        className="node-adder-input"
        placeholder="Type node label and hit Enter..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="node-adder-submit"
        onClick={() => {
          if (inputText.trim() !== "") {
            onSubmit(inputText.trim());
            setInputText("");
          }
        }}
      >
        &#x2714;
      </button>
    </div>
  );
};

export default NodeAdder;
