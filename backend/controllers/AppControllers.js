const UserModel = require("../models/TintaPorGalao")
const {AreaPintura,QuantidadeLitrosTinta} = require("../helpers/functions")

module.exports = class AppController{

    static async calcTintaPintura(req, res) {


        
        try{
            
            const { quantidadeParedes, altura, largura, portas, janelas } = req.query;
            //console.log(req.query)
            
            var areaParaPintura = await AreaPintura(quantidadeParedes, altura, largura, portas, janelas);
            
            if (isNaN(areaParaPintura[areaParaPintura])) {
                
                const galoesDeTintas = await QuantidadeLitrosTinta(areaParaPintura)
                res.status(200).send({ areaParaPintura,galoesDeTintas });
                return ({ areaParaPintura, galoesDeTintas })

            } else {
                
                res.status(401).send({ areaParaPintura });
                return              
                
            }
            
        }catch(err){
            
            res.status(410).send({message:"Erro de requisição" });

        };


    }

}