// a random maze generator
// gets the grid, start and finish node
// it just uses a random func to decide 
// when to push the wall into grid
export function randomMaze(grid, startNode, finishNode) {
    let walls = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            // skip if it's the start or finish node
            if ((row === startNode.row && col === startNode.col) || (col === finishNode.row && col === finishNode.col)) {
                continue;
            }
            // random func to make decision to push the wall into the grid
            if (Math.random() < 0.33) {
                walls.push([row, col]);
            }
        }
    }
    // to jumble up the order in which the walls are animated,
    // to make it look random 
    walls.sort(() => Math.random() - 0.5);
    return walls;
}