const abs = require('../models/Abstract/Abstract');
const tk = require('../models/event/track');
const user = require('../models/User/User');
const are = require('../models/Abstract/abstract_review');


exports.abs_review_create =async  (req, res) => {
    let {proposed_action,reviewer_name}=req.body;
    const tid = req.params.id
    if (!proposed_action) {
      res.status(400).send({
        message: "Title can not be empty!"
      });
      return;
    }
    if (!tid) {
        res.status(400).send({
          message: "Track id can not be empty!"
        });
        return;
      }
    
    const track = await tk.findOne({where : {trackid:tid}})
    const abstract = await abs.findOne({where:{title:track.title}})
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    await are.create({
        proposed_action: proposed_action,
        trackid:tid,
        absid:abstract.absid,
        reviewer_name:reviewer_name,
        submitted_date : today.toISOString(),
        uid:null

    }).then(
        res.send({message : "Review submitted"})
    )      
};

exports.all_reviews =(req,res) =>{
    try{
      are.findAll()
      .then(data =>{
        res.send(data);
      })
    }catch(err){
        res.status(500).json({err:err.message});
    }
  };
  
exports.all_abstract =(req,res) =>{
  try{
    are.findAll()
    .then(data =>{
      res.send(data);
    })
  }catch(err){
      res.status(500).json({err:err.message});
  }
};

exports.review_by_trackid =(req,res) =>{
    if (!req.params.id) {
      res.status(400).send({
        message: "ID can not be empty!"
      });
      return;
    }
    try{
      are.findOne({ where: {trackid: req.params.id} })
       .then(data=>{
        if (data != null) {
          res.send(data);
        }
        else{
          return res.status(401).json({
            message: `Review not found with id=${req.params.id}`
          });
        }
      });
    }catch(err){
        res.status(500).json({err:err.message});
    }
  };