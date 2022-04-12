const Sequelize = require('sequelize');
const db = require('../../config/database');
const Group = require('../../models/User/Group');

const Group_member = db.define('group_member', {
  gmemberid:{
    type: Sequelize.INTEGER,
    autoIncrement : true,
    primaryKey:true
  },
  group_member_name:{
      type:Sequelize.STRING
  }
  
});

Group_member.belongsTo(Group,{foreignKey : 'groupid'});


Group_member.sync().then(() => {
    console.log('table created');
  });

module.exports = Group_member;