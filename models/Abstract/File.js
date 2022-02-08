const Sequelize = require('sequelize');
const db = require('../../config/database');
const Abstract = require('../../models/Abstract/Abstract');

const File = db.define('file', {
  fileid:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  filename:{
    type: Sequelize.STRING
  },
  content_type:{
    type: Sequelize.STRING
  },
  size: {
    type: Sequelize.INTEGER
  },
  mimetype:{
    type: Sequelize.STRING
  },
  md5:{
    type: Sequelize.STRING
  },
  storage_file_path:{
    type:Sequelize.STRING
  }

});

File.belongsTo(Abstract,{foreignKey : 'abs_id'});


File.sync().then(() => {
    console.log('table created');
  });

module.exports = File;