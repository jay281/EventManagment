const Sequelize = require('sequelize');
const db = require('../../config/database');

const Form_item = require('../../models/Event_Registration/form_items');

const Form_field_data = db.define('form_field_data', {
  form_field_data_id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  versioned_data:{
    type: Sequelize.JSONB
  }
  
});


Form_field_data.belongsTo(Form_item,{foreignKey : 'field_id'});



Form_field_data.sync().then(() => {
    console.log('table created');
  });

module.exports = Form_field_data;