const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const AbstractController = require('../controller/abstract');


router.post("/:id/submit",checkAuth,AbstractController.abs_submit);
router.post("/:id/abstracts",AbstractController.abstract_by_id);
router.get("/search",checkAuth,checkAdmin,AbstractController.all_abstract);


module.exports=router;
