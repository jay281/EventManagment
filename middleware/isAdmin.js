const User = require('../models/User/User');

// module.exports = async (req,res,next) =>{
//         try {
//             const { user_email } = req.user
//             const user = await User.findOne({ where: {email: user_email } })
//             if (!user.is_admin) return res.status(200).send({ message: "Invalid right to view access this webpage." })
//         } catch (err) {
//             console.log(err)
//             res.status(400).send({ error: "Something went wrong. Please try again." })
//         }
// };

module.exports =async (req,res,next)=>{
    if (!req.user.is_admin)
        return res.status(401).send({ msg: "Not an admin, sorry" });
    next();
};