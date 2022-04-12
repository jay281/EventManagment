const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const EventController = require('../controller/event');
const ReminderController = require('../controller/send_reminder');

router.post("/:id/events/create",checkAuth, checkAdmin,EventController.event_create);
router.put("/:cid/event/update/:id",checkAuth, checkAdmin,EventController.event_update);
router.post("/:cid/delete/:id",checkAuth, checkAdmin,EventController.event_delete);
router.get("/list",EventController.all_event);
router.get("/:id",EventController.event_by_id);
router.get("/:eid/sendnotification",ReminderController.sendReminder);


router.post("/:eid/permissions/set",  EventController.SetEventPermission)
router.put("/:eid/permissions/update/:epid",  EventController.UpdateEventPermission)
router.post("/:eid/permissions/delete/:epid", EventController.DeleteEventPermission)

module.exports=router;
