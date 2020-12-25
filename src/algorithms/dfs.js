export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const st = [];
  st.push(startNode);
  while (st.length) {
    const currNode = st.pop();
    if (currNode === finishNode)
      return visitedNodesInOrder;
    if ((currNode.isStart || !currNode.isVisited) && !currNode.isWall) {
      currNode.isVisited = true;
      visitedNodesInOrder.push(currNode);
      const { row, col } = currNode;
      const next = getNextNode(grid, row, col, st, currNode);
    }
  }
}

function getNextNode(grid, row, col, st,currNode) {
  if (row > 0) {
    const next = grid[row - 1][col];
    if (!next.isVisited) {
      st.push(next);
      next.previousNode = currNode;
    }
  }
  if (row < grid.length - 1) {
    const next = grid[row + 1][col];
    if (!next.isVisited) {
      st.push(next);
      next.previousNode = currNode;
    }
  }
  if (col < grid[0].length - 1) {
    const next = grid[row][col + 1];
    if (!next.isVisited) {
      st.push(next);
      next.previousNode = currNode;
    }
  }
  if (col > 0) {
    const next = grid[row][col - 1];
    if (!next.isVisited) {
      st.push(next);
      next.previousNode = currNode;
    }
  }
}

export function getNodesInShortestPathOrderDFS(finishNode) {
  const nodesInShortestPath = [];
  let currNode = finishNode;
  while (currNode !== null) {
    nodesInShortestPath.unshift(currNode);
    currNode = currNode.previousNode;
  }
  return nodesInShortestPath;
}