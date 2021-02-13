// Performs DFS algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  // stack to keep track of the visited nodes
  const stack = []; 
  stack.push(startNode);
  while (stack.length) {
    const currNode = stack.pop();
    // if the finsih node is reached then we return the visitedNodes array
    if (currNode === finishNode) 
      return visitedNodesInOrder;

    // we skip the nodes which are walls, start node or finish node
    if (!currNode.isWall && (currNode.isStart || !currNode.isVisited)) {
      currNode.isVisited = true;
      visitedNodesInOrder.push(currNode);
      const { row, col } = currNode;
      updateUnvisitedNeighbours(row, col, stack, grid,currNode);
    }
  }
}

// updates the neighbours,
// in correspondance to the algorithm 
function  updateUnvisitedNeighbours(row, col, stack, grid,currNode) {
      let next;
      if (row > 0) {
        next = grid[row - 1][col];
        if (!next.isVisited) {
          next.previousNode = currNode;
          stack.push(next);
        }
      }
      if (row < grid.length - 1) {
        next = grid[row + 1][col];
        if (!next.isVisited) {
          next.previousNode = currNode;
          stack.push(next);
        }
      }
      if (col < grid[0].length - 1) {
        next = grid[row][col + 1];
        if (!next.isVisited) {
          next.previousNode = currNode;
          stack.push(next);
        }
      }
      if (col > 0) {
        next = grid[row][col - 1];
        if (!next.isVisited) {
          next.previousNode = currNode;
          stack.push(next);
        }
      }
}