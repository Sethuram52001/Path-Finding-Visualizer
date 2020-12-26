import { dijkstra } from "./dijkstra";
import { dfs } from "./dfs";
import { bfs } from "./bfs";
import { astar } from "./astar";

export { dijkstra, dfs, bfs, astar, getNodesInShortestPathOrder };

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}