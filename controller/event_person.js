
const e = require("cors");
const pr = require("../models/event/Person");

exports.person_create = async(req,res) =>{
    let{f_name,l_name,email,title,username,address,phone_no,affiliation,invited_dt} = req.body
    const eid = req.params.id
    if (!f_name) {
        res.status(400).send({
          message: "First name can not be empty!"
        });
        return;
    }
    if (!l_name) {
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
    if (!title) {
        res.status(400).send({
          message: "Title can not be empty!"
        });
        return;
    }
    if (!username) {
        res.status(400).send({
          message: "User name can not be empty!"
        });
        return;
    }
    if (!address) {
        res.status(400).send({
          message: "Address name can not be empty!"
        });
        return;
    }
    if (!phone_no) {
        res.status(400).send({
          message: "Phone Number can not be empty!"
        });
        return;
    }
    if (!affiliation) {
        res.status(400).send({
          message: "Affiliation can not be empty!"
        });
        return;
    }
    if (!invited_dt) {
        res.status(400).send({
          message: "Invited date can not be empty!"
        });
        return;
    }
    await pr.person_create({
        f_name:f_name,
        l_name:l_name,
        email:email,
        title:title,
        username:username,
        address:address,
        phone_no:phone_no,
        affiliation:affiliation,
        invited_dt:invited_dt,
        eid:eid
    })
    .then(result => {
        res.status(201).json({
          message: "Person added Sucessfully"
        });
    })
    .catch(err => {
      console.log(err);
        res.status(500).json({
          error: err
        });
      });
}

exports.all_event_persons =(req,res) =>{
    try{
      pr.findAll()
      .then(data =>{
        res.send(data);
      })
    }catch(err){
        res.status(500).json({err:err.message});
    }
  };
  
  
exports.person_by_id =(req,res) =>{
    if (!req.params.id) {
      res.status(400).send({
        message: "ID can not be empty!"
      });
      return;
    }
    try{
      pr.findOne({ where: {perid: req.params.id} })
       .then(data=>{
        if (data != null) {
          res.send(data);
        }
        else{
          return res.status(401).json({
            message: `Person not found with id=${req.params.id}`
          });
        }
      });
    }catch(err){
        res.status(500).json({err:err.message});
    }
  };

exports.person_by_username =(req,res) =>{
    let {tl} = req.body
    if (!tl) {
      res.status(400).send({
        message: "Username can not be empty!"
      });
      return;
    }
    try{
      pr.findOne({ where: {username: tl} })
       .then(data=>{
        if (data != null) {
          res.send(data);
        }
        else{
          return res.status(401).json({
            message: `Person not found with username=${tl}`
          });
        }
      });
    }catch(err){
        res.status(500).json({err:err.message});
    }
  };
