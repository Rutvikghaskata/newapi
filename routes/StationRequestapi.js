const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const jwt = require('jsonwebtoken')
const jwtKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ1.eyJ1c2VySWQiOiI2MWJjNWRlMzEyODRlN2ZjYTM3OGMwMzAiLCJpYXQiOjE2Mzk3MzQ3NTV1.bHygAPHN6AUUldKvEyvLLdtWvjGYPdaxjtrPnYw88Vo"
require("../models/StationRequest")
const StationRequest = mongoose.model('StationRequest')

router.get('/stationRequest',(req,res)=>{
   StationRequest.find().then((data)=>{
           res.status(200).json(data);
    })   
})
router.get('/stationRequest/:ownerId', async (req,res)=>{
   try{           
         const station = await StationRequest.find({ ownerId: req.params.ownerId});
         res.status(200).json(station);
      }
   catch(err)
     {
         res.send(err.message)
     }
})
   

router.post('/addStationRequest',async (req,res)=>{
   
       const { ownerId,ownerName, StationName,ContactNo,address,city,state,pincode,openingTime,closeTime,StationCertificate,StationImage,AdharCardNo} = req.body;   
   
       try{
      
       const station = new StationRequest({ownerId,ownerName, StationName,ContactNo,address,city,state,pincode,openingTime,closeTime,StationCertificate,StationImage,AdharCardNo}); 
       station.save();
    //    const token = jwt.sign({userId:station._id},jwtKey)  
       res.send({station})
    }catch(err){
      return res.status(422).send(err.message)
    }
    
    
})
module.exports= router