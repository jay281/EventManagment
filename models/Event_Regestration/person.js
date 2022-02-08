const Sequelize = require('sequelize');
const db = require('../../config/database');
const User = require('../User/User');
const Event = require('../event/Event');


const E_Reg_Person = db.define('e_register_person', {
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
  }
});

E_Reg_Person.belongsTo(User,{foreignKey:'uid'});
E_Reg_Person.belongsTo(Event,{foreignKey : 'eid' });

E_Reg_Person.sync().then(() => {
    console.log('table created');
  });

module.exports = E_Reg_Person;