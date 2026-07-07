const User = require("../models/user");
const blacklistTokens = require("../models/blacklist");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

async function register (req,res){
    console.log(req.body);
try{

const {name,email,password}=req.body;

const userExists=await User.findOne({email});

if(userExists){
    return res.status(400).json({
        message:"User already exists"
    });
}

const hashedPassword=await bcrypt.hash(password,10);

const user=await User.create({
    name,
    email,
    password:hashedPassword
});

res.status(201).json({
    _id:user._id,
    name:user.name,
    email:user.email,
    token:generateToken(user._id)
});

}catch(error){
    res.status(500).json({
        message:error.message
    });
}
};

async function login(req,res){
try{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user){
    return res.status(401).json({
        message:"Invalid Credentials"
    });
}

const isMatch=await bcrypt.compare(
    password,
    user.password
);

if(!isMatch){
    return res.status(401).json({
        message:"Invalid Credentials"
    });
}

res.json({
    _id:user._id,
    name:user.name,
    email:user.email,
    token:generateToken(user._id)
});

}catch(error){
    res.status(500).json({
        message:error.message
    });
}
};


// ─── Get Me ───────────────────────────────────────────────────────
async function getMeController(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports={
    login,
    register,
   
    getMeController

}