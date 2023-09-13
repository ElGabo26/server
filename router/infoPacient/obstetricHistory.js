const express = require("express")
const md_auth = require("../../middlewares/authenticated");
const obstetricController = require("../../controllers/infoPacient/obstetricHistory") 

const api= express.Router()

api.post("/obstetric/:id",[md_auth.asureAuth],obstetricController.registerObstetric)
api.get("/get/obstetrics",[md_auth.asureAuth],obstetricController.getObstetrics)
api.get("/get/obstetric/:id",[md_auth.asureAuth],obstetricController.getObstetric)
api.patch("/obstetric/:id",[md_auth.asureAuth],obstetricController.updateObstetric)
api.delete("/obstetric/:id",[md_auth.asureAuth],obstetricController.deleteObstetric)

module.exports=api