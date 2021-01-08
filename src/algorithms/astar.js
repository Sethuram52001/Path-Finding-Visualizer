// Performs astar's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
import { getAllNodes, sortNodesByDistance, getUnvisitedNeighbours } from "./index";

export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (!closestNode.isWall) {
      if (closestNode.distance === Infinity)
        return visitedNodesInOrder;
      
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      // if the finsih node is reached then we return the visitedNodes array
      if (closestNode === finishNode)
        return visitedNodesInOrder;
      
      updateUnvisitedNeighbours(closestNode, grid);
    }
  }
}

// updates the neighbours,
// in correspondance to the algorithm 
function updateUnvisitedNeighbours(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbours(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1 + neighbor.distanceToFinishNode;
    neighbor.previousNode = node;
  }
}