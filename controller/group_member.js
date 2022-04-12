const Group = require('../models/User/Group');
const Group_member = require('../models/User/Group_member');


exports.addGroupMember =  async (req,res) =>{
    const {gid} = req.params
    const {group_member_name} = req.body
    if(!gid){
        res.status(400).send({
            message: "Id can not be empty!"
          });
          return;
    }
    if(!group_member_name){
        res.status(400).send({
            message: "Name can not be empty!"
          });
          return;
    }
    const gt = Group.findOne({where:{groupid:gid}});
    if(!gt){
        res.status(400).send({
            message: "Group not found!"
          });
          return;
    }

    await Group_member.create({
        group_member_name : group_member_name,
        groupid:gid

    })
    .then(
        res.send({message : "Member Added"})
    )
};

exports.updateGroupMember =  async (req,res) =>{
    try{
    const {gid} = req.params
    const gt = Group.findOne({where:{groupid:gid}});
    if(!gt){
        res.status(400).send({
            message: "Group not found!"
          });
          return;
    }
    const {gmid} = req.params
    const name = req.body.group_member_name
    if(!gid){
        res.status(400).send({
            message: "gid can not be empty!"
          });
          return;
    }
    if(!gmid){
        res.status(400).send({
            message: "gmid can not be empty!"
          });
          return;
    }

    const group_member = await Group_member.findOne({where:{groupid:gid,gmemberid:gmid}})

    if(!group_member){
        res.status(400).send({
            message: "Group Member not found!"
          });
          return;
    }

    
    group_member.group_member_name = name;
    await group_member.save();

    res.status(200).send({ message: `Group Member Upadated Suceessfully.` })
    }
    catch(err){
        console.log(err)
        res.status(400).send({ message: "Something went wrong. Cannot update group." })
    }

};

exports.viewGroupMember = async (req,res) =>{
    try{
    const {gid} = req.params
    const gt = Group.findOne({where:{groupid:gid}});
    if(!gt){
        res.status(400).send({
            message: "Group not found!"
          });
          return;
    }
    if(!gid){
        res.status(400).send({
            message: "gid can not be empty!"
          });
          return;
    }
    const group_member = await Group_member.findAll({where:{groupid:gid}})

    if(!Group_member){
        res.status(400).send({
            message: "Group not found!"
          });
          return;
    }

    const listToSend = []
        for (let i = 0; i < group_member.length; i++) {
            const temporaryObj = {}
            temporaryObj.group_member_name = group_member[i].group_member_name
            listToSend.push(temporaryObj)
        }
        res.status(200).send(listToSend)
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again later." })
    }
    

};

exports.deleteGroupMember = async (req,res) =>{
    try{
        const {gid} = req.params
        const gt = Group.findOne({where:{groupid:gid}});
        if(!gt){
        res.status(400).send({
            message: "Group not found!"
          });
          return;
    }
        const {gmid} = req.params
        if(!gid){
            res.status(400).send({
                message: "gid can not be empty!"
              });
              return;
        }
        if(!gmid){
            res.status(400).send({
                message: "gmid can not be empty!"
              });
              return;
        }

        await Group_member.destroy({where:{groupid:gid,gmemberid:gmid}})

        res.status(200).send({ message: `Group Member Deleted Suceessfully.` })
    }catch(err){
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again later." })
    }
};