module.exports = class functions{

            //CALCULA DA AREA QUE VAI RECEBER PINTURA
            static async AreaPintura(quantiParedes=0,altura=0.0,largura=0.0, portas=0,janelas=0){
                
                //areas de janelas e portas
                const areaDeJanela = (2.00 * 1.20);
                const areaDePorta = (0.80 * 1.90);

                //recebe e trata as variaveis
                var qtdJanelas = parseInt(janelas);
                var qtdPortas = parseInt(portas);
                var areaJanelas = 0;
                var areaPortas = 0;
                var NaoRecebePintura = 0;
                var err =''

                //testa se existem janelas ou portas e adiciona suas areas a variavel NaoRecebePintura
                if (qtdJanelas>0) {
                    areaJanelas = areaDeJanela * qtdJanelas;
                    NaoRecebePintura += areaJanelas;
                }
                if (qtdPortas>0) {
                    areaPortas = areaDePorta * qtdPortas;
                    NaoRecebePintura += areaPortas;
                }


                //console.log("Altura ",altura," - Largura ",largura," - Paredes",quantiParedes)

                const areaTotal = ((altura * largura) * quantiParedes).toFixed(2)
                

                /*
                ==================================================================================
                VERIFICA SE A REGRA DA ALTURA DAS PAREDES EM RELAÇÃO AS PORTAS
                ESTÁ SENDO OBEDECIDA
                ==================================================================================
                0  - VERIFICAR SE PAREDES TEM MAIS DE 1 < MENTROS^2 > 15
                1 - VERIFICAR SE AS PAREDES TEM MAIS QUE 30mc DE ALTURA
                2 - VERIFICA SE EXISTEM PORTAS OU JANELAS NA AREA DE CALCULO
                3 - VERIFICA SE AS PAREDES ESTÃO 30cm ACIMA DA ALTURA DAS PORTAS/JANELAS
                4 - VERIFICA SE A AREA TOTAL DE PORTAS E JANELAS SÃO NO MAXIMO 50% DA AREA DE PAREDES
                5 - ALTURA DA PORTA=1.9M + 0.30M = 2.2M QUE DEVE SER A ALTURA MINIMA PARA PAREDES
                    COM PORTAS OU JANELAS
                */
               
               //VERIFICA A SE A QUANTIDADE DE PAREDES É MAIOR OU IGUAL A 1
                   if(quantiParedes < 1 ){
                   
                       return ({ message: "A quantidade mínima de paredes para o calculo é 1. Foram encontradas: "+quantiParedes+" paredes"});

                   }

                    //REGRA :1

                    if(altura < 0.3){
                        
                        return ({ message: "A altura das paredes dever ser maior que 30cm onde não existema janelas ou portas. Altura encontrada: "+altura+"m"});

                    }


                var relacao_RecebePintura_NaoRecebePintura = (NaoRecebePintura / areaTotal).toFixed(2)
                
                //console.log(relacao_RecebePintura_NaoRecebePintura)

                //REGRA :2
                if (portas != 0 || janelas != 0) {
                    
                    //REGRA :3 E :5
                    if (altura <= 2.2) {
                       
                        return ({ message: "Algumas paredes estão menores que 2.2m que é a altura mínima necessária onde existam janelas ou portas." });
                     }

                     //REGRA :4
                    if (relacao_RecebePintura_NaoRecebePintura > 0.5) {
                       
                       return({ message: "A quantidade de área para pintura está menor que 50% em relação area de portas e janelas." });

                    }


                }//FIM DA REGRA DAS ALTURAS E ÁREAS DE PORTAS, JANELAS E PAREDES
    
                /**descontando as areas que não recebem pintura*/
                const areaDePintura = areaTotal - NaoRecebePintura

                    //--->REGRA :0

                    if(1 > areaDePintura || areaDePintura > 15){
                        
                        return ({ message: "A area de pintura deve ficar entre 1m^2 e 15m^2. Áera encontrada: "+areaDePintura+"m^2"});

                    }

                
                
            return areaDePintura.toFixed(2)
    }
    
    /**CALCULA A QUANTIDADE LITROS DE TINTA POR AREA DE PINTURA*/
    static async QuantidadeLitrosTinta(areaDePintura=0.0) {
        
        const area = parseFloat(areaDePintura)
        var areaRestante = area.toFixed(2)/**sera o repositorio do resto da divisao*/
        var tintasParaPintura = []/**REPO PARA OS TIPOS E QUANTIDADES DE TINTAS CALCULADOS*/

        /**
        0,5 litros = 2,5 metros de pintura; 
        2,5 litros = 12,5 metros de pintura;
        3,6 litros = 18 metros de pintura;
        18 litros = 90 metros de pintura;
        */

        /**ARRAY DE OBJETOS COM DADOS PARA CALCULAR OS GALOES DE TINTAS*/
        const tintPMetro = [
            { galao: "18L", area: 90.0 },
            { galao: "3,6L", area: 18.0 },
            { galao: "2,5L", area: 12.5 },
            { galao: "0,5L", area: 2.5 },
        ]

        /**A IDEIA É PASSAR POR TODOS OS OBJETOS VERICANDO SE A AREA QUE PRECISA DE TINTA
        É MAIOR QUE A AREA DE PINTURA DE CADA TIPO DE GALAO DE TINTA, CASO SEJA MAIOR PEGA-SE
        O INTEIRO DA DIVISÃO E O RESTO, O INTEIRO É A QUANTIDADE DE GALÕES DO MODELO DE TINTA TESTADO
        O RESTO DA DIVISÃO SE TORNA A PROXIMA ÁREA A SER TESTADA AGORA COM OS GALÕES MENORES DE TINTA */
        tintPMetro.map((obj) => {
             
            if (obj.area <= areaRestante) {
                
                let litros = Math.round(areaRestante/obj.area)
                areaRestante = (areaRestante % obj.area).toFixed(2)
                obj["quantidade"] = litros;
               
                tintasParaPintura.push(obj);
                
            }
        })
        /**verificando se ainda há rea de pintura se receber tinta
        *criando um galão 2,5l caso o numero de galões de 0,5l passe de 4 unidades
        *DEVIDO AS LIMITAÇÕES DAS REGRAS DE NEGÓCIO ESSE APP NUNCA PARESENTARÁ GALÕES ACIMA DE 2,5L
        */

        if(areaRestante>0 && areaRestante<tintPMetro[tintPMetro.length -1].area){

             //console.log("Area restande ",areaRestante)

             tintasParaPintura.find((galoes,index,obj)=>{

              if(galoes.galao==="2,5L"){

                tintasParaPintura[index].quantidade += 1

              }else{

                  if(tintasParaPintura[tintasParaPintura.length - 1].quantidade>4){
      
                      tintasParaPintura[tintasParaPintura.length - 1].quantidade -=4
                      
                      var novoGalao = { galao: "2,5L", area: 12.5, quantidade: 1 }
    
                      tintasParaPintura.push(novoGalao)
                  }

              }


            })
            //==========================================================================
            
            
            /**ORDENANDO O ARRAY PARA APARECEREM OS GALÕES MAIORES PRIMEIRO*/
            var passagem = []
            tintasParaPintura.map((galao,index,obj)=>{

                if(tintasParaPintura.length>1 && index>0){
                    
                    if(galao.area > tintasParaPintura[index - 1].area){

                        passagem = tintasParaPintura[index - 1]
                        tintasParaPintura[index - 1] = tintasParaPintura[index]
                        tintasParaPintura[index] = passagem
                    }
                    
                    
                }

            })
        }


       // console.log("AMOSTRA FINAL DO ARRAY ",tintasParaPintura)

            /**CASO SOBRE AREA MENOR QUE A COBERTA PELO MENOR GALÃO DE TINTA, SE ADICIONA UM GALÃO DE TINTA DO
            MENOR A QUANTIDADE DE GALÕES NECESSÁRIOS*/
            
        return tintasParaPintura
    }

}