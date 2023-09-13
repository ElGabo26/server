const express = require("express")
const md_auth = require("../../middlewares/authenticated");
const fetalTestController = require("../../controllers/infoPacient/fetalTest") 

const api= express.Router()

api.post("/fetalTest/:id",[md_auth.asureAuth],fetalTestController.registerFetalTest)
api.get("/get/fetalTests",[md_auth.asureAuth],fetalTestController.getFetalTests)
api.get("/get/fetalTest/:id",[md_auth.asureAuth],fetalTestController.getFetalTest)
api.patch("/fetalTest/:id",[md_auth.asureAuth],fetalTestController.updateFetalTest)
api.delete("/fetalTest/:id",[md_auth.asureAuth],fetalTestController.deleteFetalTest)

module.exports=api