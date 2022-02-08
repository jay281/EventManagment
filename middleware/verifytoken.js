const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};

// module.exports = (req,res,next) =>{
//     const token = req.cookies.access_token;
//     if (!token) {
//         return res.sendStatus(403);
//     }
//     try {
//         const data = jwt.verify(token, process.env.JWT_KEY);
//         req.user = data;
//         next();
//     } catch (error) {
//         return res.status(401).json({
//         message: 'Auth failed'});
//     }
// };

// module.exports = (req, res, next) => {
//     const t_verify = req.cookies.jwt
//     console.log(t_verify);
//     if(!t_verify) return res.status(401).send("Access Denied")
//     try {
//         try {
//             const user = (JSON.parse(atob(t_verify.split('.')[1])))
//             req.user = user
//             console.log(req.user);

//         } catch (e) {
//             return res.status(400).send("Something went wrong")
//         }
//         next()
//     } catch (err) {
//         return res.status(403).send('Invalid Token')
//     }
// };

// module.exports = (req,res,next) =>{
//     const token = req.header("auth-token");
//     if (!token) return res.status(401).send("Access denied");

//     try {
//         const verified = jwt.verify(token, process.env.JWT_KEY);
//         req.user = verified;
//         console.log('Am i admin?', req.user.is_admin);
//         next();
//     } catch (err) {
//         res.status(400).send("Invalid token");
//     }
// };

