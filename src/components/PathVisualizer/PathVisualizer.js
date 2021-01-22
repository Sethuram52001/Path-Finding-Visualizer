import React, { Component } from 'react';
import "./PathVisualizer.scss";
import Node from "../Node/Node";
import { dijkstra, getNodesInShortestPathOrder, dfs, bfs, astar } from "../../algorithms";
import { animatePath, animateWalls, setVisualizationState } from "../../visualizers";
import { recursiveDivisionMaze, randomMaze } from "../../maze-algorithms";
import AppNavbar from "../AppNavbar";
import ErrorModal from '../ErrorModal';
import { Progress } from "reactstrap";
import Footer from "../Footer/Footer";
import TooltipExampleMulti from '../ToolTip';

//constants
let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 35;

class PathVisualizer extends Component {
    state = {
        grid: [],
        mouseIsPressed: false,
        isPathNotFound: false,
        totalNodes: 100,
        shortestNodes: 0,
        tooltipOpen: false,
        isVisualizing: false,
        mainIsPressed: "",
        startNode: [START_NODE_ROW, START_NODE_COL],
        finishNode: [FINISH_NODE_ROW, FINISH_NODE_COL],
    }

    // creates the grid when the component is mounted
    componentDidMount() {
        // this.setState({
        //     startNode: [START_NODE_ROW, START_NODE_COL],
        //     finishNode: [FINISH_NODE_ROW, FINISH_NODE_COL]
        // });
        let grid = this.getInitialGrid();
        this.setState({ grid });
    }

    toggle = () => {
        this.setState({ tooltipOpen: !this.state.tooltipOpen });
    }

    // handling mouse events to set up walls
    handleMouseDown(row, col) {
        // start node | finish node
        const { startNode, finishNode,grid } = this.state;
        let start_x = startNode[0];
        let start_y = startNode[1];
        let finish_x = finishNode[0];
        let finish_y = finishNode[1];
        if (grid[row][col].isStart) {
            this.setState({ mainIsPressed: "start" });
            console.log("start node - main is pressed")
        }
        else if (grid[row][col].isFinish) {
            this.setState({ mainIsPressed: "end" });
        }
        const newGrid = gridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed)
            return;
        // start node | finish node
        const { grid } = this.state;
        if (this.state.mainIsPressed === "start") {
            grid[row][col].isStart = true;
            this.setState({ 
                startNode: [row,col]
            });
        }
        else {
            console.log("walls have no work here")
            const newGrid = gridWithWallToggled(this.state.grid, row, col);
            this.setState({ grid: newGrid });
        }
    }

    handleMouseLeave = (row, col) => {
        let arr = this.state.grid;
        if (this.state.mainClicked !== "") {
            arr[row][col].isStart = false;
            //arr[row][col].isEnd=false;
            this.setState({
                grid: arr
            })
        }
    }

    handleMouseUp = (row, col) => {
        this.setState({ mouseIsPressed: false, mainIsPressed: "" });
        //console.log("mouse up is called")
        const { grid } = this.state;
        grid[row][col].isStart = true;
    }

