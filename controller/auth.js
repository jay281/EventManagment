const user = require("../models/User/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const crypto = require('crypto');
const retoken = require('../models/User/Reset_Token');
const transporter = require('../utils/Mailing_system');
const { Op } = require("sequelize");
const etoken = require('../models/User/Email_Token');

exports.forgot_Password = async(req,res)=>{
    if(!req.body.email){
        res.status(400).send({
            message: "Email can not be empty!"
          });
          return;
    }
    
    const us = await user.findOne({where:{email:req.body.email}});
    if(!us){
        return res.status(422).json({error:"User dont exists with that email"});
    }
    else{
        crypto.randomBytes(32,async (err,buffer) =>{
            if(err){
                console.log(err)
            }
            const token= buffer.toString("hex");
            await retoken.create({
                reset_pass_token : token,
                expire_token : Date.now()+3600000,
                uid :us.uid
            }).then((results)=>{
                transporter.sendMail({
                    to: us.email,
                    from:"no-replay@ipr.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:5000/reset/${token}">link</a> to reset password</h5>
                    `
                })
            })
        
            res.json({message:"check your email"})
          })
        

    }
    

}
   

  
  
exports.ResetNewPassword = async(req,res)=>{
    if(!req.body.password){
        res.status(400).send({
            message: "Password can not be empty!"
          });
          return;
    }
   const newPassword = req.body.password
   const sentToken = req.params.token
   const rt = await retoken.findOne({where:{reset_pass_token:sentToken,expire_token:{[Op.gt]:Date.now()}}})
   if(!rt){
      return res.status(422).json({error:"Try again session expired"})
   }
   else{
    
     let hash = await bcrypt.hash(newPassword,10)
     const us = await user.findOne({where:{uid:rt.uid}})
     us.password = hash
     rt.reset_pass_token = null
     rt.expire_token = null
     await rt.save();
     await us.save();
    res.json({message:"password updated success"})

   }
}

exports.VerifyEmail = async(req,res)=>{
    const sentToken = req.params.token
    const et = await etoken.findOne({where:{email_token:sentToken}})
    if(!et){
       return res.status(422).json({error:"Try again session expired"})
    }
    else{
      const us = await user.findOne({where:{uid:et.uid}})
      et.email_token = null
      et.expire_token = null
      us.is_pending = false
      await et.save();
      await us.save();
     res.json({message:"Email verified"})
 
    }
 }
  