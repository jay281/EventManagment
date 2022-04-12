const Form_item = require('../models/Event_Registration/form_items');
const Reg = require('../models/Event_Registration/registration_data');
const Form = require('../models/Event_Registration/forms');

exports.Register =  async (req,res) =>{
    console.log(req.body)
    const {eid} = req.params
    if(!eid){
        res.status(400).send({
            message: "Eid Not found!"
          });
          return;
    }
    const form = await Form.findOne({where:{eid:eid}})


    await Reg.create({
        data:req.body.objToSend,
        form_id:form.form_id
    })
    .then(
        res.send({message : "Registration Success!!!"})
    )
};