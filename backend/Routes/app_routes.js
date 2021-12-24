const router = require("express").Router()
const AppControler = require("../controllers/AppControllers")

//helpers


router.get("/",(req,res)=>{

    res.send("Bem vindo ao Orçamento para pinturas")

})

router.get("/calcular",AppControler.calcTintaPintura)



module.exports = router