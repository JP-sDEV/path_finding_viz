export function bfs(grid, startNode, finishNode) {

    const visitedNodesInOrder = []

    let unvisitedNodes = []
    unvisitedNodes.push(startNode)

    while (unvisitedNodes.length) {
        const node = unvisitedNodes.shift()
        
        if (node === finishNode) {
            return visitedNodesInOrder
        }

        if (node.isWall === true) continue;

        node.isVisited = true
        visitedNodesInOrder.push(node)

        unvisitedNodes = unvisitedNodes.concat(getUnvisitedNeighbors(node, grid))
    }

    return visitedNodesInOrder

}

  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const returnPath = []
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    for (let index = 0; index < neighbors.length; index++) {
        const neighbor = neighbors[index];
        if (!neighbor.isVisited) {
            neighbor.previousNode = node;
            neighbor.isVisited = true;
            returnPath.push(neighbor);
        }
    }

    return returnPath

}