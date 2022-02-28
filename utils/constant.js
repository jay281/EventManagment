const TRANSPORTER_SERVICE = {
    service: 'Gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD
    }
}


module.exports = {
    TRANSPORTER_SERVICE: TRANSPORTER_SERVICE
}