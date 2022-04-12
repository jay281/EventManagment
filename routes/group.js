const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const GroupController = require('../controller/group');


router.post("/create",GroupController.createGroup);
router.get("/",GroupController.viewGroup);
router.put("/update/:gid",GroupController.updateGroup);
router.post("/delete/:gid",GroupController.deleteGroup);

module.exports=router;
