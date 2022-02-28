const Sequelize = require('sequelize');
const db = require('../../config/database');
const Event = require('../event/Event');
const T_group = require('../event/track_group');

const Event_Principal = db.define('event_principal', {
  epid:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  permissions:{
    type: Sequelize.ENUM("none","read","full"),
    defaultValue: "none"
  },
  type:{
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  local_group_id: {
    type: Sequelize.INTEGER
  },
  event_role_id: {
    type: Sequelize.INTEGER
  },
  cat_role_id:{
    type:Sequelize.INTEGER
  },
  email:{
      type:Sequelize.STRING
  }

});

Event_Principal.belongsTo(Event,{foreignKey : 'eid'});
//Event_track.belongsTo(T_group,{foreignKey : 'tgroupid'});


Event_Principal.sync().then(() => {
    console.log('table created');
  });

module.exports = Event_Principal;