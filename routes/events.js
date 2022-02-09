const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const EventController = require('../controller/event');


router.post("/:id/event/create",checkAuth, checkAdmin,EventController.event_create);
router.put("/:cid/event/update/:id",checkAuth, checkAdmin,EventController.event_update);
router.post("/:cid/delete/:id",checkAuth, checkAdmin,EventController.event_delete);
router.get("/:id/events",checkAuth,checkAdmin,EventController.all_event);
router.get("/:cid/event/:id",checkAuth,checkAdmin,EventController.event_by_id);


module.exports=router;
