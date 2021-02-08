import React from 'react';
import "./Node.scss";

const Node = (props) => {
    const { row, col, isStart, isFinish, isWall, onMouseDown, onMouseEnter, onMouseUp, onMouseLeave } = props;
    const extraClassName = isStart ? 'node-start' : isFinish ? 'node-finish' : isWall ? 'node-wall' : '' ; 

    return ( 
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp(row,col)}
            onMouseLeave={() => onMouseLeave(row, col)}
        >
        </div>
     );
}
 
export default Node;