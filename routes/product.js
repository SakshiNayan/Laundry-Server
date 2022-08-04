const express= require("express");
const productModal = require("../Modals/product-modal");
const jwt = require("jsonwebtoken");
const router = express.Router();



router.post("/create-order",(req,res)=>{
    console.log(req.body);
    try {
        const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY );
        res.status(200).send(user)
    } catch(err) {
        res.status(403).send("Unauthorize user", err)
    } 
    const today = new Date()
    const option  = {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    const option1 = {
        hour: "numeric",
        minute: "numeric",
        hour12: false
    }
    const day = today.toLocaleDateString("en-Us", option);
    const time = today.toLocaleTimeString("en-Us", option1);
    const date = day + " " + time;   
    productModal.create({ 
        userId : req.body.userId,
        orderId :req.body.orderId,
        dateTime : date,
        storeInfo : JSON.stringify(req.body.storeInfo),
       
        status : req.body.status,
        userAddress: req.body.userAddress,
        items : JSON.stringify(req.body.items),
        price: req.body.price
     }).then((data)=>{
        res.status(200).send( data)
            
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

// router.get("/user",(req,res)=>{
//     productModal.find().then((data)=>{
//         if(data.length){
//             res.status(200).send(data)
//         }
//     }).catch((err)=>{
//         res.status(400).send(err)
//     })
// });

// router.patch("/OrderStatus", (req,res)=>{
//     const orderStatus = orders.updateOne({
//         userId : req.body.userId,
//         order_id : req.body.order_id,
        
//     },{
//         $set:{
//             status :
//         }
//     }).then(()=>{
//         res.status(200).send()
//     })
// })

module.exports= router;