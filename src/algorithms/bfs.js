export function bfs(grid, startNode, finishNode) {
    console.log("bfs here")
    const visitedNodesInOrder = [];
    const unvisitedNeighbors = getAllNodes(grid);
    let q = [];
    let explored = [];
    explored.push(startNode);
    q.push(startNode);
    while (q.length) {
        let curr = q.shift();
        visitedNodesInOrder.push(curr);
        curr.isVisited = true;
        if (curr === finishNode)
            return visitedNodesInOrder;
        let currNeighbours = getUnvisitedNeighbors(curr, grid);
        currNeighbours.forEach(neighbor => {
            if (!explored.includes(neighbor))
                q.push(neighbor);
        })
    }
    return visitedNodesInOrder;
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}