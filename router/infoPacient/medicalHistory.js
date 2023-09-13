const express = require("express")
const md_auth = require("../../middlewares/authenticated");
const historyController = require("../../controllers/infoPacient/medicalHistory") 

const api= express.Router()

api.post("/history/:id",[md_auth.asureAuth],historyController.registerHistory)
api.get("/get/historys",[md_auth.asureAuth],historyController.getHistorys)
api.get("/get/history/:id",[md_auth.asureAuth],historyController.getHistory)
api.patch("/history/:id",[md_auth.asureAuth],historyController.updateHistory)
api.delete("/history/:id",[md_auth.asureAuth],historyController.deleteHistory)

module.exports=api