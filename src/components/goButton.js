import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context";
import { Button, Tooltip } from '@mui/material';
import { visualizeDijkstra, visualizeBFS, visualizeDFS } from "../HelperFunctions/algoViz";

export const GoButton = () => {
    const { state: [state] } = useContext(AppContext)

    const [disableText, setDisableText] = useState("")

    const handleSubmit = () => {

        const { algorithm } = state

        if (algorithm === "Dijkstra") {
            visualizeDijkstra(state)
        }

        if (algorithm === "BFS") {
            visualizeBFS(state)
        }

        if (algorithm === "DFS") {
            visualizeDFS(state)
        }
    }

    const handleDisableText = () => {
        if (!state.algorithm && !state.speed) {
            setDisableText("Select Algorithm, and Speed")
        }

        else if (!state.algorithm && state.speed) {
             setDisableText("Select Algorithm")
        }

        else if (state.algorithm && !state.speed) {
             setDisableText("Select Speed")
        }

    }

    useEffect(() => {
        handleDisableText()
    }, [state.algorithm, state.speed])

    return (
        <div>
            {(!state.algorithm || !state.speed) ?
            <div>
                <Tooltip title={disableText}>
                    <span>
                        <Button disabled>START</Button>
                    </span>
                </Tooltip>
            </div>
            :
            <Button onClick={handleSubmit}  color="success">START</Button> }
            
        </div>
    )
}