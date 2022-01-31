const e_reg = require("../models/E_Register");
const user = require("../models/User");


exports.event_reg = async (req, res) => {
    let {f_name,l_name,email}=req.body;
    if (!f_name) {
      res.status(400).send({
        message: "first name can not be empty!"
      });
      return;
    }
    if (!l_name) {
      res.status(400).send({
        message: "last name can not be empty!"
      });
      return;
    }
    if (!email) {
      res.status(400).send({
        message: "email can not be empty!"
      });
      return;
    }

    const eid = req.params.id;
    if (!eid) {
      res.status(400).send({
        message: "Event id is empty!"
      });
      return;
    }

    const User =await  user.findOne({where :{email : email}});
    
    e_reg.create({
      f_name: f_name,
      l_name :l_name,
      email : email,
      eid: eid,
      uid: User.uid
    })
    .then(result => {
        res.status(201).json({
          message: "Registration Sucessfull"
        });
    })
    .catch(err => {
      console.log(err);
        res.status(500).json({
          error: err
        });
      });
};

exports.all_registration =(req,res) =>{
  try{
    e_reg.findAll()
    .then(data =>{
      res.send(data);
    })
  }catch(err){
      res.status(500).json({err:err.message});
  }
};


exports.registration_by_id =(req,res) =>{
  if (!req.params.id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  try{
    user.findOne({ where: {regid: req.params.id} })
     .then(data=>{
      if (data != null) {
        res.send(data);
      }
      else{
        return res.status(401).json({
          message: `Registration not found with id=${req.params.id}`
        });
      }
    });
  }catch(err){
      res.status(500).json({err:err.message});
  }
};