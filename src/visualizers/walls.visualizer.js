import { setVisualizationState } from "./index";

export function animateWalls(klass, walls, grid) {
    for (let i = 0; i <= walls.length; i++) {
        // set the visualization state
        if (i === walls.length) {
            setTimeout(() => {
                setVisualizationState(klass);
            }, 10*i);
            return true;
        }
        // sets the node's class to node-animated-wall
        setTimeout(() => {
            const wall = walls[i];
            const node = grid[wall[0]][wall[1]];
            document.getElementById(`node-${node.row}-${node.col}`).className = "node node-animated-wall";
        }, 10*i);
    }
}