const rl = require("../models/categorie/role");
const category = require('../models/categorie/categorie');


exports.role_create =async  (req, res) => {
    let {title,name}=req.body;
    if (!title) {
      res.status(400).send({
        message: "Title can not be empty!"
      });
      return;
    }
    if (!name) {
      res.status(400).send({
        message: "Name can not be empty!"
      });
      return;
    }

    const cat = await category.findOne({where:{title:title}});
    await rl.create({
        name: name,
        catid : cat.catid

    }).then(
        res.send({message : "Role created"})
    )      
};

exports.role_update = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }

  rl.update(req.body, {
    where: { roleid: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Role was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Role with id=" + id
      });
    });
};


exports.role_delete = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  rl.destroy({
    where: { roleid: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Role was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Role with id=" + id
      });
    });
};

exports.role_by_id =(req,res) =>{
  if (!req.params.id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  try{
    rl.findOne({ where: {roleid: req.params.id} })
    .then(data =>{
      res.send(data);
    })
  }catch(err){
      res.status(500).json({err:err.message});
  }
};

exports.all_role =(req,res) =>{
  try{
    cat.findAll()
    .then(data =>{
      res.send(data);
    })
  }catch(err){
      res.status(500).json({err:err.message});
  }
};