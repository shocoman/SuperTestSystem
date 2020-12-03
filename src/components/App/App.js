import React, { useState } from "react";
import TestAddition from "../TestAddition/TestBlock";
import "./App.css";

function App() {
  const opTypes = [
    ["+", (a, b) => a + b],
    ["-", (a, b) => a - b],
    ["*", (a, b) => a * b],
    ["/", (a, b) => a / b],
  ];

  const [opType, setOpType] = useState(0);

  const setOpNum = (i) => {
    if (opType !== i) {
      setOpType(i);
    }
  };

  let buttons = [
    "Измерение информации",
    "Основы кодирования",
    "Позиционные системы счисления",
    "Основы машинной арифметики",
  ].map((name, i) => {
    let style = { backgroundColor: i === opType ? "#cab6b6" : "" };
    return (
      <button
        style={style}
        key={i}
        onClick={() => {
          setOpNum(i);
        }}
      >
        {name}
      </button>
    );
  });

  return (
    <div className={"root"}>
      <div className={"chooseTestType"}>
        <label>Выбери тему:</label>
        {buttons}
      </div>

      <div className="TestBlock">
        <TestAddition key={opTypes[opType]} opType={opType} num={3} />
      </div>
    </div>
  );
}

export default App;
