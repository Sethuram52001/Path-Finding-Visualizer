import React, { Component } from 'react';
import "./Node.scss";
import xwing from "../../images/x-wing.png";
import deathstar from "../../images/death-star.png";

const Node = (props) => {
    const { row, col, isStart, isFinish, isWall, onMouseDown, onMouseEnter, onMouseUp } = props; //, onMouseLeave
    const extraClassName = isStart ? 'node-start' : isFinish ? 'node-finish' : isWall ? 'node-wall' : '' ; 

    return ( 
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp(row,col)}
            //onMouseLeave={() => onMouseLeave(row, col)}
        >
        </div>
     );
}
 
export default Node;