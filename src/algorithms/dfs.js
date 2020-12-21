export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const unvisitedNodes = getAllNodes(grid);
  startNode.isVisited = true;
  let explored = [];
  explored.push(startNode);
  visitedNodesInOrder.push(startNode);
  let st = [];
  st.push(startNode);
  while (st.length) {
    //console.log("while")
    //console.log(st.pop());
    let curr = st.pop();
    visitedNodesInOrder.push(curr);
    explored.push(curr);
    curr.isVisited = true;
    if (curr === finishNode)
        return visitedNodesInOrder;
    visitedNodesInOrder.push(curr);
    let unvisitedNeighbours = getUnvisitedNeighbors(curr, grid);
    /*for (let i = 0; i < unvisitedNeighbours.length; i++) {
      const node = unvisitedNeighbours[i];
      node.isVisited = true;
      //visitedNodesInOrder.push(curr);
      st.push(node);
    }*/
      unvisitedNeighbours.forEach(n => {
        if (!explored.includes(n)) {
        st.push(n)
      }
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
