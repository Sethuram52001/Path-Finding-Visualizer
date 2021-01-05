import React, { Component } from 'react';
import "./PathVisualizer.css";
import Node from "../Node/Node";
import { dijkstra, getNodesInShortestPathOrder, dfs, bfs, astar } from "../../algorithms";
import { animateDijkstra, animateDFS, animateBFS, animateAStar } from "../../visualizers";
import { recursiveDivisionMaze, randomMaze } from "../../maze-algorithms";
import AppNavbar from "../AppNavbar";
import ErrorModal from '../ErrorModal';
import { Progress } from "reactstrap";
import Footer from "../Footer";

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
        isPathNotFound: false,
        totalNodes: 100,
        shortestNodes: 0
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
        try {
            const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            this.setState({ 
                shortestNodes: nodesInShortestPathOrder.length,
                totalNodes: visitedNodesInOrder.length
            });
            animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, startNode, finishNode);
        } catch (error) {
            console.log("path not found")
            this.setState({ isPathNotFound: true });
            setTimeout(() => {
                this.setState({ isPathNotFound: false });
            }, 3000);
        }
    }

    // dfs
    visualizeDFS = () => {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        try {
            const visitedNodesInOrder = dfs(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            this.setState({ 
                shortestNodes: nodesInShortestPathOrder.length,
                totalNodes: visitedNodesInOrder.length
            });
            animateDFS(visitedNodesInOrder, nodesInShortestPathOrder, startNode, finishNode);   
        } catch (error) {
            console.log("path not found")
            this.setState({ isPathNotFound: true });
            setTimeout(() => {
                this.setState({ isPathNotFound: false });
            }, 3000);
        }
    }

    // bfs
    visualizeBFS = async() => {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        try {
            const visitedNodesInOrder = bfs(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            this.setState({ 
                shortestNodes: nodesInShortestPathOrder.length,
                totalNodes: visitedNodesInOrder.length
            });
            animateBFS(visitedNodesInOrder, nodesInShortestPathOrder, startNode, finishNode);    
        } catch (error) {
            console.log("path not found")
            this.setState({ isPathNotFound: true });
            setTimeout(() => {
                this.setState({ isPathNotFound: false });
            }, 3000);
        }
    }

    // astar
    visualizeAstar = () => {
        console.log("a star");
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        try {
            const visitedNodesInOrder = astar(grid, startNode, finishNode);
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            this.setState({ 
                shortestNodes: nodesInShortestPathOrder.length,
                totalNodes: visitedNodesInOrder.length
            });
            animateAStar(visitedNodesInOrder, nodesInShortestPathOrder, startNode, finishNode);
        } catch (error) {
            console.log("path not found")
            this.setState({ isPathNotFound: true });
            setTimeout(() => {
                this.setState({ isPathNotFound: false });
            }, 3000);
        }
    }

/*----------------------------------------------------------clear helper functions---------------------------------------------------------*/
    clearGrid = () => {
        for (let row = 0; row < this.state.grid.length; row++) {
            for (let col = 0; col < this.state.grid[0].length; col++) {
                if (!((row === START_NODE_ROW && col === START_NODE_COL) || (row === FINISH_NODE_ROW && col === FINISH_NODE_COL))) {
                    document.getElementById(`node-${row}-${col}`).className = "node";
                }
            }
        }
        const newGrid = getInitialGrid();
        this.setState({ grid: newGrid });
    }

    clearPath = () => {
        for (let row = 0; row < this.state.grid.length; row++) {
            for (let col = 0; col < this.state.grid[0].length; col++) {
                if ((document.getElementById(`node-${row}-${col}`).className === "node node-shortest-path") || document.getElementById(`node-${row}-${col}`).className === "node node-visited") {
                    document.getElementById(`node-${row}-${col}`).className = "node";
                }
            } 
        }
        const newGrid = getGridWithoutPath(this.state.grid);
        this.setState({ grid: newGrid });
    }

/*----------------------------------------------------------maze generations functions---------------------------------------------------------*/
    generateRecursiveDivisionMaze = () => {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const walls = recursiveDivisionMaze(grid, startNode, finishNode);
        console.log(walls);
        const newGrid = getNewGridWithMaze(this.state.grid, walls);
        this.setState({ grid: newGrid });
        for (let i = 0; i < walls.length; i++) {
            let wall = walls[i];
            let node = this.state.grid[wall[0]][wall[1]];
            document.getElementById(`node-${node.row}-${node.col}`).className = "node node-wall";
        }
    }

    generateRandomMaze = () => {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const walls = randomMaze(grid, startNode, finishNode);
        console.log(walls);
        const newGrid = getNewGridWithMaze(this.state.grid, walls);
        this.setState({ grid: newGrid });
        for (let i = 0; i < walls.length; i++) {
            let wall = walls[i];
            let node = this.state.grid[wall[0]][wall[1]];
            document.getElementById(`node-${node.row}-${node.col}`).className = "node node-wall"
        }
    }
    
    render() { 
        const { grid, mouseIsPressed } = this.state;
        return ( 
            <>
                {this.state.isPathNotFound ? <ErrorModal /> : null }
                <AppNavbar
                    handleDijkstra={this.visualizeDijkstra}
                    handleDFS={this.visualizeDFS}
                    handleBFS={this.visualizeBFS}
                    handleAstar={this.visualizeAstar}
                    handleClearPath={this.clearPath}
                    handleClearGrid={this.clearGrid}
                    handleMaze={this.generateRecursiveDivisionMaze}
                    handleRandomMaze={this.generateRandomMaze}
                />
                <Progress multi>
                    <Progress bar animated value={(this.state.shortestNodes/this.state.totalNodes)*100}>{ ((this.state.shortestNodes/this.state.totalNodes)*100).toPrecision(4) }%</Progress>
                </Progress>
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
                <Footer />
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

// updating the grid, resetting the features except for the walls
const getGridWithoutPath = (grid) => {
    let newGrid = grid.slice();
    for (let row of grid) {
        for (let node of row) {
            let newNode = {
                ...node,
                distance: Infinity,
                isVisited: false,
                previousNode: null,
                distanceToFinishNode: Math.abs(FINISH_NODE_ROW - node.row) + Math.abs(FINISH_NODE_COL - node.col)
            };
            newGrid[node.row][node.col] = newNode;
        }
    }
    return newGrid;
}

const getNewGridWithMaze = (grid, walls) => {
  let newGrid = grid.slice();
  for (let wall of walls) {
    let node = grid[wall[0]][wall[1]];
    let newNode = {
      ...node,
      isWall: true,
    };
    newGrid[wall[0]][wall[1]] = newNode;
  }
  return newGrid;
};
/*
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
                    <Button onClick={this.clearGrid}>Clear Grid</Button>
                    <Button onClick={this.clearPath}>Clear Paths</Button>
                </Container>
*/