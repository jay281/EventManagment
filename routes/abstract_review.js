const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const AbsReviewController = require('../controller/abstract_review');


router.post("/:id/review/submit",checkAuth,AbsReviewController.abs_review_create);



module.exports=router;
