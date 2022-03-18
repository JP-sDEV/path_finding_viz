export const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder, speed) => {
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length-1) {
          setTimeout(() => {
            animateShortestPath(nodesInShortestPathOrder, speed);
          }, speed * i);
          return;
        }
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }, speed * i);
      }
}

const animateShortestPath = (nodesInShortestPathOrder, speed) => {
    for (let i = 1; i < nodesInShortestPathOrder.length-1; i++) {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
        },(speed+25) * i);
      }
} 