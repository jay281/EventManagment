const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const CatController = require('../controller/categorie');


router.post("/create",checkAuth,checkAdmin,CatController.categorie_create);
router.get("/search/:id",checkAuth,checkAdmin,CatController.cat_by_id);
router.get("/search",checkAuth,checkAdmin,CatController.all_cat);
router.put("/update/:id",checkAuth, checkAdmin,CatController.cat_update);
router.post("/delete/:id",checkAuth, checkAdmin,CatController.cat_delete);

module.exports=router;
