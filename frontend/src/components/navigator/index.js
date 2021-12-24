import React from "react"
import FormCalc from "../form"
import Results from "../results"

import "./index.css"
import Context from './../context/';


const Navigator = () => {

    const [dataCalc,setDataCalc] = React.useState([])
    const [calcular,setCalcular] = React.useState(false)

    return (
        <div className="container">

            <Context.Provider value={{dataCalc,setDataCalc,calcular,setCalcular}}>
                <FormCalc />
                <Results />
            </Context.Provider>
        </div>

    )
}

export default Navigator