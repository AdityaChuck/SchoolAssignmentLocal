const express = require("express")
const routing = express.Router();
const service = require("../service/test")

routing.post("/createAdmission",(req,res,next)=>{
    let obj = req.body
    service.createAdmission(obj).then(data =>{
        if(data){
            res.json({message : `Candidate added to the list`})
        }
    }).catch(err => next(err))
})

routing.post("/createResult",(req,res,next) => {
    let obj = req.body
    service.createResult(obj).then(data => {
        if(data){
            res.json({message : `Student's result added to the board`})
        }
    }).catch(err => next(err))
})

routing.get('/getAdmissions', (req,res,next) => {
    service.getAdmissions().then(data => {
        if(data && data.length!==0){
            res.json({message:data})
        }
    }).catch(err => next(err))
})

routing.get('/getResults', (req,res,next) => {
    service.getResults().then(data => {
        if(data && data.length!==0){
            res.json({message:data})
        }
    }).catch(err => next(err))
})

module.exports = routing