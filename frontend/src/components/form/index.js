import React from "react"
import Context from "../context"


import "./index.css"

/*
OS DADOS DO FORMULARIO SÃO COLETADOS E ENVIADOS PARA O CONTEXTO E COLETADO NO MODULO RESULTS
UMA STATE CAULCULAR FOI CRIADO PARA COTROLAR O EFFECT DO ENVIO NO MODULO RESULTS
*/

const FormCalc = () => {

    const dadosContexto = React.useContext(Context)

    const handleSubmith = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        data.quantidadeParedes = parseInt(data.quantidadeParedes)
        data.altura = parseFloat(data.altura)
        data.largura = parseFloat(data.largura)
        data.janelas = parseInt(data.janelas)
        data.portas = parseInt(data.portas)

        await dadosContexto.setDataCalc({ data })
        dadosContexto.setCalcular(!dadosContexto.calcular)


    }

    return (

        <div className="form">

            <form onSubmit={handleSubmith}>

                <div className="lblInputs">Quantidade de Paredes com essas medidas:</div>
                <input type="number" name="quantidadeParedes" placeholder="Quantidade de Paredes" defaultValue='0'></input>

                <div className="lblInputs">Altura da(s) Paredes (superios a 30cm para paredes sem janelas e/ou portas):</div>
                <input type="number" name="altura" placeholder="Altura" defaultValue='0.0' step="any"></input>

                <div className="lblInputs">Largura das Paredes:</div>
                <input type="number" name="largura" placeholder="Largura" defaultValue='0.0' step="any"></input>

                <div className="lblInputs">Quantidade de janelas ('0' zero se não hover janelas ):</div>
                <input type="number" name="janelas" placeholder="Quantidade de janelas" defaultValue='0'></input>

                <div className="lblInputs">Quantidade de portas ('0' zero se não hover janelas ):</div>
                <input type="number" name="portas" placeholder="Quantidade de portas" defaultValue='0'></input>

                <button type="submit" className="btnPrimary" >Calcular</button>


            </form>

        </div>

    )
}
export default FormCalc