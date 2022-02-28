
const EventPrincipal = require('../models/event/event_principal')

exports.hasEventReadPermission = (req, res) => {
    try {
        const { user_id } = req.user.uid
        const { eid } = req.params
        const eventPermission = await EventPrincipal.findOne({where:{ eid: eid, user_id: user_id }})
        if (eventPermission.permissions != 'full' || eventPermission.permissions != 'read') 
            return res.status(200).send({ message: "You don't have valid permissions read for this event." })
        next();
        } catch (err) {
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again." })
    }
};

exports.hasEventFullPermission = (req, res) => {
    try {
        const { user_id } = req.user.uid
        const { eid } = req.params
        const eventPermission = await EventPrincipal.findOne({ eid: eid, user_id: user_id })
        if (eventPermission.permissions != 'full') 
            return res.status(200).send({ message: "You don't have valid permissions write for this event." })
        next()
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: "Something went wrong. Please try again." })
    }
};