const Sequelize = require('sequelize');
const db = require('../../config/database');
const Event = require('../event/Event')

const Event_Track_Group = db.define('event_track_group', {
  tgroupid:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  title:{
    type: Sequelize.STRING
  },
  description:{
    type: Sequelize.STRING
  },
  position:{
    type:Sequelize.STRING
  }

});

Event_Track_Group.belongsTo(Event,{foreignKey : 'eid'});


Event_Track_Group.sync().then(() => {
    console.log('table created');
  });

module.exports = Event_Track_Group;