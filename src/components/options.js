import React, { useContext } from "react";
import { Popover, Button, MenuList, MenuItem } from '@mui/material';
import { AppContext } from "../context"
import "../App.css"

export const Options = (props) => {
    const { state: [state, setState] } = useContext(AppContext)
    const { choices, optionName } = props
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleSelect = (e) => {
        const userSelect = e.target.textContent
        setState({
            ...state,
            [optionName]: userSelect
        })

        handleClose()
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <div>
        <Button aria-describedby={id} variant="text" onClick={handleClick}>
          <div className="OptionText">
                              {state[optionName] ? `${optionName}:  
                                                  ${state[optionName]}` 
                                                  : 
                                                  `${optionName}`}

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

            <MenuList >
                    {choices.map((c, id) => {
                        return (
                            <MenuItem key={id} onClick={e => handleSelect(e)}>{c}</MenuItem>
                        )
                    })}
            </MenuList>
        </Popover>
      </div>
    );
  }