const Sequelize = require('sequelize');
const db = require('../../config/database');

const Form = require('../../models/Event_Registration/forms');

const Registration_data = db.define('registration_data', {
  registration_id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  data:{
    type: Sequelize.JSONB
  },
  filename:{
    type: Sequelize.STRING
  },
  content_type: {
    type: Sequelize.STRING
  },
  size: {
    type: Sequelize.BIGINT
  },
  md5: {
    type: Sequelize.STRING
  },
  storage_backend: {
    type: Sequelize.STRING
  },
  storage_file_id: {
    type: Sequelize.STRING
  }
});


Registration_data.belongsTo(Form,{foreignKey : 'form_id'});



Registration_data.sync().then(() => {
    console.log('table created');
  });

module.exports = Registration_data;