const Sequelize = require('sequelize');
const db = require('../../config/database');
const tk = require('../event/track')


const Pro_for_Track = db.define('proposed_for_track', {
  reviewid:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  }
});

Pro_for_Track.belongsTo(tk,{foreignKey:'trackid'});

Pro_for_Track.sync().then(() => {
    console.log('table created');
  });

module.exports = Pro_for_Track;