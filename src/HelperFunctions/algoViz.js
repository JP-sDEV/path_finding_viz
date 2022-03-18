import { bfs } from "../algos/bfs"
import { dfs } from "../algos/dfs"
import { dijkstra, getNodesInShortestPathOrder } from "../algos/dijkstra"
import { animateAlgorithm } from "./animate"

const speedValues = {
    "slow" : 20,
    "normal" : 10,
    "fast" : 5
}

export const visualizeDijkstra = (state) => {
    try {
        const { grid,
                startNodePositionX,
                startNodePositionY,
                finishNodePositionX,
                finishNodePositionY,
                speed } = state

        const startNode = grid[startNodePositionX][startNodePositionY]
        const finishNode = grid[finishNodePositionX][finishNodePositionY]
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
        animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder, speedValues[speed])
    }
    catch(err) {
       raiseNodeRangeError()
    }
}

export const visualizeBFS = (state) => {
    try {
        const { grid, 
            startNodePositionX,
            startNodePositionY,
            finishNodePositionX,
            finishNodePositionY,
            speed } = state

        const startNode = grid[startNodePositionX][startNodePositionY]
        const finishNode = grid[finishNodePositionX][finishNodePositionY]
        const visitedNodesInOrder = bfs(grid, startNode, finishNode)
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
        animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder, speedValues[speed])
    }
    catch(err) {
       raiseNodeRangeError()
    }
}

export const visualizeDFS = (state) => {
    try {
        const { grid, 
                startNodePositionX,
                startNodePositionY,
                finishNodePositionX,
                finishNodePositionY,
                speed } = state

        const startNode = grid[startNodePositionX][startNodePositionY]
        const finishNode = grid[finishNodePositionX][finishNodePositionY]
        const visitedNodesInOrder = dfs(grid, startNode, finishNode)
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
        animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder, speedValues[speed])
    }
    catch(err) {
       raiseNodeRangeError()
    }
}

const raiseNodeRangeError = (state) => {
    const { startNodePositionX,
            startNodePositionY,
            finishNodePositionX,
            finishNodePositionY,
            gridSizeX,
            gridSizeY } = state

    if ((finishNodePositionX >= gridSizeX || finishNodePositionY >= gridSizeY) &&
    (startNodePositionX >= gridSizeX || startNodePositionY >= gridSizeY)){
        alert("Start Node and Finish Node is not in the grid! Resize grid or move Start Node and Finish Node into range.")
        return true
    }

    if (finishNodePositionX >= gridSizeX || finishNodePositionY >= gridSizeY) {
            alert("Finish Node is not in the grid! Resize grid or move Finish Node into range.")
            return true
        }
       
    if (startNodePositionX >= gridSizeX || startNodePositionY >= gridSizeY) {
        alert("Start Node is not in the grid! Resize grid or move Start Node into range.")
        return true
    }

    return false
}