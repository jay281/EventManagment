const Sequelize = require('sequelize');
const db = require('../../config/database');

const Event = require('../../models/event/Event');

const Form = db.define('form', {
  form_id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  title:{
    type: Sequelize.STRING
  },
  is_participation:{
    type: Sequelize.BOOLEAN
  },
  introduction: {
    type: Sequelize.STRING
  },
  contact_info: {
    type: Sequelize.STRING
  },
  start_dt: {
    type: Sequelize.DATEONLY
  },
  end_dt: {
    type: Sequelize.DATEONLY
  },
  modification_mode: {
    type: Sequelize.SMALLINT
  },
  modification_end_dt: {
    type: Sequelize.DATEONLY
  },
  is_deleted:{
    type: Sequelize.BOOLEAN
  },
  require_login:{
    type: Sequelize.BOOLEAN
  },
  require_user:{
    type: Sequelize.BOOLEAN
  },
  registration_limit:{
    type: Sequelize.INTEGER
  },
  publish_registration_enabled:{
    type: Sequelize.BOOLEAN
  },
  publish_registration_count:{
    type: Sequelize.STRING
  },
  publish_checkin_enabled:{
    type: Sequelize.BOOLEAN
  },
  moderation_enabled:{
    type: Sequelize.BOOLEAN
  },
  base_price:{
    type:Sequelize.INTEGER
  },
  currency:{
    type:Sequelize.STRING
  },
  notification_sender_address:{
      type:Sequelize.STRING
  }
  

});


Form.belongsTo(Event,{foreignKey : 'eid'});



Form.sync().then(() => {
    console.log('table created');
  });

module.exports = Form;         