
const Form_item = require('../models/Event_Registration/form_items');


exports.createFormItem =  async (req,res) =>{
  console.log(req.body)
    const {type,title,description,is_enabled} = req.body.objToSend
    const {fid} = req.params

    if(!type || !title || !description  || !is_enabled  ){
        res.status(400).send({
            message: "Enter all details!"
          });
          return;
    }

    await Form_item.create({
        type:type,
        title:title,
        description:description,
        is_enabled:is_enabled,
        form_id:fid
    })
    .then(
        res.send({message : "Form Item Added"})
    )
};

exports.updateFormItem =  async (req,res) =>{
    try{
    const {fid} = req.params
    if(!fid){
        res.status(400).send({
            message: "fid can not be empty!"
          });
          return;
    }

    const fi = await Form_item.findOne({where:{form_id:fid}})

    if(!fi){
        res.status(400).send({
            message: "Form item not found!"
          });
          return;
    }

    fi.update(req.body, {
        where: { form_id: fid }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Form item was updated successfully."
            });
          } else {
            res.send({
              message: `Cannot update Form Item with fid=${fid}`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Form item with fid=" + fid
          });
        });
   
    }
    catch(err){
        console.log(err)
        res.status(400).send({ message: "Something went wrong. Cannot update form item." })
    }

};


exports.deleteFormItem = async (req,res) =>{
    try{
        const {fid} = req.params
        if(!fid){
            res.status(400).send({
                message: "fid can not be empty!"
              });
              return;
        }

        await Form_item.destroy({where:{form_id:fid}})

        res.status(200).send({ message: `Form item Deleted Suceessfully.` })
    }catch(err){
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again later." })
    }
};