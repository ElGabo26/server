const express = require("express")
const md_auth = require("../../middlewares/authenticated");
const hepaticController = require("../../controllers/infoPacient/hepaticTest") 

const api= express.Router()

api.post("/hepatic/:id",[md_auth.asureAuth],hepaticController.registerHepatic)
api.get("/get/hepatics",[md_auth.asureAuth],hepaticController.getHepatics)
api.get("/get/hepatic/:id",[md_auth.asureAuth],hepaticController.getHepatic)
api.patch("/hepatic/:id",[md_auth.asureAuth],hepaticController.updateHepatic)
api.delete("/hepatic/:id",[md_auth.asureAuth],hepaticController.deleteHepatic)

module.exports=api