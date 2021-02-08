import React from 'react';
import { Progress } from "reactstrap";
import "./ProgressBar.scss";

const ProgressBar = (props) => {
    const { visitedNodes, shortestNodes } = props;
    return ( 
        <div>
            <div className="visited-nodes-bar">
                visited nodes: {visitedNodes}
                <Progress value={(visitedNodes / 800)*100} color="danger" />
            </div>
            <div className="shortest-nodes-bar">
                shortest path: {shortestNodes}
                <Progress value={(shortestNodes / 800)*100} color="success" />
            </div>
        </div>
     );
}
 
export default ProgressBar;