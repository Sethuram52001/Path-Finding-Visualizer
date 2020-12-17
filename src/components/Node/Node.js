import React, { Component } from 'react';
import "./Node.css";

const Node = (props) => {
    const { isFinish, isStart, isVisited, onMouseDown,onMouseEnter,onMouseUp } = props;
    const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isVisited ? 'node-visited' : '';

    return (
        <div
            className={`node ${extraClassName}`}
            onMouseDown={() => onMouseDown(r, c)}
            onMouseEnter={() => onMouseEnter(r, c)}
            onMouseUp={() => onMouseUp()}
        ></div>
    )
}

export default Node;