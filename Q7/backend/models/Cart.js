const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    items:[{
        product:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
        quantity:Number
    }]
})

module.exports = mongoose.model('cart',CartSchema);