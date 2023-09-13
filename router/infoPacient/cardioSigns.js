const express = require("express")
const md_auth = require("../../middlewares/authenticated");
const cardioSings = require("../../controllers/infoPacient/cardioSigns") 


const api= express.Router()

api.post("/cardio/:id",[md_auth.asureAuth],cardioSings.registerCardio)
api.get("/get/cardios",[md_auth.asureAuth],cardioSings.getCardios)
api.get("/get/cardio/:id",[md_auth.asureAuth],cardioSings.getCardio)
api.patch("/cardio/:id",[md_auth.asureAuth],cardioSings.updateCardio)
api.delete("/cardio/:id",[md_auth.asureAuth],cardioSings.deleteCardio)

module.exports=api