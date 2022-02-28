const nodeMailer = require("nodemailer")
const constants = require('../utils/constant')

module.exports = nodeMailer.createTransport(constants.TRANSPORTER_SERVICE)
