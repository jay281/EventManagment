
const pr = require("../models/Event_Registration/person");



exports.all_reg_persons =(req,res) =>{
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
            message: `Registration not found with id=${req.params.id}`
          });
        }
      });
    }catch(err){
        res.status(500).json({err:err.message});
    }
  };

exports.person_by_title =(req,res) =>{
    let {tl} = req.body
    if (!tl) {
      res.status(400).send({
        message: "Title can not be empty!"
      });
      return;
    }
    try{
      pr.findOne({ where: {title: tl} })
       .then(data=>{
        if (data != null) {
          res.send(data);
        }
        else{
          return res.status(401).json({
            message: `Person Registration not found with title=${tl}`
          });
        }
      });
    }catch(err){
        res.status(500).json({err:err.message});
    }
  };
