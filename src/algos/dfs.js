function dfs(grid, start, end) {
    for(let r = 0; r < grid.length; r++) {
        for(let c = 0; c < grid[0].length; c++) {
            if(grid[r][c] === '1') {
                callDFS(r, c);
            }
        }
    }
}