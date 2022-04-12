const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/verifytoken');
const checkAdmin = require('../middleware/isAdmin');

const GroupMemberController = require('../controller/group_member');


router.post("/:gid/create",GroupMemberController.addGroupMember);
router.get("/:gid/members",GroupMemberController.viewGroupMember);
router.put("/:gid/update/:gmid",GroupMemberController.updateGroupMember);
router.post("/:gid/delete/:gmid",GroupMemberController.deleteGroupMember);

module.exports=router;
