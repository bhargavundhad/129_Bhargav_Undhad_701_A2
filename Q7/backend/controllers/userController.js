const userModel = require('../models/User');

module.exports.getProfile = async(req,res)=>{
    try{
        const dataUser = await userModel.findById(req.user.id).select('-password');
        res.json(dataUser)
    }catch
    {
        res.status(500).json({message:"Server Error"});
    }
}

module.exports.UpdateProfile = async (req,res)=>{
    try{
        const {name,email} = req.body;
        const updated = await userModel.findByIdAndUpdate(req.user.id,{name,email},{new:true}).select('-password');
        res.json(updated);
    }
    catch{
        res.status(500).json({message:"Server Error"});
    }
};