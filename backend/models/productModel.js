const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type: String,
        required:[true, "Please add the product name."]
    },
    mainImg:{
        type:String,
        required:[true, "Please add the main image"]
    },
    img_1:{
        type:String,
        required:[true, "Please add second image"]
    },
    img_2:{
        type:String,
        required:[true, "Please add third image."]
    },
    img_3:{
        type:String,
        required:[true, "Please add fourth image."]
    },
    img_4:{
        type:String,
        required:[true, "Please add fifth image."]
    },
    img_5:{
        type:String,
        required:[true, "Please add sixth image."]
    },
    img_6:{
        type:String,
        required:[true, "Please add seventh image."]
    },
    img_7:{
        type:String,
        required:[true, "Please add last image."]
    },
    category:{
        type:String,
        required:[true, "Please add the category."]
    },
    color:{
        type:String,
        required:[true, "Please add the color."]
    },
    manufacturer:{
        type:String,
        required:[true, "Please add the manufacturer."]
    },
    weight:{
        type:String,
        required:[true, "Please add the weight."]
    },
    itemsIncluded:{
        type:String,
        required:[true, "Please add the items included."]
    },
    typeOfItem:{
        type:String,
        required:[true, "Please add the type of item."]
    },
    price:{
        type:Number,
        required:[true, "Please add the price."]
    },
    detail:{
        type:String,
        required:[true, "Please add the detail."]
    },
    quantity:{
        type:Number,
        required:[true, "Please add the quantity."]
    },
    sale:{
        type:Boolean,
        // required:[true, "Please add the quantity."]
    },
    salePrice:{
        type:Number,
        // required:[true, "Please add the quantity."]
    },
    salePercentage:{
        type:Number,
        min: 1,
        max: 100,

        // required:[true, "Please add the quantity."]
    },
    reviewStars:{
        type:Number,
        min: 0,
        max: 5,
        // required:[true, "Please add the quantity."]
    },
    reviews:{
        type:String,
        // required:[true, "Please add the quantity."]
    },
},{
    timestamps: true
})
module.exports = mongoose.model("Product", productSchema)