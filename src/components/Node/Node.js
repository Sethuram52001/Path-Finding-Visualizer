import React, { Component } from 'react';
import "./Node.css";

const Node = (props) => {
    const { row, col, isStart, isFinish, isWall, onMouseDown, onMouseEnter, onMouseUp } = props;
    const extraClassName = isStart ? 'node-start' : isFinish ? 'node-finish' : isWall ? 'node-wall' : '' ; 

    return ( 
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
        ></div>
     );
}
 
export default Node;