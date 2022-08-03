const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
require("dotenv").config();
const productController = require("./routes/product");
//console.log(productController)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(3001,(err)=>{
    if(!err){
        console.log("Server connected succesfully at 3001")
    }
    else{
        console.log(err)
    }
});

const laundryDB= "mongodb+srv://Sakshi09:test123@instaclone.gwk4cly.mongodb.net/laundry?retryWrites=true&w=majority"
mongoose.connect(laundryDB,(data)=>{
    console.log("Successfully connect to db")
},(err)=>{
    console.log(err)
});

app.use("/product",productController);

app.get("/",(req,res)=>{
    res.status(200).send("Laundry app")
},(err)=>{
    console.log(err)
})

