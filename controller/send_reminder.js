const E_reg = require('../models/Event_Registration/E_Register');
const transporter = require('../utils/Mailing_system');


exports.sendReminder = async (req,res) =>{
    const {eid} = req.params

    const reg_pepole = await E_reg.findAll({where:{eid:eid}})
    console.log(reg_pepole.length)

    if(!reg_pepole){
        res.status(400).send({
            message: "Registration not found!"
          });
          return;
    }

    
    for (let i = 0; i < reg_pepole.length; i++) {
        await transporter.sendMail({
            to: reg_pepole[i].email,
            from:"no-replay@ipr.com",
            subject:"Event Reminder",
            html:`
            <p>Remider for the event</p>
            `
        })
    }
    res.status(200).send("mail send");

}