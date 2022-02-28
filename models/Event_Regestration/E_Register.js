const Sequelize = require('sequelize');
const db = require('../../config/database');
const User = require('../../models/User/User');
const Event = require('../../models/event/Event');

const E_Register = db.define('e_register', {
  regid:{
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
  }
});

// User.hasMany(E_Register,{
//   foreignKey:{
//     type:Sequelize.INTEGER,
//     allowNull: false
//   }
// }); 
E_Register.belongsTo(User,{foreignKey : 'uid'});

// Event.hasMany(E_Register,{
//   foreignKey:{
//     type:Sequelize.INTEGER,
//     allowNull: false
//   }
// });
E_Register.belongsTo(Event,{foreignKey : 'eid' });

E_Register.sync().then(() => {
    console.log('table created');
  });

module.exports = E_Register;