/*----------------------------------------------------------algorithm helper functions---------------------------------------------------------*/
    // dijkstra
    visualizeDijkstra = () => {
        if (this.state.isVisualizing)
            return;
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
            animatePath(this, visitedNodesInOrder, nodesInShortestPathOrder, startNode, finishNode);
        } catch (error) {
            console.log("path not found")
            this.setState({ isPathNotFound: true });
            setTimeout(() => {
                this.setState({ isPathNotFound: false });
            }, 3000);
        }
        console.log(this.state.isVisualizing)
        //this.setState({ isVisualizing: !this.state.isVisualizing });
    }

    // dfs
    visualizeDFS = () => {
        if (this.state.isVisualizing)
            return;
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
            animatePath(this, visitedNodesInOrder, nodesInShortestPathOrder, startNode, finishNode);
        } catch (error) {
            console.log("path not found")
            this.setState({ isPathNotFound: true });
            setTimeout(() => {
                this.setState({ isPathNotFound: false });
            }, 3000);
        }
    }

    // bfs
    visualizeBFS = async () => {
        if (this.state.isVisualizing)
            return;
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
            animatePath(this, visitedNodesInOrder, nodesInShortestPathOrder, startNode, finishNode);
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
        if (this.state.isVisualizing)
            return;
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
            animatePath(this, visitedNodesInOrder, nodesInShortestPathOrder, startNode, finishNode);
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
        if (this.state.isVisualizing)
            return;
        for (let row = 0; row < this.state.grid.length; row++) {
            for (let col = 0; col < this.state.grid[0].length; col++) {
                if (!((row === START_NODE_ROW && col === START_NODE_COL) || (row === FINISH_NODE_ROW && col === FINISH_NODE_COL))) {
                    document.getElementById(`node-${row}-${col}`).className = "node";
                }
            }
        }
        const newGrid = this.getInitialGrid();
        this.setState({ grid: newGrid });
    }

    clearPath = () => {
        if (this.state.isVisualizing)
            return;
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
        if (this.state.isVisualizing)
            return;
        this.setState({ isVisualizing: true });
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const walls = recursiveDivisionMaze(grid, startNode, finishNode);
        console.log(walls);
        //animateWalls(this,walls, grid);
        this.animateWalls(walls, grid);
    }

    generateRandomMaze = () => {
        if (this.state.isVisualizing)
            return;
        this.setState({ isVisualizing: true });
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const walls = randomMaze(grid, startNode, finishNode);
        console.log(walls);
        this.animateWalls(walls, grid);
        // const msg = this.animateWalls(walls, grid);
        // console.log(msg);
        // if (msg) {
        //     const newGrid = getNewGridWithMaze(this.state.grid, walls);
        //     this.setState({ grid: newGrid });
        // }
    }

    animateWalls = (walls, grid) => {
        for (let i = 0; i <= walls.length; i++) {
            if (i === walls.length) {
                setTimeout(() => {
                    const newGrid = getNewGridWithMaze(this.state.grid, walls);
                    this.setState({ grid: newGrid, isVisualizing: false });
                }, 10 * i);
                return ;
            }
            setTimeout(() => {
                const wall = walls[i];
                const node = grid[wall[0]][wall[1]];
                document.getElementById(`node-${node.row}-${node.col}`).className = "node node-animated-wall";
            }, 10 * i);
        }
    }

    setVisualization = () => {
        this.setState({
            isVisualizing: !this.state.isVisualizing
        });
    }

    handleClick = () => {
        setVisualizationState(this);
    }

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <>
                <TooltipExampleMulti />
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
                    handleVisualization={this.setVisualization}
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
                                            onMouseUp={() => this.handleMouseUp(row,col)}
                                            onMouseLeave={(row, col) => this.handleMouseLeave(row, col)}
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

    // creating the initial grid, calls the createNode() function
    // to initialise the node with initial properties
    //const 
    getInitialGrid = () => {
        let grid = [];
        const { startNode, finishNode } = this.state;
        for (let row = 0; row < 20; row++) {
            const currRow = [];
            for (let col = 0; col < 40; col++) { //  previously I had it as 20*50
                //currRow.push(createNode(row, col));
                currRow.push(createNode(row, col, startNode, finishNode));
            }
            grid.push(currRow);
        }
        return grid;
    }

}

export default PathVisualizer;

/*------------------------------------------------------------helper functions----------------------------------------------------------------*/

// prev getInitialGrid func was here

// initialising the node with its initial properties
const createNode = (row, col, startNode, finishNode) => {
    let start_x = startNode[0];
    let start_y = startNode[1];
    let finish_x = finishNode[0];
    let finish_y = finishNode[1];

    return {
        row,
        col,
        isStart: row === start_x && col === start_y,
        isFinish: row === finish_x && col === finish_y,
        isWall: false,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        distanceToFinishNode: Math.abs(finish_x - row) + Math.abs(finish_y - col)
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