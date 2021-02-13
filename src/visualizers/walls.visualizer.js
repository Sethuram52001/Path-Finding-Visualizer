import { setVisualizationState } from "./index";

// it's been a long time since I visited this part of code
// but I believe there's some correction need to be made to work with 
// acutal app to set state and etc.,
// correction: setting the grid with the walls, animation works fine
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