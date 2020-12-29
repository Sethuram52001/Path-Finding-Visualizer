import React, { Component } from 'react';
import { Button, Container } from "reactstrap";
import "./PathVisualizer.css";
import Node from "../Node/Node";
import { dijkstra, getNodesInShortestPathOrder, dfs, bfs, astar } from "../../algorithms";
import { animateDijkstra, animateDFS, animateBFS, animateAStar } from "../../visualizers";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// constants
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class PathVisualizer extends Component {
    state = {
        grid: [],
        mouseIsPressed: false,
        dropdownOpen: false,
    }
    
    // creates the grid when the component is mounted
    componentDidMount() { 
        let grid = getInitialGrid();
        this.setState({ grid });
    }

    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
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

/*----------------------------------------------------------algorithm helper functions---------------------------------------------------------*/
    // dijkstra
    visualizeDijkstra = () => {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
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
        animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    // astar
    visualizeAstar = () => {
        console.log("a star");
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = astar(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateAStar(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    render() { 
        const { grid, mouseIsPressed } = this.state;
        return ( 
            <>
                <Container>
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        Algorithms
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Pick the algorithm to visualize</DropdownItem>
                        <DropdownItem>
                            <Button onClick={this.visualizeDijkstra}>visualize dijkstra</Button>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            <Button onClick={this.visualizeDFS}>visualize DFS</Button>  
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            <Button onClick={this.visualizeBFS}>visualize BFS</Button>    
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            <Button onClick={this.visualizeAstar}>visualize A*</Button>   
                        </DropdownItem>                           
                    </DropdownMenu>
                    </ButtonDropdown>
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

/*------------------------------------------------------------helper functions----------------------------------------------------------------*/

// creating the initial grid, calls the createNode() function
// to initialise the node with initial properties
const getInitialGrid = () => {
    let grid = [];
    for (let row = 0; row < 20; row++) {
        const currRow = [];
        for (let col = 0; col < 40; col++) { //  previously I had it as 20*50
            currRow.push(createNode(row, col));
        }
        grid.push(currRow);
    }
    return grid;
}

// initialising the node with its initial properties
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

// updating the grid, when the walls are tiggered
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