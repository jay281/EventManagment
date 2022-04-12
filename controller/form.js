
const Form = require('../models/Event_Registration/forms');
const Form_item = require('../models/Event_Registration/form_items');


exports.createForm =  async (req,res) =>{
    if(!req.params.eid){
      res.status(400).send({
        message: "Eid can not be empty!"
      });
      return;
    }
    console.log(req.body)
    const {title,introduction,contact_info,registration_limit} = req.body.objToSend
    
    await Form.create({
        title:title,
        introduction:introduction,
        contact_info:contact_info,
        registration_limit: registration_limit,
        eid:req.params.eid
    })
    .then(
        res.send({message : "Form  Added"})
    )
};

exports.updateForm =  async (req,res) =>{
  try{
  const {formid} = req.params
  const {eid} = req.params
  if(!formid){
      res.status(400).send({
          message: "fid can not be empty!"
        });
        return;
  }

  const form = await Form.findOne({where:{form_id:formid,eid:eid}})

  if(!form){
      res.status(400).send({
          message: "Form  not found!"
        });
        return;
  }
  console.log(req.body)

  if(req.body.objToSend.title){
    form.title = req.body.objToSend.title
  }
  if(req.body.objToSend.introduction){
    form.introduction = req.body.objToSend.introduction
  }
  if(req.body.objToSend.contact_info){
    form.contact_info = req.body.objToSend.contact_info
  }
  if(req.body.objToSend.registration_limit){
    form.registration_limit = req.body.objToSend.registration_limit
  }
  await form.save();
  
  res.status(200).send({ message: "Form updated sucessfully." })
  }
  catch(err){
      console.log(err)
      res.status(400).send({ message: "Something went wrong. Cannot update form item." })
  }

};

exports.deleteForm = async (req,res) =>{
    try{
        const {formid} = req.params
        if(!formid){
            res.status(400).send({
                message: "fid can not be empty!"
              });
              return;
        }

        await Form.destroy({where:{form_id:formid}})

        res.status(200).send({ message: `Form  Deleted Suceessfully.` })
    }catch(err){
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again later." })
    }
};

exports.allForm = async (req,res) =>{
  try{
      const {eid} = req.params
      if(!eid){
          res.status(400).send({
              message: "Eid can not be empty!"
            });
            return;
      }

      const all_forms = await Form.findAll({where:{eid:eid}})

      res.status(200).send(all_forms);
  }catch(err){
      console.log(err)
      res.status(400).send({ error: "Something went wrong. Please try again later." })
  }
};

exports.viewFormItems = async (req,res) =>{
  try{
      const {eid} = req.params
      if(!eid){
          res.status(400).send({
              message: "Eid can not be empty!"
            });
            return;
      }
      const form = await Form.findOne({where:{eid:eid}})
      const fi = await Form_item.findAll({where:{form_id:form.form_id},attributes: ['title', 'type','input']})
      res.status(200).send(fi);
  }catch(err){
      console.log(err)
      res.status(400).send({ error: "Something went wrong. Please try again later." })
  }
};

exports.viewForm = async (req,res) =>{
  try{
      const {eid} = req.params
      const {fid} = req.params
      if(!eid){
          res.status(400).send({
              message: "Eid can not be empty!"
            });
            return;
      }
      objTosend =[]
      const fi = await Form.findOne({where:{form_id:fid,eid:eid}})

      
      res.status(200).send(fi);
  }catch(err){
      console.log(err)
      res.status(400).send({ error: "Something went wrong. Please try again later." })
  }
};
