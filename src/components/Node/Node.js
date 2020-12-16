import React, { Component } from 'react';
import "./Node.css";

const Node = (props) => {
    const { isFinish, isStart, isVisited } = props;
    const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isVisited ? 'node-visited' : '';

    return (
        <div className={`node ${extraClassName}`}>
        </div>
    )
}

export default Node;