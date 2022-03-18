import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context";
import { Button, Tooltip } from '@mui/material';
import "../App.css"

export const ResetButton = () => {
    const { state: [state, setState] } = useContext(AppContext)

    const reset = () => {
        clearBoardPath()
        setState({
            ...state,
            grid: getInitGrid(),
            mouseIsPressed: false,
            changeStart: false,
            changeFinish: false
        })
    }

    const getInitGrid = () => {
        const { gridSizeX,
                 gridSizeY } = state

        const grid = [];
        for (let row = 0; row < gridSizeX; row++) {
            const currentRow = []
            for (let col = 0; col < gridSizeY; col++) {
                currentRow.push(createNode(col, row));
            }
            grid.push(currentRow)
        }
        return grid
    }

    const createNode = (col, row) => {
        const { startNodePositionX,
            startNodePositionY, 
            finishNodePositionX, 
            finishNodePositionY } = state

        return ({
            col,
            row,
            isStart: row === startNodePositionX && col === startNodePositionY,
            isFinish: row === finishNodePositionX && col === finishNodePositionY,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null
        })
    }

    const clearBoardPath = () => {
        for (let row = 0; row < state.gridSizeX; row++) {
            for (let col = 0; col < state.gridSizeY; col++) {
                let n = document.getElementById(`node-${row}-${col}`);
                if(n && (n.className === 'node node-visited' || n.className === 'node node-shortest-path')){
                    n.className = 'node';
                }
            }
        }
    }

    return (
        <Button onClick={() => reset()} color="error">Reset</Button>
    )
}