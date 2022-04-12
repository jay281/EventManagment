const user = require("../models/User/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const crypto = require('crypto');
const retoken = require('../models/User/Reset_Token');
const transporter = require('../utils/Mailing_system');
const etoken = require('../models/User/Email_Token')

exports.user_signup =async  (req, res) => {
            let {fname,lname,email,dob,address_line1,address_line2,city,state,country,primary_phone_number,alternate_phone_number,alternative_email_address,affiliation_name,affiliation_email_address,username,password}=req.body;
            if (!fname) {
              res.status(400).send({
                message: "First name can not be empty!"
              });
              return;
            }
            if (!lname) {
              res.status(400).send({
                message: "Last name can not be empty!"
              });
              return;
            }
            if (!email) {
              res.status(400).send({
                message: "Email can not be empty!"
              });
              return;
            }
            if (!password) {
              res.status(400).send({
                message: "Password can not be empty!"
              });
              return;
            }
            if (!dob) {
              res.status(400).send({
                message: "Date of birth can not be empty!"
              });
              return;
            }
            if (!address_line1) {
              res.status(400).send({
                message: "Address can not be empty!"
              });
              return;
            }
            if (!city) {
              res.status(400).send({
                message: "City can not be empty!"
              });
              return;
            }
            if (!state) {
              res.status(400).send({
                message: "State can not be empty!"
              });
              return;
            }
            if (!country) {
              res.status(400).send({
                message: "Country can not be empty!"
              });
              return;
            }
            if (!primary_phone_number) {
              res.status(400).send({
                message: "Phone number can not be empty!"
              });
              return;
            }
            if (!username) {
              res.status(400).send({
                message: "Username can not be empty!"
              });
              return;
            }
            if (!alternate_phone_number) {
              res.status(400).send({
                message: "Phone number can not be empty!"
              });
              return;
            }
            if (!affiliation_email_address) {
              res.status(400).send({
                message: "Email can not be empty!"
              });
              return;
            }
            if (!affiliation_name) {
              res.status(400).send({
                message: "Name can not be empty!"
              });
              return;
            }
            if (!affiliation_email_address) {
              res.status(400).send({
                message: "Email can not be empty!"
              });
              return;
            }
            let hash= await bcrypt.hash(password,10);
            const us = await user.findOne({where : { email : email}});
            if (us) {
              res.status(400).send({
                message: "Email already Exist!"
              });
              return;
            }
            const usr = await user.create({
                fname:fname,
                lname:lname,
                email:email,
                dob:dob,
                address_line1:address_line1,
                address_line2:address_line2,
                city:city,
                state:state,
                country:country,
                primary_phone_number:primary_phone_number,
                alternate_phone_number:alternate_phone_number,
                alternative_email_address:alternative_email_address,
                affiliation_name:affiliation_name,
                affiliation_email_address:affiliation_email_address,
                username:username,
                password:hash
              });
              
              await crypto.randomBytes(32,async (err,buffer) =>{
                if(err){
                    console.log(err)
                }
                const token= buffer.toString("hex");
                await etoken.create({
                    email_token : token,
                    expire_token : Date.now(),
                    uid :usr.uid
                }).then((results)=>{
                    transporter.sendMail({
                        to: usr.email,
                        from:"no-replay@ipr.com",
                        subject:"Verify Email",
                        html:`
                        <p>You requested for verify email</p>
                        <h5>click in this <a href="http://localhost:5000/verify/${token}">link</a> to verify email</h5>
                        `
                    })
                })
            
                res.json({message:"Please check your email for verification!!!!!!!"})
              })
              
  }

exports.user_login = async(req, res, next) => {
  if (!req.body.username) {
    res.status(400).send({
      message: "Please enter the email!"
    });
    return;
  }
  const us = await user.findOne({where:{username:req.body.username}});
  const validPass = await bcrypt.compare(req.body.password, us.password)
  if(!validPass){
    return res.status(400).send({ error: "Invalid Username or Password." })
  }
  if(us){
      if(us.is_pending){
        
          const emt = await etoken.findOne({where:{uid:us.uid}})
          const token= emt.email_token;
          transporter.sendMail({
                  to: us.email,
                  from:"no-replay@ipr.com",
                  subject:"Verify Email",
                  html:`
                  <p>You requested for Verify Email</p>
                  <h5>click in this <a href="http://localhost:5000/verify/${token}">link</a> to verify email</h5>
                  `
              })
          
      
          res.json({message:"Please check your email for verification!!!!!!!"})
        


      }
      else{
        bcrypt.compare(req.body.password, us.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                username: user.username,
                id:us.uid,
                is_admin:us.is_admin      
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Went wrong"
          });
        })
      
      }
  }
  else{
    return res.status(401).json({
      message: "Not found"
    });
  }
 
};

