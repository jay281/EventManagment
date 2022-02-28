const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const trackController = require('../controller/track');


router.post("/:eid/tracks/create",trackController.Create_track);
router.get("/:eid/tracks",trackController.ViewTrack);
router.put("/:eid/tracks/:tid/update",trackController.UpdateTrack);
router.post("/:eid/tracks/:tid/delete",trackController.DeleteTrack);


router.post("/tracks/:tid/permissions/set",trackController.SetTrackPermission);
router.put("/tracks/:tid/permissions/update",trackController.UpdateTrackPermission);
router.post("/tracks/:tid/permissions/delete", trackController.DeleteTrackPermission);

module.exports=router;
