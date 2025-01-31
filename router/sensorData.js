const express = require("express");
const router = express.Router();
const WrapAsync = require("../utlis/wrapasync.js");
const ExpressError = require("../utlis/expresserror.js");
// requiring sensordata model
const sensorData = require("../models/sensorData.js");
// requiring sensordata schemas
const validateSensorData = require("../utlis/schema.js");
// Importing the dataRef from firebase.js
const { dataRef, get, child ,listenForRealTimeData} = require("./firebase.js"); 



// Get route for sensor Stored Data
router.get("/storedData",WrapAsync(async(req,res,next)=>{
    try{
    const sensorDatas = await sensorData.find({});
    res.render("sensordata/storeData.ejs",{sensorDatas});
    }catch(err){
        console.error("Sensor Data Get Route error:", err.message); // Debugging log
        next(err);
    }
}));

// Post route for sensor  stored data
router.post("/",WrapAsync(async(req,res,next)=>{
    try{
    const {error} = validateSensorData(req.body);
    if(error){
        throw new ExpressError(error.details.map(el=>el.message).join(","),400);
    }
    const data = new sensorData(req.body);
    await data.save();
    res.send(data);
    }catch(err){
        console.error("Sensor Data Post Route error:", err.message); // Debugging log
        next(err);
    }
}));

// Get route for real-time sensor data
router.get("/realTimeData", WrapAsync(async (req, res, next) => {
    try {
        // Use the onValue listener to fetch real-time data
        listenForRealTimeData((data) => {
            // Render the real-time data in EJS template
            res.render("sensordata/realTimeData.ejs", { data });
        });
    } catch (err) {
        console.error("Real-time Data Get Route error:", err.message);
        next(err);
    }
}));



module.exports = router;
