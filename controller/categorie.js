const cat = require("../models/categorie/categorie");
const rl = require("../models/categorie/role")


exports.categorie_create =async  (req, res) => {
    let {title,description,p_mode,visibility}=req.body;
    if (!title) {
      res.status(400).send({
        message: "title can not be empty!"
      });
      return;
    }
    if (!p_mode) {
      res.status(400).send({
        message: "P_mode type can not be empty!"
      });
      return;
    }
    if (!description) {
      res.status(400).send({
        message: "Description can not be empty!"
      });
      return;
    }
    if (!visibility) {
        res.status(400).send({
          message: "Visibility can not be empty!"
        });
        return;
      }
    
    const categorie = await cat.create({
        title:title,
        description:description,
        protection_mode:p_mode,
        visibility:visibility
    });

    await rl.create({
        name: "manager",
        catid : categorie.catid

    }).then(
        res.send({message : "Categorie created"})
    )      
};

exports.cat_update = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }

  cat.update(req.body, {
    where: { catid: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Categorie was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Categorie with id=${id}. Maybe Categorie was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Categorie with id=" + id
      });
    });
};


exports.cat_delete = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  cat.destroy({
    where: { catid: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Categorie was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Categorie with id=${id}. Maybe Categorie was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Categorie with id=" + id
      });
    });
};

exports.cat_by_id =(req,res) =>{
  if (!req.params.id) {
    res.status(400).send({
      message: "ID can not be empty!"
    });
    return;
  }
  try{
    cat.findOne({ where: {catid: req.params.id} })
    .then(data =>{
      res.send(data);
    })
  }catch(err){
      res.status(500).json({err:err.message});
  }
};

exports.all_cat =(req,res) =>{
  try{
    cat.findAll()
    .then(data =>{
      res.send(data);
    })
  }catch(err){
      res.status(500).json({err:err.message});
  }
};