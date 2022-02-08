const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const RoleController = require('../controller/cat_role');


router.post("/create",checkAuth,checkAdmin,RoleController.role_create);
router.get("/search/:id",checkAuth,checkAdmin,RoleController.role_by_id);
router.get("/search",checkAuth,checkAdmin,RoleController.all_role);
router.put("/update/:id",checkAuth, checkAdmin,RoleController.role_update);
router.post("/delete/:id",checkAuth, checkAdmin,RoleController.role_delete);

module.exports=router;
