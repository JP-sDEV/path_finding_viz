import React, { useState, useEffect, useRef, useContext } from "react";
import { Popover, Typography, Box, Button, MenuList, Slider } from '@mui/material';
import { AppContext } from "../context"
import "../App.css"
export const SliderOptions = (props) => {
    const { state: [state, setState] } = useContext(AppContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleGridChange = (newX=state.gridSizeX, newY=state.gridSizeY) => {
        if (newX) {
            setState({
                ...state,
                gridSizeX: newX
            })
        }
        
        if (newY) {
            setState({
                ...state,
                gridSizeY: newY
            })
        }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <div>
        <Button aria-describedby={id} variant="text" onClick={handleClick}>
          <div className="OptionText">
          {`GRID SIZE: 
                    ${state.gridSizeX} x ${state.gridSizeY}`}

          </div>
        </Button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}>

            <div className="SliderMenu">
              <MenuList >
                  
                  Rows: {state.gridSizeX}
                  <Slider
                      size="small"
                      min={5}
                      max={35}
                      defaultValue={state.gridSizeX}
                      onChange={e => handleGridChange(e.target.value, null)}
                      aria-label="Small"
                      valueLabelDisplay="auto"
                      value={state.gridSizeX} />

                  Columns: {state.gridSizeY}
                  <Slider
                      size="small"
                      min={5}
                      max={35}
                      defaultValue={state.gridSizeY}
                      onChange={e => handleGridChange(null, e.target.value)}
                      aria-label="Small"
                      valueLabelDisplay="auto"
                      value={state.gridSizeY} />

              </MenuList>
          </div>
        </Popover>
      </div>
    );
  }