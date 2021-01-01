export function animateBFS(visitedNodesInOrder, nodesInShortestPath, startNode, finishNode) {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPath);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      if ((node !== startNode) && (node !== finishNode))
        document.getElementById(`node-${node.row}-${node.col}`).className = `node node-visited`;
    }, 10 * i);
  }
}

function animateShortestPath(nodesInShortestPath) {
  for (let i = 1; i < nodesInShortestPath.length-1; i++) {
    setTimeout(() => {
      const node = nodesInShortestPath[i];
      document.getElementById(`node-${node.row}-${node.col}`).className = `node node-shortest-path`;
    }, 50 * i);
  }
}