const Group = require('../models/User/Group');


exports.createGroup =  async (req,res) =>{
    const {group_name} = req.body
    if(!group_name){
        res.status(400).send({
            message: "Name can not be empty!"
          });
          return;
    }

    await Group.create({
        group_name : group_name
    })
    .then(
        res.send({message : "Group created"})
    )
};

exports.updateGroup =  async (req,res) =>{
    try{
    const {gid} = req.params
    const {group_name} = req.body
    if(!gid){
        res.status(400).send({
            message: "gid can not be empty!"
          });
          return;
    }

    const group = await Group.findOne({where:{groupid:gid}})

    if(!group){
        res.status(400).send({
            message: "Group not found!"
          });
          return;
    }

    
    group.group_name = group_name;
    await group.save();

    res.status(200).send({ message: `Group Upadated Suceessfully.` })
    }
    catch(err){
        console.log(err)
        res.status(400).send({ message: "Something went wrong. Cannot update group." })
    }

};

exports.viewGroup = async (req,res) =>{
    try{
    
    const group = await Group.findAll()

    if(!group){
        res.status(400).send({
            message: "Group not found!"
          });
          return;
    }

    res.status(200).send(group)
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again later." })
    }
    

};

exports.deleteGroup = async (req,res) =>{
    try{
        const {gid} = req.params
        if(!gid){
            res.status(400).send({
                message: "gid can not be empty!"
              });
              return;
        }

        await Group.destroy({where:{groupid:gid}})

        res.status(200).send({ message: `Group Deleted Suceessfully.` })
    }catch(err){
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again later." })
    }
};