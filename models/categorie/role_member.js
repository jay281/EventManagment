const Sequelize = require('sequelize');
const db = require('../../config/database');
const Role = require('../categorie/role');
const User = require('../User');

const Cat_Role_member = db.define('categorie_role_member', {

});

Cat_Role_member.belongsTo(Role,{foreignKey : 'roleid'});
Cat_Role_member.belongsTo(User,{foreignKey : 'uid'});


Cat_Role_member.sync().then(() => {
    console.log('table created');
  });

module.exports = Cat_Role_member;