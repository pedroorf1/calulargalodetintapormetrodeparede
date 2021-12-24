import React from 'react';

import "./index.css"

const LineResult = ({quantidade,id})=>{


    return (
 
        <div   key={id}>
            <div className="descLine">

                <p>GALÃO DE {quantidade.galao}</p>
                <p>QUANTIDADE: {quantidade.quantidade}</p>
                    
            </div>

        </div>

        
    )

}

export default LineResult