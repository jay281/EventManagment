const Sequelize = require('sequelize');
const db = require('../../config/database');
const Event = require('../event/Event');
const T_group = require('../event/track_group');

const Event_track = db.define('event_track', {
  trackid:{
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
    type: Sequelize.INTEGER
  }

});

Event_track.belongsTo(Event,{foreignKey : 'eid'});
//Event_track.belongsTo(T_group,{foreignKey : 'tgroupid'});


Event_track.sync().then(() => {
    console.log('table created');
  });

module.exports = Event_track;