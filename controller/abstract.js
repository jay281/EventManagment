const user = require("../models/User");
const event = require("../models/Event");
const fil = require("../models/File");
const abstract = require("../models/Abstract");
const moment = require("moment");
const fs = require("fs");



exports.abs_submit = async (req, res) => {
    let {title,description,sub_comment} = req.body;

    
    if (!title) {
      res.status(400).send({
        message: "first name can not be empty!"
      });
      return;
    }
    if (!description) {
      res.status(400).send({
        message: "last name can not be empty!"
      });
      return;
    }
    if (!sub_comment) {
      res.status(400).send({
        message: "email can not be empty!"
      });
      return;
    }
    // if (!sub_date) {
    //     res.status(400).send({
    //       message: "email can not be empty!"
    //     });
    //     return;
    //   }

    const eid = req.params.id;
    if (!eid) {
      res.status(400).send({
        message: "Event id is empty!"
      });
      return;
    }
    const date = new Date();
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    console.log("==================")
    console.log(today.toISOString());
     const abst = await abstract.create({
      title: title,
      description :description,
      submission_comment : sub_comment,
      submitted_dt :today.toISOString(),
      eid: eid
    });
    const fl =req.files.file;
    const filename = fl.name;
    const filepath = `../../resources/abstract/${eid}/${filename}`
    // fl.mv('../../resources/abstract/' + filename,function(err){
    //   if(err){
    //     res.send(err)
    //   }
    // })
    await fl.mv(filepath);
    await fil.create({
      filename: fl.name,
      content_type: 'application/pdf',
      size: fl.size,
      mimetype: fl.mimetype,
      md5: fl.md5,
      storage_file_path: filepath,
      abs_id:abst.absid
    })
    .then(
      res.send({message : "File uploaded"})
    )
};

exports.all_abstract =(req,res) =>{
  try{
    abstract.findAll()
    .then(data =>{
      res.send(data);
    })
  }catch(err){
      res.status(500).json({err:err.message});
  }
};


exports.abstract_by_id =(req,res) =>{
  if (!req.params.id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  try{
    user.findOne({ where: {absid: req.params.id} })
     .then(data=>{
      if (data != null) {
        res.send(data);
      }
      else{
        return res.status(401).json({
          message: `Abstarct not found with id=${req.params.id}`
        });
      }
    });
  }catch(err){
      res.status(500).json({err:err.message});
  }
};