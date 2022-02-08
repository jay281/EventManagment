const Sequelize = require('sequelize');
const db = require('../../config/database');


const Categorie = db.define('categorie', {
  catid:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  parent_cid:{
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  title:{
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  protection_mode:{
    type: Sequelize.STRING
  },
  is_deleted:{
    type: Sequelize.BOOLEAN,
    defaultValue : false
  },
  visibility:{
    type: Sequelize.STRING
  }

});

Categorie.sync().then(() => {
    console.log('table created');
  });

module.exports = Categorie;