export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  if (!startNode || !finishNode || startNode === finishNode)
    return false;
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall)
      continue;
    
    if (closestNode.distance === Infinity)
      return false;
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode)
      return visitedNodesInOrder;
    updateNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbors(node, grid) {
  const neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
  }
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const {c, r} = node;
  if (r > 0) neighbors.push(grid[r - 1][c]);
  if (r < grid.length - 1) neighbors.push(grid[r + 1][c]);
  if (c > 0) neighbors.push(grid[r][c - 1]);
  if (c < grid[0].length - 1) neighbors.push(grid[r][c + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const r of grid) {
    for (const node of r) {
      nodes.push(node);
    }
  }
  return nodes;
}
/*
// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}*/