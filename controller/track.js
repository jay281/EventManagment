const track = require("../models/event/track");
const tprincipal = require("../models/event/trackprincipal");

exports.Create_track =  async (req,res) => {
    const {title,description,position} = req.body
    const eid = req.params.eid
    try{
        await track.create({
            title:title,
            description:description,
            position:position,
            eid:eid
        })
        res.status(200).send({ message: `Track added to this event.` })
    }
    catch(err){
        console.log(err)
        res.status(400).send({ message: "Something went wrong. Cannot create new track." })
    }
};
exports.TrackList = async (req, res) => {
    try {
        const { eid } = req.params
        const trackList = await track.find({where:{ eid: eid }})
        if (trackList.length != 0) {
            let listToSend = []
            for (let i = 0; i < trackList.length; i++) {
                const temporaryObj = {}
                temporaryObj.trackid = trackList[i].trackid
                temporaryObj.title = trackList[i].title
                temporaryObj.description = trackList[i].description
                temporaryObj.position = trackList[i].position
                listToSend.push(temporaryObj)
            }
            res.status(200).send(listToSend)
        } else {
            res.status(200).send({ message: "No tracks created for this event. Contact administrator." })
        }
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: "Something went wrong. Cannot get track list." })
    }
};

exports.ViewTrack = async (req, res) => {
    try {
        const { track_id } = req.params.tid
        const track1 = await track.findOne({ where:{trackid:track_id} })
        const objToSend = {}
        objToSend.name = track1.title
        objToSend.description = track1.description
        objToSend.code = track1.position
        res.status(200).send(objToSend)
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again later." })
    }
};

exports.UpdateTrack = async (req, res) => {
    try {
        const { track_id } = req.params.tid
        const {title,description,position} = req.body
        const t1 = await track.findOne({where:{trackid:track_id}})
        t1.title=title
        t1.description =description
        t1.position= position
        t1.save();
        res.status(200).send({ message: `Track Upadated Suceessfully.` })
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: "Something went wrong. Cannot update track." })
    }
};

exports.DeleteTrack = async (req, res) => {
    try {
        const { track_id } = req.params.tid
        await track.destroy({where:{ trackid: track_id }})
        res.status(200).send({ message: "Track deleted successfully." })
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again later." })
    }
};

exports.SetTrackPermission = async (req, res) => {
    try {
        const { tid } = req.params
        console.log(tid)
        if (req.body.type == 1) {
            await tprincipal.create({
                trackid: tid,
                permissions: req.body.permissions,
                type: req.body.type,
                user_id: req.body.user_id
            })
            res.status(200).send({ message: "Permission has been set for this selected user." })
        } else if (req.body.type == 2) {
            await tprincipal.create({
                trackid: tid,
                permissions: req.body.permissions,
                type: req.body.type,
                local_group_id: req.body.group_id
            })
            res.status(200).send({ message: "Permission has been set for this selected group." })
        }
        else if (req.body.type == 3) {
            await tprincipal.create({
                trackid: tid,
                permissions: req.body.permissions,
                type: req.body.type,
                event_role_id: req.body.event_role_id
            })
            res.status(200).send({ message: "Permission has been set for this selected group." })
        }
        else if (req.body.type == 4) {
            await tprincipal.create({
                trackid: tid,
                permissions: req.body.permissions,
                type: req.body.type,
                cat_role_id: req.body.cat_role_id
            })
            res.status(200).send({ message: "Permission has been set for this selected group." })
        }

    } catch (err) {
        console.log(err)
        res.status(400).send({ message: "Something went wrong. Cannot set track permission." })
    }
};

exports.UpdateTrackPermission = async (req, res) => {
    try {
        const { track_id } = req.params
        const tpr = await tprincipal.findOne({where:{trackid:track_id,user_id:req.body.user_id}});
        tpr.permissions = req.body.permissions
        tpr.save();
        res.status(200).send({ message: "Permission has been updated for this selected group." })
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again later." })
    }
};

exports.DeleteTrackPermission = async (req, res) => {
    try {
        const tid = req.params
        await tprincipal.destroy({where:{trackid:tid,user_id:req.body.user_id} })
        res.status(200).send({ message: "User deleted successfully." })
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again later." })
    }
};





