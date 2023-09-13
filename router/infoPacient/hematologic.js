const express = require("express")
const md_auth = require("../../middlewares/authenticated");
const hematologicController = require("../../controllers/infoPacient/hematologic") 

const api= express.Router()

api.post("/hematologic/:id",[md_auth.asureAuth],hematologicController.registerHematologic)
api.get("/get/hematologics",[md_auth.asureAuth],hematologicController.getHematologics)
api.get("/get/hematologic/:id",[md_auth.asureAuth],hematologicController.getHematologic)
api.patch("/hematologic/:id",[md_auth.asureAuth],hematologicController.updateHematologic)
api.delete("/hematologic/:id",[md_auth.asureAuth],hematologicController.deleteHematologic)

module.exports=api