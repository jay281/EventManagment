const Sequelize = require('sequelize');
const db = require('../../config/database');
const Event_track = require('../event/track');
const T_group = require('../event/track_group');

const Track_Principal = db.define('track_principal', {
  tpid:{
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
  }

});

Track_Principal.belongsTo(Event_track,{foreignKey : 'trackid'});
//Event_track.belongsTo(T_group,{foreignKey : 'tgroupid'});


Track_Principal.sync().then(() => {
    console.log('table created');
  });

module.exports = Track_Principal;