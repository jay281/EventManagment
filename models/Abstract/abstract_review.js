const Sequelize = require('sequelize');
const db = require('../../config/database');
const abs = require('../Abstract/Abstract');
const tk = require('../event/track');
const user = require('../User/User');


const Abs_review = db.define('abstract_review', {
  rid:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  proposed_action:{
    type:Sequelize.STRING
  },
  proposed_related_abstract_id:{
    type:Sequelize.INTEGER
  },
  reviewer_name:{
    type:Sequelize.STRING
  },
  submitted_date:{
    type:Sequelize.DATEONLY
  }
});

Abs_review.belongsTo(abs,{foreignKey:'absid'});
Abs_review.belongsTo(tk,{foreignKey:'trackid'});
Abs_review.belongsTo(user,{foreignKey:'uid'});


Abs_review.sync().then(() => {
    console.log('table created');
  });

module.exports = Abs_review;