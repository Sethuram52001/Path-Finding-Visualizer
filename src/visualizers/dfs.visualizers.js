export function animateDFS(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = `node node-visited`;
    }
}