const Sequelize = require('sequelize');
const db = require('../../config/database');
const Event = require('../event/Event')

const Event_Role = db.define('event_role', {
  roleid:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name:{
    type: Sequelize.STRING
  }

});

Event_Role.belongsTo(Event,{foreignKey : 'eid'});


Event_Role.sync().then(() => {
    console.log('table created');
  });

module.exports = Event_Role;