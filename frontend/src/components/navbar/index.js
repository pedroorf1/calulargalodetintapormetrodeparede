import React from "react"
import 'material-icons/iconfont/material-icons.css';

import "./index.css"

const Navbar = () =>{


    return(
    
        <div className="navbar">
            <div className="header">
                <span className="material-icons">pie_chart</span>
                <div className="titulo">
                    <span className="t">T</span>
                    <span className="i">I</span>
                    <span className="n">N</span>
                    <span className="t2">T</span>
                    <span className="registered"><sup>&reg;</sup></span>
                </div>
                <span>calcule a tinta que você vai precisar.</span>
            </div>
    
        </div>
        
    )
}

export default Navbar