const express = require("express")
const md_auth = require("../../middlewares/authenticated");
const symptomsController = require("../../controllers/infoPacient/symptoms") 

const api= express.Router()

api.post("/symptoms/:id",[md_auth.asureAuth],symptomsController.registerSymptoms)
api.get("/get/symptomss",[md_auth.asureAuth],symptomsController.getSymptomss)
api.get("/get/symptoms/:id",[md_auth.asureAuth],symptomsController.getSymptoms)
api.patch("/symptoms/:id",[md_auth.asureAuth],symptomsController.updateSymptoms)
api.delete("/symptoms/:id",[md_auth.asureAuth],symptomsController.deleteSymptoms)

module.exports=api