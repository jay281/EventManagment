const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const FormController = require('../controller/form');


router.post("/:eid/forms/create",FormController.createForm);
router.post("/:eid/update/:formid",FormController.updateForm);
router.post("/:eid/delete/:formid",FormController.deleteForm);
router.get('/:eid/allforms',FormController.allForm);
router.get("/:eid/getRegForm/items",FormController.viewFormItems);
router.get("/:eid/forms/:fid",FormController.viewForm);

module.exports=router;
