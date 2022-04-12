const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const FormItemController = require('../controller/form_items');


router.post("/:eid/:fid/create",FormItemController.createFormItem);
router.put("/:eid/:fid/update",FormItemController.updateFormItem);
router.post("/:eid/:fid/delete",FormItemController.deleteFormItem);

module.exports=router;
