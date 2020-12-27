import React, { Component } from 'react';
import { Button, Container } from "reactstrap";
import "./PathVisualizer.css";
import Node from "../Node/Node";
import { dijkstra, getNodesInShortestPathOrder, dfs, bfs, astar } from "../../algorithms";
import { animateDijkstra, animateDFS, animateBFS, animateAStar } from "../../visualizers";

// constants
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class PathVisualizer extends Component {
    state = {
        grid: [],
        mouseIsPressed: false
    }
    
    componentDidMount() { 
        let grid = getInitialGrid();
        this.setState({ grid });
    }

    // handling mouse events to set up walls
    handleMouseDown(row, col) {
        const newGrid = gridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed)
            return;
        const newGrid = gridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
        //console.log("mouse up is called")
    }

    // dijkstra
    visualizeDijkstra = () => {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        console.log(visitedNodesInOrder);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    // dfs
    visualizeDFS = () => {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dfs(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDFS(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    // bfs
    visualizeBFS = () => {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = bfs(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        console.log(visitedNodesInOrder);
        animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    // astar
    visualizeAstar = () => {
        console.log("a star");
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_ROW];
        const visitedNodesInOrder = astar(grid, startNode, finishNode);
        console.log(visitedNodesInOrder);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateAStar(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    render() { 
        const { grid, mouseIsPressed } = this.state;
        return ( 
            <>
                <Container>
                    <Button onClick={this.visualizeDijkstra}>visualize dijkstra</Button>
                    <Button onClick={this.visualizeDFS}>visualize DFS</Button>
                    <Button onClick={this.visualizeBFS}>visualize BFS</Button>
                    <Button onClick={this.visualizeAstar}>visualize A*</Button>
                </Container>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isStart, isFinish, isWall } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                            onMouseUp={() => this.handleMouseUp()}
                                        />
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
 
export default PathVisualizer;

// helper functions
const getInitialGrid = () => {
    let grid = [];
    for (let row = 0; row < 20; row++) {
        const currRow = [];
        for (let col = 0; col < 50; col++) {
            currRow.push(createNode(row, col));
        }
        grid.push(currRow);
    }
    return grid;
}

const createNode = (row, col) => {
    return {
        row,
        col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        isWall: false,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        distanceToFinishNode: Math.abs(FINISH_NODE_ROW - row) + Math.abs(FINISH_NODE_COL - col)
    }
}

const gridWithWallToggled = (grid, row, col) => {
    let newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall
    }
    newGrid[row][col] = newNode;
    return newGrid;
}