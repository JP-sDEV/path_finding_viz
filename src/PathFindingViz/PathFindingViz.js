import React, { useEffect, useContext } from "react";
import { Node } from "./Node/Node";
import { ToolBar } from "../components/toolBar";
import { AppContext } from "../context";

import "./PathFinding.css";
import "../App.css"

export const PathFindingViz = () => {

    const { state: [state, setState] } = useContext(AppContext)

    const handleMouseDown = (row, col) => {
        const { startNodePositionX,
                startNodePositionY, 
                finishNodePositionX, 
                finishNodePositionY } = state

        if (row === startNodePositionX && col === startNodePositionY) {
            setState({
                ...state,
                changeStart: true
            })
        }

        else if (row === finishNodePositionX && col === finishNodePositionY) {
            setState({
                ...state, 
                changeFinish: true
            })
        }

        else {
            const newGrid = getGridWithWall(row, col)
            setState({
                ...state,
                grid: newGrid,
                mouseIsPressed: true
            })
        }  
    }

    const handleMouseEnter = (row, col) => {

        const { grid, 
                startNodePositionX, 
                startNodePositionY, 
                finishNodePositionX,
                finishNodePositionY,
                changeStart,
                changeFinish,
                mouseIsPressed } = state

        if (mouseIsPressed) {
        const newGrid = getGridWithWall(row, col)
        setState({
            ...state,
            grid: newGrid
        })
            }

        else if (changeStart && !(row === startNodePositionX && col === startNodePositionY)){
            const start = document.getElementById(`node-${startNodePositionX}-${startNodePositionY}`)

            if (start) {
                start.className = "node"
                start.isStart = false
                grid[startNodePositionX][startNodePositionY].isStart = false
            }

            const newStart = document.getElementById(`node-${row}-${col}`)
            
            if (newStart) {
                newStart.isStart = true
                newStart.className = ".node-start"
                grid[row][col].isStart = true
            }

            setState({
                ...state, 
                startNodePositionX: row,
                startNodePositionY: col
            })
        }
        
        else if (changeFinish && !(row === finishNodePositionX && col === finishNodePositionY)){
            const finish = document.getElementById(`node-${finishNodePositionX}-${finishNodePositionY}`)

            if (finish) {
                finish.className = "node"
                finish.isFinish = false
                grid[finishNodePositionX][finishNodePositionY].isFinish = false
            }

            const newFinish = document.getElementById(`node-${row}-${col}`)
            
            if (newFinish) {
                newFinish.isStart = true
                newFinish.className = ".node-start"
                grid[row][col].isFinish = true
            }

            setState({
                ...state, 
                finishNodePositionX: row,
                finishNodePositionY: col
            })
        }

    }

    const handleMouseUp = () => {

        setState({
            ...state,
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

    const getGridWithWall = ( row, col) => {

        const { grid } = state

        const newGrid = grid.slice()
        const node = grid[row][col]
        const newNode = {
            ...node,
            isWall: !node.isWall
        }
        grid[row][col] = newNode

        return newGrid
    }

    useEffect(() => {
        const newGrid = getInitGrid()
        setState(prevState =>({
            ...prevState,
            grid: newGrid
        })) 
    }, [state.gridSizeX, state.gridSizeY])

    const { grid,
            mouseIsPressed } = state

    return (
        
        <div>
            <ToolBar />
            <div className="grid">
                        {grid.map((row, rowIdx) => {
                            return (
                                <div key={rowIdx}>
                                    {row.map((node, nodeIdx) => {
                                        const { row, col, isFinish, isStart, isWall } = node
                                        return (
                                            <Node
                                                key = {nodeIdx}
                                                col = {col}
                                                isWall = {isWall}
                                                isFinish = {isFinish}
                                                isStart = {isStart}
                                                mouseIsPressed = {mouseIsPressed}
                                                onMouseDown = {(row, col) => handleMouseDown(row, col)}
                                                onMouseEnter = {(row, col) => handleMouseEnter(row, col)}
                                                onMouseUp = {() => handleMouseUp()}
                                                row = {row}
                                            ></Node>
                                        )
                                    })}
                                </div>
                            )
                        })}
                </div>
        </div>
    )
}