exports.all_user =(req,res) =>{
    try{
      user.findAll()
      .then(data =>{
        res.send(data);
      })
    }catch(err){
        res.status(500).json({err:err.message});
    }
};

exports.delete_user = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  user.destroy({
    where: { uid: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

exports.user_by_id =(req,res) =>{
  if (!req.params.id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  try{
    user.findOne({ where: {uid: req.params.id} })
     .then(data=>{
      if (data != null) {
        res.send(data);
      }
      else{
        return res.status(401).json({
          message: `User not found with id=${req.params.id}`
        });
      }
    });
  }catch(err){
      res.status(500).json({err:err.message});
  }
};

exports.user_by_fname =(req,res,next) =>{
  try{
    let name =req.body.fname;
    if(name==null){
      next()
    }
    else{
    user.findOne({ where: {fname: name} })
    .then(data => {
      if (data == null) {
        return res.status(401).json({
          message: `User not found with fname=${name} `
        });
      }
      else{
        res.send(data);
      }
    })
  }
  }catch(err){
      res.status(500).json({err:err.message});
  }
};

exports.user_by_email =(req,res,next) =>{
  try{
    let mail=req.body.email;
    if(mail == null)
    {
      next()
    }
    else{
    user.findOne({ where: {email: mail} })
    .then(data => {
      if (data == null) {
        return res.status(401).json({
          message: `User not found with email=${mail}`
        });
      }
      else{
        res.send(data);
      }
    })
  }
  }catch(err){
      res.status(500).json({err:err.message});
  }
};

exports.user_by_lname =(req,res,next) =>{
  try{
    let name=req.body.lname;
    if(name == null)
    {
      next()
    }
    else{
    user.findOne({ where: {lname: name} })
    .then(data => {
      if (data == null) {
        return res.status(401).json({
          message: `User not found with lname=${name}`
        });
      }
      else{
        res.send(data);
      }
    })
  }
  }catch(err){
      res.status(500).json({err:err.message});
  }
};

exports.user_update = (req, res) => {
  const name = req.params.uname;
  if (!name) {
    res.status(400).send({
      message: "Name can not be empty!"
    });
    return;
  }

  user.update(req.body, {
    where: { username: name }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with name=${name}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with username=" + name
      });
    });
};

exports.user_pass_update = async (req,res) =>{
  let {username,password} = req.body
  if(!username){
    res.status(400).send({
      message: "UserName can not be empty!"
    });
    return;
  }
  if(!password){
    res.status(400).send({
      message: "Password can not be empty!"
    });
    return;
  }
  let hash= await bcrypt.hash(password,10);
  const us = await user.findOne({where:{username:username}})
  if(!us)
  {
    res.status(400).send({
      message: "User Not found!"
    });
    return;
  }
  us.password = hash;
  await us.save()
  .then(num => {
    if (num == 1) {
      res.send({
        message: "User was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update User with name=${username}. Maybe User was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating User with username=" + username
    });
  });

};


