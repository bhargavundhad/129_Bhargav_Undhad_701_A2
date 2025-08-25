const mongoose = require('mongoose');

const CategorySchema  = mongoose.Schema({
    name : {type:String},
    parent : {type:mongoose.Schema.Types.ObjectId,ref:"category",default:null}
});

module.exports = mongoose.model('category',CategorySchema);
