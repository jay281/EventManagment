const user = require("../models/User/User");
const tk = require("../models/event/track");
const fil = require("../models/Abstract/File");
const abstract = require("../models/Abstract/Abstract");
const moment = require("moment");
const fs = require("fs");
const e = require("cors");
const ptrack = require("../models/Abstract/proposed_for_track");


exports.abs_submit = async (req, res) => {
    let {title,comments,contribution_type} = req.body;

    
    if (!title) {
      res.status(400).send({
        message: "Title can not be empty!"
      });
      return;
    }
    if (!comments) {
      res.status(400).send({
        message: "Comments can not be empty!"
      });
      return;
    }
    if (!contribution_type) {
      res.status(400).send({
        message: "Contrubution type can not be empty!"
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
    
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const abst = await abstract.create({
      title: title,
      comments :comments,
      contribution_type : contribution_type,
      submitted_dt :today.toISOString(),
      eid: eid
    });

    const track = await tk.create(
      {
        title:title,
        description:comments,
        position: 0,
        eid:eid
      }
    )

    await ptrack.create(
      {
        trackid:track.trackid
      }
    )

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
    abstract.findAll({ where: {eid: req.params.id} })
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