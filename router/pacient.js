const express= require("express");
const md_auth = require("../middlewares/authenticated");
const PacientController =require("../controllers/pacient");


const api=express.Router()

api.post("/create/patient",[md_auth.asureAuth],PacientController.createPacient)
api.get("/patient/patients",[md_auth.asureAuth],PacientController.getPacients)
api.get("/patient/:id",[md_auth.asureAuth],PacientController.getPacient)
api.patch("/patient/:id",[md_auth.asureAuth],PacientController.updatePacient)
api.delete("/patient/:id",[md_auth.asureAuth],PacientController.deletePacient)

module.exports=api