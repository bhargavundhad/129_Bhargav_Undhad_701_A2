const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    items:[{
        product:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
        quantity:Number
    }],
    totalAmount:Number,
    status:{type:String,enum: ['Pending', 'Shipped', 'Delivered'],default:'Pending'}
}, {
    timestamps: true
});

module.exports = mongoose.model('order',OrderSchema);