
const tk = require("../models/event/track");



exports.all_event_tracks =(req,res) =>{
    try{
      tk.findAll()
      .then(data =>{
        res.send(data);
      })
    }catch(err){
        res.status(500).json({err:err.message});
    }
  };
  
  
exports.track_by_id =(req,res) =>{
    if (!req.params.id) {
      res.status(400).send({
        message: "ID can not be empty!"
      });
      return;
    }
    try{
      tk.findOne({ where: {trackid: req.params.id} })
       .then(data=>{
        if (data != null) {
          res.send(data);
        }
        else{
          return res.status(401).json({
            message: `Track not found with id=${req.params.id}`
          });
        }
      });
    }catch(err){
        res.status(500).json({err:err.message});
    }
  };

exports.track_by_title =(req,res) =>{
    let {tl} = req.body
    if (!tl) {
      res.status(400).send({
        message: "Title can not be empty!"
      });
      return;
    }
    try{
      tk.findOne({ where: {title: tl} })
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
