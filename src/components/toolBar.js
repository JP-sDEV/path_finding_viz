import React from "react";
import { Toolbar, AppBar, Container, Typography } from '@mui/material';
import { Options } from "./options"
import {SliderOptions} from "./sliderOptions"
import {GoButton } from "./goButton";
import algo from "../imgs/algo.png"
import github from "../imgs/github.png"
import { ResetButton } from "./resetButton";
import "../App.css"

export const ToolBar = () => {

    const algoOptions = ["Dijkstra", "BFS", "DFS"]
    const speedOptions = ["slow", "normal", "fast"]

    return (
        <AppBar position="static" color="transparent">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                
                <img src={algo} id="algo"/>
                <Typography
                    variant="h6" 
                    color="inherit"
                    >
                        PATH FINDER
                </Typography>

                <div className="AppBar">
                    <div className="Options">                        
                        <Options choices={algoOptions} optionName="algorithm" />    
                        <SliderOptions />
                        <Options choices={speedOptions} optionName="speed"/>
                    </div>

                    <div className="Buttons">
                        <GoButton />    
                        <ResetButton />
                    </div>

                </div>

                <a href="https://github.com/JP-sDEV/path_finding_viz">
                    <img src={github} id="github"/>
                </a>
                
                
                </Toolbar>
            </Container>
        </AppBar>
    )

}