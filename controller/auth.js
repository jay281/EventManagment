const user = require("../models/User/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const crypto = require('crypto');
const retoken = require('../models/User/Reset_Token');
const transporter = require('../utils/Mailing_system');
const { Op, where } = require("sequelize");

exports.forgot_Password = async(req,res)=>{
    
    console.log(req.body.email)
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
                    from:"no-reply@ipr.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:4200/reset/${token}">link</a> to reset password</h5>
                    `
                })
            })
        
            res.json({message:"check your email"})
          })
        

    }
    

}
   

  
  
exports.ResetNewPassword = async(req,res)=>{
   const newPassword = req.body.password
   const sentToken = req.body.token
   console.log(sentToken,newPassword)
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
  