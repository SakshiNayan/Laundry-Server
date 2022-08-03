const express = require("express");
const productModal = require("../Modals/product-modal");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/create-order", (req, res)=> {
    console.log(req.headers);
    try {
        const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY );
        res.status(200).send(user)
    } catch(err) {
        res.status(400).send("Unauthorize user", err)
    }    
    productModal.find({email:user}).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(400).send(err);
    })
});
// router.post("/add", (req, res)=> {
   
//     const today = new Date()
//     const option  = {
//         day: "numeric",
//         month: "long",
//         year: "numeric"
//     }
//     const option1 = {
//         hour: "numeric",
//         minute: "numeric",
//         hour12: false
//     }
//     const day = today.toLocaleDateString("en-Us", option);
//     const time = today.toLocaleTimeString("en-Us", option1);
//     const date = day + " " + time;
   
//     orderModal.create({
//         userEmail: req.body.userEmail,
//          orderId: req.body.orderId, 
//          orderDate_time: date,
//          storeLocation: req.body.storeLocation,
//          storeAddress: req.body.storeAddress,
//          storePhoneNo: req.body.storePhoneNo,
//          orderDetail: req.body.orderDetail,
//          subTotal: req.body.subTotal,
//          packingCharges: req.body.packingCharges,
//          totalAmount: req.body.totalAmount
//         }).then((data)=> {
//             console.log(data);
//         res.status(200).send(data);
//     }).catch((err)=> {
//         res.status(400).send(err)
//     })
// });

router.delete("/cancel/:id",(req, res)=> {
    productModal.deleteOne({_id: req.params.id}).then(()=> {
        res.status(200).send("Order Cancelled Sucessfully")
    }).catch((err)=> {
        console.log(err);
        res.status(400).send(err) 
    });
});



module.exports = router;