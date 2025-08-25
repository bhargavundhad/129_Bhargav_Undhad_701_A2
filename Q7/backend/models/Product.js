const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    image:String,
    category:{type:mongoose.Schema.Types.ObjectId,ref:"category"}
});

module.exports = mongoose.model('product',ProductSchema);