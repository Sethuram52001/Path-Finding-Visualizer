import React, { Component } from 'react';
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

/*
       <NavbarText>
          visited nodes: {props.visitedNodes}
          <Progress value={props.visitedNodes/800} color="danger" />
        </NavbarText>
        <NavbarText>
          shortes path: {props.shortestNodes}
          <Progress value={props.shortestNodes/800} color="success" />
        </NavbarText>
 */