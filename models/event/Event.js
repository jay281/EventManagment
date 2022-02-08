const Sequelize = require('sequelize');
const db = require('../../config/database');
const cat = require('../categorie/categorie');

const Event = db.define('event', {
  eid:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  title: {
    type: Sequelize.STRING
  },
  e_type: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  start_time: {
    type: Sequelize.TIME
  },
  end_time: {
    type: Sequelize.TIME
  },
  address: {
    type: Sequelize.STRING
  },
  room_id: {
    type: Sequelize.INTEGER
  },
  room_name: {
    type: Sequelize.STRING
  },
  veneue_id: {
    type: Sequelize.INTEGER
  }
});

Event.belongsTo(cat,{foreignKey : 'catid'});

Event.sync().then(() => {
    console.log('table created');
  });

module.exports = Event;