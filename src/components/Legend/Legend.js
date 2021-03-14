import React from 'react';
import "./Legend.scss";

const Legend = () => {
    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <div className="row mx-4">
                    <div className="mx-2 start-node"></div>
                    <span>start node</span>    
                </div>
                <div className="row mx-4">
                    <div className="mx-2 target-node"></div>
                    <span>target node</span>    
                </div>
                <div className="row mx-4">
                    <div className="mx-2 wall-node"></div>
                    <span>wall node</span>    
                </div>
                <div className="row mx-4">
                    <div className="mx-2 unvisited-node"></div>
                    <span>unvisited node</span>    
                </div>
                <div className="row mx-4">
                    <div className="mx-2 visited-node"></div>
                    <span>visited node</span>    
                </div>
                <div className="row mx-4">
                    <div className="mx-2 shortest-path-node"></div>
                    <span>shortest path node</span>    
                </div>
            </div>
        </div>
    );
}
 
export default Legend;