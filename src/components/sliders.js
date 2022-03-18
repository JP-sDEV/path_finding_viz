import React, { useState, useEffect, useRef } from "react";
import { Button, MenuList, Stack, Paper, Popper, ClickAwayListener, Grow, Slider } from '@mui/material';

export const Sliders = () => {
    const [open, setOpen] = useState(false)
    const anchorRef = useRef(null)

    const handleClose = (e) => {
        if(anchorRef.current && anchorRef.current.contains(e.target)) {
            return;
        }
        setOpen(false)
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }
    // const handleListKeyDown = (e) => {
    //     if (e.key === "Tab") {
    //         e.preventDefault()
    //         setOpen(false)
    //     }
    //     else if (e.key === "Escape") {
    //         setOpen(false)
    //     }
    // }

    const prevOpen = useRef(open)
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus()
        }

        prevOpen.current = open
    }, [open])

    return (
        <div>
            <Stack direction="row" spacing={2}>
                <Button 
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    >
                        {/* OPTIONS = STATE */}
                        SIZE
                </Button>
                <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                >

                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                
                                    <MenuList>
                                    <Slider
                                        size="small"
                                        min={5}
                                        max={35}
                                        // defaultValue={gridSizeX}
                                        // onChange={e => handleGridChange(e.target.value, null)}
                                        aria-label="Small"
                                        valueLabelDisplay="auto"
                                        // value={gridSizeX}
                                        /> Rows:

                                    <Slider
                                        size="small"
                                        min={5}
                                        max={35}
                                        // defaultValue={gridSizeY}
                                        // onChange={e => handleGridChange(null, e.target.value)}
                                        aria-label="Small"
                                        valueLabelDisplay="auto"
                                        // value={gridSizeY}
                                    /> Columns:

                                    </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Stack>
    </div>
)}