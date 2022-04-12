const Sequelize = require('sequelize');
const db = require('../../config/database');

const Form = require('../../models/Event_Registration/forms');

const Form_items = db.define('form_items', {
  field_id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  type:{
    type: Sequelize.STRING
  },
  personal_data_type:{
    type: Sequelize.SMALLINT
  },
  position: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  is_deleted: {
    type: Sequelize.BOOLEAN
  },
  is_enabled: {
    type: Sequelize.BOOLEAN
  },
  is_required: {
    type: Sequelize.BOOLEAN
  },
  is_manager_only:{
    type: Sequelize.BOOLEAN
  },
  input:{
    type: Sequelize.STRING
  },
  data:{
    type: Sequelize.JSONB
  },
  current_data_id:{
    type: Sequelize.INTEGER
  }
  

});


Form_items.belongsTo(Form,{foreignKey : 'form_id'});



Form_items.sync().then(() => {
    console.log('table created');
  });

module.exports = Form_items;         