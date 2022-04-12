
const event = require("../models/event/Event");
const rl = require("../models/event/role");
const eprincipal = require("../models/event/event_principal");


exports.event_create =async  (req, res) => {
    let {title,e_type,description,start_time,end_time,timezone,address,room_id,room_name,veneue_id,map_url,keyword,protection_mode}=req.body;
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
        timezone:timezone,
        map_url:map_url,
        keyword:keyword,
        protection_mode:protection_mode,
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



exports.SetEventPermission = async (req, res) => {
  try {
      const { eid } = req.params
      if (req.body.type == 1) {
          await eprincipal.create({
              eid: eid,
              permissions: req.body.permissions,
              type: req.body.type,
              user_id: req.body.user_id
          })
          res.status(200).send({ message: "Permission has been set for this selected user." })
      } else if (req.body.type == 2) {
          await eprincipal.create({
              eid: eid,
              permissions: req.body.permissions,
              type: req.body.type,
              local_group_id: req.body.group_id
          })
          res.status(200).send({ message: "Permission has been set for this selected group." })
      }
      else if (req.body.type == 3) {
          await eprincipal.create({
              eid: eid,
              permissions: req.body.permissions,
              type: req.body.type,
              event_role_id: req.body.event_role_id
          })
          res.status(200).send({ message: "Permission has been set for this selected group." })
      }
      else if (req.body.type == 4) {
          await eprincipal.create({
              eid: eid,
              permissions: req.body.permissions,
              type: req.body.type,
              cat_role_id: req.body.cat_role_id
          })
          res.status(200).send({ message: "Permission has been set for this selected group." })
      }
      else if (req.body.type == 5) {
        await eprincipal.create({
            eid: eid,
            permissions: req.body.permissions,
            type: req.body.type,
            email: req.body.email
        })
        res.status(200).send({ message: "Permission has been set for this selected group." })
    }
    else{
      res.status(400).send({ message: "Something went wrong. Cannot set track permission." })
    }

  } catch (err) {
      console.log(err)
      res.status(400).send({ message: "Something went wrong. Cannot set track permission." })
  }
};

exports.UpdateEventPermission = async (req, res) => {
  try {
      const { eid } = req.params
      const {epid} = req.params
      const ep = await eprincipal.findOne({where:{eid:eid,user_id:req.body.user_id,epid:epid}});
      ep.permissions = req.body.permissions
      ep.save();
      res.status(200).send({ message: "Permission has been updated for this selected group." })
  } catch (err) {
      console.log(err)
      res.status(400).send({ error: "Something went wrong. Please try again later." })
  }
};

exports.DeleteEventPermission = async (req, res) => {
  try {
      const epid = req.params
      await eprincipal.destroy({where:{epid:epid} })
      res.status(200).send({ message: "User deleted successfully." })
  } catch (err) {
      console.log(err)
      res.status(400).send({ error: "Something went wrong. Please try again later." })
  }
};