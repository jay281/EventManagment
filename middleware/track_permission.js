const tprincipal =require("../models/event/trackprincipal");

exports.hasTrackReadPermission = (req, res) => {
    try {
        const { user_id } = req.user.uid
        const { track_id } = req.params.id
        const trackPrincipal = await tprincipal.findOne({ track_id: track_id, user_id: user_id })
        if (trackPrincipal.permissions != 'read' || trackPrincipal.permissions != 'full') {
            return res.status(200).send({ message: "You dont't have valid permission to read for this track." })
        }
        next();
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again." })
    }
};

exports.hasTrackFullPermission = (req, res) => {
    try {
        const { user_id } = req.user.uid
        const { track_id } = req.params.id
        const trackPrincipal = await tprincipal.findOne({where:{ trackid: track_id, user_id: user_id }})
        if (trackPrincipal.permissions != 'full'){ 
            return res.status(200).send({ message: "You dont't have valid permission to write for this track." })
        }
        next();
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again." })
    }
};