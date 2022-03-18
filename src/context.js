import React, { useState } from "react";

export const AppContext = React.createContext(null)

export default ({children}) => {

    const [state, setState] = useState({ 
        grid: [],
        mouseIsPressed: false,
        changeStart: false,
        changeFinish: false,
        startNodePositionX: 10,
        startNodePositionY: 5,
        finishNodePositionX: 4,
        finishNodePositionY: 10,
        gridSizeX: 20,
        gridSizeY: 50,
        speed: null,
        algorithm: null
    });

    const store = {
        state: [state, setState]
    }

    return <AppContext.Provider value={store}>{children}</AppContext.Provider>

}

