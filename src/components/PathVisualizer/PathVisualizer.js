import React, { Component } from 'react';
import "./PathVisualizer.css";
import Node from "../Node/Node";

class PathVisualizer extends Component {
    state = { 
        nodes: []
    }
    
    componentDidMount() {
        // generating the grid matrix
        let nodes = [];
        for (let r = 0; r < 20; r++) {
            let currRow = [];
            for (let c = 0; c < 50; c++) {
                const currNode = {
                    c,
                    r,
                    isStart: r === 10 && c === 5,
                    isFinish: r === 10 && c === 45
                }
                currRow.push(currNode);
            }
            nodes.push(currRow);
        }
        this.setState({ nodes });
    }

    render() { 
        const { nodes } = this.state;
        return ( 
            // displaying the grid
            <div className="grid">
                {nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const { isStart, isFinish } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                    ></Node>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
         );
    }
}
 
export default PathVisualizer;