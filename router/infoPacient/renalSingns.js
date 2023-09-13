const express = require("express")
const md_auth = require("../../middlewares/authenticated");
const renalController = require("../../controllers/infoPacient/renalSingns") 

const api= express.Router()

api.post("/renal/:id",[md_auth.asureAuth],renalController.registerRenal)
api.get("/get/renals",[md_auth.asureAuth],renalController.getRenals)
api.get("/get/renal/:id",[md_auth.asureAuth],renalController.getRenal)
api.patch("/renal/:id",[md_auth.asureAuth],renalController.updateRenal)
api.delete("/renal/:id",[md_auth.asureAuth],renalController.deleteRenal)

module.exports=api