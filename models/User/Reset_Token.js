const Sequelize = require('sequelize');
const db = require('../../config/database');
const User =require('../User/User');

const Reset_Token = db.define('reset_token', {
  rtid:{
    type: Sequelize.INTEGER,
    autoIncrement : true,
    primaryKey:true
  },
  reset_pass_token:{
    type: Sequelize.STRING
  },
  expire_token:{
      type:Sequelize.DATE
  }
  
});

Reset_Token.belongsTo(User,{foreignKey : 'uid'});


Reset_Token.sync().then(() => {
    console.log('table created');
  });

module.exports = Reset_Token;