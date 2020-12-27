export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  let queue = [];
  queue.push(startNode);
  while (queue.length) {
    const currNode = queue.shift();
    if (currNode === finishNode)
      return visitedNodesInOrder;
    
    if (!currNode.isWall && (currNode.isStart || !currNode.isVisited)) {
      currNode.isVisited = true;
      visitedNodesInOrder.push(currNode);
      const { row, col } = currNode;
      let next;
      if (row > 0) {
        next = grid[row - 1][col];
        if (!next.isVisited) {
          queue.push(next);
        }
      }
      if (row < grid.length - 1) {
        next = grid[row + 1][col];
        if (!next.isVisited) {
          queue.push(next);
        }
      }
      if (col > 0) {
        next = grid[row][col - 1];
        if (!next.isVisited) {
          queue.push(next);
        }
      }
      if (col < grid[0].length - 1) {
        next = grid[row][col + 1];
        if (!next.isVisited) {
          queue.push(next);
        }
      }
    }
  }
}