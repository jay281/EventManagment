const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const EventAbsTrackController = require('../controller/event_abstract_track');



router.get("/search/:id",checkAuth,checkAdmin,EventAbsTrackController.track_by_id);
router.get("/search",checkAuth,checkAdmin,EventAbsTrackController.all_event_tracks);
router.post("/search",checkAuth,checkAdmin,EventAbsTrackController.track_by_title);


module.exports=router;