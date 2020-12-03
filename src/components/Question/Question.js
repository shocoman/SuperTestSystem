import React, { useState } from "react";
import "./Question.css";

export const AnswerStatus = Object.freeze({
    WRONG: 1,
    NONE: 2,
    RIGHT: 3,
});

export default function Question({
                                     onchange,
                                     value,
                                     keyId,
                                     questionText,
                                     status,
                                     answer,
                                 }) {
    const backColor =
        status === AnswerStatus.NONE
            ? "initial"
            : status === AnswerStatus.RIGHT
            ? "lightgreen"
            : "#fa898b";
    let statusStyle = {
        background: backColor,
    };

    return (
        <div className="testCard">
            <div className="questionText">
                {questionText.split("\n").map((q, i) => (
                    <div key={i}> {q} </div>
                ))}
                {answer && (
                    <div style={{ color: backColor }}> - Правильный ответ: {answer}</div>
                )}
            </div>

            <div className="inputField">
                <label htmlFor="answerField"> Введите ответ: </label>
                <input
                    name={"answerField"}
                    id={keyId}
                    value={value}
                    onChange={onchange}
                    style={statusStyle}
                />
            </div>
        </div>
    );
}