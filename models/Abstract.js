const Sequelize = require('sequelize');
const db = require('../config/database');
const Event = require('../models/Event');

const Abstract = db.define('abstract', {
  absid:{
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
  submission_comment: {
    type: Sequelize.STRING
  },
  submitted_dt:{
      type: Sequelize.DATE
  }

});

Abstract.belongsTo(Event,{foreignKey : 'eid'});


Abstract.sync().then(() => {
    console.log('table created');
  });

module.exports = Abstract;