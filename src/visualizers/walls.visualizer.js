export function animateWalls(walls, grid) {
    for (let i = 0; i < walls.length; i++) {
        setTimeout(() => {
            const wall = walls[i];
            const node = grid[wall[0]][wall[1]];
            document.getElementById(`node-${node.row}-${node.col}`).className = "node node-animated-wall";
        }, 10*i);
    }
}