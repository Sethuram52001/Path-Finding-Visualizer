import React, { Component } from 'react';
import "./PathVisualizer.css";
import Node from "../Node/Node";
import { dijkstra } from '../../algorithms/dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_COL = 35;
const FINISH_NODE_ROW = 10;

class PathVisualizer extends Component {
    state = { 
        grid: [],
        mouseIsPressed: false,
    }
    
    componentDidMount() {
        // generating the grid matrix
        let grid = getInitialGrid();
        /*for (let r = 0; r < 20; r++) {
            let currRow = [];
            for (let c = 0; c < 50; c++) {
                const currNode = {
                    c,
                    r,
                    isStart: r === START_NODE_ROW && c === START_NODE_COL,
                    isFinish: r === FINISH_NODE_ROW && c === FINISH_NODE_COL
                }
                currRow.push(currNode);
            }
            grid.push(currRow);
        }*/
        this.setState({ grid });
    }

    handleMouseDown = (r, c) => {
        const newGrid = getNewGridWithWallToggled(this.state.grid, r, c);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter = (r, c) => {
        if (!this.state.mouseIsPressed)
            return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, r, c);
        this.setState({ grid:newGrid  });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    animateDijkstra = (visitedNodesInOrder) => {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                const newGrid = this.state.grid.slice();
                const newNode = {
                    ...node,
                    isVisited: true,
                };
                newGrid[node.r][node.c] = newNode;
                this.setState({ gird: newGrid });
            }, 100*i );
        }
    }

    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        console.log(visitedNodesInOrder);
        this.animateDijkstra(visitedNodesInOrder);

    }

    render() { 
        const { grid } = this.state;
        return ( 
            // displaying the grid
            <>
            <button onClick={() => this.visualizeDijkstra()}>click</button>
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const { isStart, isFinish, isVisited } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                        isVisited={isVisited}
                                    ></Node>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            </>
         );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let r = 0; r < 20; r++) {
        const currRow = [];
        for (let c = 0; c < 50; c++) {
            currRow.push(createNode(c, r));
        }
        grid.push(currRow);
    }
    return grid;
}

const createNode = (c, r) => {
    return {
        c,
        r,
        isStart: r === START_NODE_ROW && c === START_NODE_COL,
        isFinish: r === FINISH_NODE_ROW && c === FINISH_NODE_COL,
        isVisited: false,
        distance: Infinity,
        isWall: false
    }
}

const getNewGridWithWallToggled = (grid, r, c) => {
    const newGrid = grid.slice();
    const node = newGrid[r][c];
    const newNode = {
        ...node,
        isWall: !node.isWall
    }
    newGrid[r][c] = newNode;
    return newGrid;
}

export default PathVisualizer;