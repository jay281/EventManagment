const Sequelize = require('sequelize');
const db = require('../../config/database');
const Cat = require('../categorie/categorie')

const Cat_Role = db.define('categorie_role', {
  roleid:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name:{
    type: Sequelize.STRING
  }

});

Cat_Role.belongsTo(Cat,{foreignKey : 'catid'});


Cat_Role.sync().then(() => {
    console.log('table created');
  });

module.exports = Cat_Role;