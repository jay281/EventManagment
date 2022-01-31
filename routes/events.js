const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const EventController = require('../controller/event');


router.post("/create",checkAuth, checkAdmin,EventController.event_create);
router.put("/update/:id",checkAuth, checkAdmin,EventController.event_update);
router.post("/delete/:id",checkAuth, checkAdmin,EventController.event_delete);
router.get("/",checkAuth,checkAdmin,EventController.all_event);
router.get("/:id",checkAuth,checkAdmin,EventController.event_by_id);


module.exports=router;
