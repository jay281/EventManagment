const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
  uid:{
    type: Sequelize.INTEGER,
    autoIncrement : true,
    primaryKey:true
  },
  fname:{
    type: Sequelize.STRING
  },
  lname:{
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  is_pending:{
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  is_admin:{
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});


User.sync().then(() => {
    console.log('table created');
  });

module.exports = User;