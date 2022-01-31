const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const EventRegController = require('../controller/e_register');


router.post("/:id/register",checkAuth,EventRegController.event_reg);
router.get("/search/:id",checkAuth,checkAdmin,EventRegController.registration_by_id);
router.get("/search",checkAuth,checkAdmin,EventRegController.all_registration);


module.exports=router;
