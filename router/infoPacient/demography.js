const express = require("express")
const md_auth = require("../../middlewares/authenticated");
const demographyController = require("../../controllers/infoPacient/demography") 

const api= express.Router()

api.post("/demography/:id",[md_auth.asureAuth],demographyController.registerDemography)
api.get("/get/demographys",[md_auth.asureAuth],demographyController.getDemographys)
api.get("/get/demography/:id",[md_auth.asureAuth],demographyController.getDemography)
api.patch("/demography/:id",[md_auth.asureAuth],demographyController.updateDemography)
api.delete("/demography/:id",[md_auth.asureAuth],demographyController.deleteDemography)

module.exports=api