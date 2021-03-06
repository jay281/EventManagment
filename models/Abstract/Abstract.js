const Sequelize = require('sequelize');
const db = require('../../config/database');
const Event = require('../../models/event/Event');

const Abstract = db.define('abstract', {
  absid:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  title:{
    type: Sequelize.STRING
  },
  comments:{
    type: Sequelize.STRING
  },
  submission_comment: {
    type: Sequelize.STRING
  },
  submitted_dt:{
      type: Sequelize.DATEONLY
  },
  state:{
    type: Sequelize.INTEGER,
    defaultValue:0
  },
  contribution_type:{
    type: Sequelize.STRING
  },
  modified_by:{
    type: Sequelize.STRING
  },
  modified_dt:{
    type: Sequelize.DATEONLY
  },
  judge_id:{
    type: Sequelize.INTEGER
  },
  judgement_dt:{
    type: Sequelize.DATEONLY
  },
  judgement_comment:{
    type: Sequelize.STRING
  },
  accepted_contribution_id:{
    type: Sequelize.INTEGER
  },

});

Abstract.belongsTo(Event,{foreignKey : 'eid'});


Abstract.sync().then(() => {
    console.log('table created');
  });

module.exports = Abstract;