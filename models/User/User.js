const Sequelize = require('sequelize');
const db = require('../../config/database');

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
  dob: {
    type: Sequelize.DATEONLY
  },
  address_line1: {
    type: Sequelize.STRING
  },
  address_line2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  primary_phone_number: {
    type: Sequelize.INTEGER
  },
  alternative_phone_number: {
    type: Sequelize.INTEGER
  },
  alternative_email_address: {
    type: Sequelize.STRING
  },
  username: {
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