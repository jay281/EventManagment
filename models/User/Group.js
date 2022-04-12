const Sequelize = require('sequelize');
const db = require('../../config/database');


const Group = db.define('group', {
  groupid:{
    type: Sequelize.INTEGER,
    autoIncrement : true,
    primaryKey:true
  },
  group_name:{
    type: Sequelize.STRING
  }
  
});



Group.sync().then(() => {
    console.log('table created');
  });

module.exports = Group;