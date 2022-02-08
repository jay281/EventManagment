
const event = require("../models/event/Event");
const rl = require("../models/event/role");


exports.event_create =async  (req, res) => {
    let {title,e_type,description,start_time,end_time,address,room_id,room_name,veneue_id}=req.body;
    if (!title) {
      res.status(400).send({
        message: "title can not be empty!"
      });
      return;
    }
    if (!e_type) {
      res.status(400).send({
        message: "Event type can not be empty!"
      });
      return;
    }
    if (!description) {
      res.status(400).send({
        message: "Description can not be empty!"
      });
      return;
    }
    if (!start_time) {
      res.status(400).send({
        message: "Start time can not be empty!"
      });
      return;
    }
    if (!end_time) {
      res.status(400).send({
        message: "End time can not be empty!"
      });
      return;
    }
    if (!address) {
      res.status(400).send({
        message: "Address can not be empty!"
      });
      return;
    }
    if (!room_id) {
      res.status(400).send({
        message: "Room id can not be empty!"
      });
      return;
    }
    if (!room_name) {
      res.status(400).send({
        message: "Room name can not be empty!"
      });
      return;
    }
    if (!veneue_id) {
      res.status(400).send({
        message: "Veneue id not be empty!"
      });
      return;
    }
    const catid = req.params.id
    console.log(catid)

    const ev = await event.create({
        title:title,
        e_type:e_type,
        description:description,
        start_time:start_time,
        end_time:end_time,
        address:address,
        room_id:room_id,
        room_name:room_name,
        veneue_id:veneue_id,
        catid : catid
    })

    await rl.create({
      eid:ev.eid,
      name:"manger"
    }).then(
      res.send({message : "Event created"})
    )


};

exports.event_update = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }

  event.update(req.body, {
    where: { eid: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Event with id=" + id
      });
    });
};


exports.event_delete = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  event.destroy({
    where: { eid: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id
      });
    });
};

exports.event_by_id =(req,res) =>{
  if (!req.params.id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  try{
    event.findOne({ where: {eid: req.params.id} })
    .then(data =>{
      res.send(data);
    })
  }catch(err){
      res.status(500).json({err:err.message});
  }
};

exports.all_event =(req,res) =>{
  try{
    event.findAll()
    .then(data =>{
      res.send(data);
    })
  }catch(err){
      res.status(500).json({err:err.message});
  }
};