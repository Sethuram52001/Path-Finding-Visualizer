// Performs BFS algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  // queue to keep track of the visited nodes
  let queue = [];
  queue.push(startNode);
  while (queue.length) {
    const currNode = queue.shift();
    // if the finsih node is reached then we return the visitedNodes array
    if (currNode === finishNode)
      return visitedNodesInOrder;
    
    // we skip the nodes which are walls, start node or finish node
    if (!currNode.isWall && (currNode.isStart || !currNode.isVisited)) {
      currNode.isVisited = true;
      visitedNodesInOrder.push(currNode);
      const { row, col } = currNode;
      updateUnvisitedNeighbours(row, col, queue, grid,currNode);
    }
  }
}

// updates the neighbours,
// in correspondance to the algorithm 
function updateUnvisitedNeighbours(row,col,queue,grid,currNode) {
      let next;
      if (row > 0) {
        next = grid[row - 1][col];
        if (!next.isVisited) {
          queue.push(next);
          next.previousNode = currNode;
        }
      }
      if (row < grid.length - 1) {
        next = grid[row + 1][col];
        if (!next.isVisited) {
          queue.push(next);
          next.previousNode = currNode;
        }
      }
      if (col > 0) {
        next = grid[row][col - 1];
        if (!next.isVisited) {
          queue.push(next);
          next.previousNode = currNode;
        }
      }
      if (col < grid[0].length - 1) {
        next = grid[row][col + 1];
        if (!next.isVisited) {
          queue.push(next);
          next.previousNode = currNode;
        }
      }
}