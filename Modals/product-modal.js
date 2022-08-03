const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    orderId:{
        type: String,
        required: true,
    },
    dateTime:{
        type: String,
        required: true,
    },
    storeInfo:{
        type: String,
        required: true,
    },
    userAddress: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
    },
    items:{
        type : String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    }

})

const productModal = mongoose.model("product", productSchema);
module.exports = productModal;