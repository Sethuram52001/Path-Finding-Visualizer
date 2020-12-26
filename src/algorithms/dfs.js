export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const st = [];
  st.push(startNode);
  while (st.length) {
    const currNode = st.pop();
    if (currNode === finishNode) {
      return visitedNodesInOrder;
    }

    if (!currNode.isWall && (currNode.isStart || !currNode.isVisited)) {
      currNode.isVisited = true;
      visitedNodesInOrder.push(currNode);
      const { row, col } = currNode;
      let next;
      if (row > 0) {
        next = grid[row - 1][col];
        if (!next.isVisited) {
          next.previousNode = currNode;
          st.push(next);
        }
      }
      if (row < grid.length - 1) {
        next = grid[row + 1][col];
        if (!next.isVisited) {
          next.previousNode = currNode;
          st.push(next);
        }
      }
      if (col > 0) {
        next = grid[row][col - 1];
        if (!next.isVisited) {
          next.previousNode = currNode;
          st.push(next);
        }
      }
      if (col < grid[0].length - 1) {
        next = grid[row][col + 1];
        if (!next.isVisited) {
          next.previousNode = currNode;
          st.push(next);
        }
      }
    }
  }
}

function getNextNode() {
  
}