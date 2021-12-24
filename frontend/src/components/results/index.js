import React, { useContext, useState } from 'react';
import "./index.css"


import LineResult from '../resultLines';
import api from '../../api/'
import Context from "../../components/context"

const Results = () => {

    const dadosContexto = useContext(Context)

    /**MODULO GARANTE O ZERO INICIO DA UI*/
    var resultados = [{

        "areaParaPintura": 0.0,
        "galoesDeTintas": [
            {
                "galao": "0,0",
                "area": 0,
                "quantidade": 0
            }
        ]

    }]
    
    /**CONTROLES DE ESTADO
     * SETA OS ESTADOS DA MENSAGEM
     * SETA O ESTADO DOS DADOS NO ESATDO CALCULADO
    */
    const [calculado,setCalculado] = useState([])
    const [message,setMessage] = useState([])
    const [showhide,setShowhide] = useState("hide")


    /**ESCUTANDO A SE EXISTEM DADOS PARA O NO BACKEND CALCULO
     * APLICA OS DADOS NA VAR PESQUISA CASO OS DADOS EXISTEAM
     * 
     * */
    
    var pesquisa = dadosContexto.dataCalc
    console.log(pesquisa)
    
    React.useEffect(()=>{
     
      const reqCalc = async ()=>{

        try{

            await api.get("/calcular",{params:pesquisa.data})
                .then((response)=>{
                    
                    /**VERIFICA SEM VEM UMA MENSAGEM OU OS DADOS DO BACKEND
                     * SENDO MESAGEM EXITEBE
                     * SENDO OS RESULTADOS DO CALCULO EXIBE
                     * 
                    */
                    if(response.data.areaParaPintura.message!==undefined){
                       setMessage(response.data.areaParaPintura.message)
                        setCalculado(resultados)
                        setShowhide("show")
                    }else{
                        
                        setCalculado(response.data)
                        setMessage(undefined)
                        setShowhide("hide")
                    }

                }).catch((err)=>{
                    
                })
               
                return calculado
        }catch(eeer){

            console.log(eeer)

        }

      }  
      
      reqCalc();
      
    },[dadosContexto.calcular])

    //================================

    
          return(
          <>
            
            <div className="rests">

                <div className="imgGalao" ></div>
                <div className="areaTotal" >
                   
                    <span>
                        ÁREA PARA PINTURA {calculado.areaParaPintura}m<sup>2</sup>
                    </span>
                </div>
            
                {
                    calculado.galoesDeTintas?.map((cacl,index)=>(

                        <LineResult quantidade={cacl} id={index}/>

                        )
                    )
                }
       
                    <div className={showhide}>
                        <div className="app-messag">
                        <span className='material-icons'>assignment_late</span>
                            {message}
                        </div>
                    </div>
 
            </div>
            </>
          )
    
    

}



export default Results
