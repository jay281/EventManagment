const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const EventController = require('../controller/event');


router.post("/:id/events/create",checkAuth, checkAdmin,EventController.event_create);
router.put("/:cid/event/update/:id",checkAuth, checkAdmin,EventController.event_update);
router.post("/:cid/delete/:id",checkAuth, checkAdmin,EventController.event_delete);
router.get("/list",EventController.all_event);
router.get("/:id",EventController.event_by_id);


router.post("/:eid/permissions/set", checkAuth,checkAdmin, EventController.SetEventPermission)
router.put("/:eid/permissions/update", checkAuth,checkAdmin, EventController.UpdateEventPermission)
router.post("/:eid/permissions/delete", checkAuth,checkAdmin, EventController.DeleteEventPermission)

module.exports=router;
