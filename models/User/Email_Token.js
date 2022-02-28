const Sequelize = require('sequelize');
const db = require('../../config/database');
const User =require('../User/User');

const Email_Token = db.define('email_token', {
  etid:{
    type: Sequelize.INTEGER,
    autoIncrement : true,
    primaryKey:true
  },
  email_token:{
    type: Sequelize.STRING
  },
  expire_token:{
      type:Sequelize.DATE
  }
  
});

Email_Token.belongsTo(User,{foreignKey : 'uid'});


Email_Token.sync().then(() => {
    console.log('table created');
  });

module.exports = Email_Token;