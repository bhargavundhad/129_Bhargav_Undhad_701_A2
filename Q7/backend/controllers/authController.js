const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

module.exports.register = async (req,res)=>{
    try{
        const {name,email,password} = req.body;

        const userCheck = await userModel.findOne({email});
        if(userCheck)
        {
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcryptjs.hash(password,10);
        const user = new userModel({name,email,password:hashedPassword});
        await user.save();

        res.status(201).json({message:"User registered successfully"});

    }catch{
        res.status(500).json({ message: 'Server error' });
    }
};

// Special route to create admin user
module.exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword, isAdmin: true });
    await user.save();
    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        const userCheck = await userModel.findOne({email});
        if(!userCheck)
        {
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const passwordCheck = await bcryptjs.compare(password,userCheck.password);
        if(!passwordCheck)
        {
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const token = jwt.sign({id:userCheck._id,isAdmin:userCheck.isAdmin},
            process.env.JWT_SECRET,
            {expiresIn:"2d"}
        );

        res.json({
            token,
            user:{id: userCheck._id, name: userCheck.name, email: userCheck.email, isAdmin: userCheck.isAdmin}
        });

    }catch{
        res.status(500).json({ message: 'Server error' });
    }
};