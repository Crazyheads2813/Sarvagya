if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
const express =require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const ejsMate = require("ejs-mate");
const WrapAsync = require("./utlis/wrapasync");
const ExpressError = require("./utlis/expresserror");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setting up listener
const port =3000;
app.listen(port,()=>{
    console.log(`Server is Listening on port ${port}`);
})

// setting up homepage
app.get("/",(req,res)=>{
    res.render("home.ejs");
});
