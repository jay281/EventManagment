const Sequelize = require('sequelize');
const db = require('../../config/database');
const Event = require('../event/Event');


const Event_Person = db.define('event_person', {
  perid:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  f_name:{
    type: Sequelize.STRING
  },
  l_name:{
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  title:{
      type:Sequelize.STRING
  },
  username:{
    type: Sequelize.STRING
  },
  address:{
    type: Sequelize.STRING
  },
  phone_no:{
    type: Sequelize.INTEGER
  },
  affiliation:{
    type: Sequelize.STRING
  },
  invited_dt:{
    type: Sequelize.DATEONLY
  }


});

Event_Person.belongsTo(Event,{foreignKey : 'eid' });

Event_Person.sync().then(() => {
    console.log('table created');
  });

module.exports = Event_Person;