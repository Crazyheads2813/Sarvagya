if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
const express =require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utlis/expresserror");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// requiring routes
const sensorDataRoute = require("./router/sensorData.js");


// setting up mongoDb
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/Sarvagya";
async function main() {
    mongoose.connect(dbUrl, {
        serverSelectionTimeoutMS: 5000, // 5 seconds
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Database connection error:", err);
    });
}

main()
.then((result)=>{
    console.log("Connected With MongoDB Server");
}).catch((err)=>{
    console.log(err);
});

// setting up session
const sessionConfig = {
    secret: process.env.SESSION_SECRET  ||"thisshould be a better secret", 
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}

// setting up cors
app.use(cors());

// setting up session Middleware
app.use(session(sessionConfig));

// setting up flash
app.use(flash());

// setting up flash middleware
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// setting up listener
const port =3000;
app.listen(port,()=>{
    console.log(`Server is Listening on port ${port}`);
})

// setting up data routes
app.use("/sensors-data",sensorDataRoute);


// setting up homepage
app.get("/",(req,res)=>{
    res.render("home.ejs");
});

// setting up error handling
app.all("*",(req,res,next)=>{
    next(new ExpressError("Page Not Found",404));
});

app.use((err,req,res,next)=>{
    const {statusCode = 500} = err;
    if(!err.message) err.message = "Something Went Wrong";
    res.status(statusCode).render("error.ejs",{err});
});