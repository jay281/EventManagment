const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const morgan = require("morgan");
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const cors=require('cors');
const path = require('path');
dotenv.config();



const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'tmp'),
  createParentPath: true
}))

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))



const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const eventRegRoutes =require('./routes/e_register');
const absRoutes =require('./routes/abstracts');
const catRoutes = require('./routes/categorie'); 
const roleRoutes = require('./routes/role');
const eventregperRoutes = require('./routes/event_reg_person');
const eventAbsTrackRoutes = require('./routes/event_abs_track');
const eventPerRoutes = require('./routes/event_person');
const absReviewRoutes = require('./routes/abstract_review')
const authRoutes = require('./routes/auth')

app.use("/user", userRoutes);
app.use("/events",eventRoutes);
app.use("/category",eventRoutes);
app.use("/events",eventRegRoutes);
app.use("/events",absRoutes);
app.use("/categorie",catRoutes);
app.use("/role",roleRoutes);
app.use("/events/reg/person",eventregperRoutes);  
app.use("events/track",eventAbsTrackRoutes);
app.use("/events",eventPerRoutes);
app.use("/events/track",absReviewRoutes);
app.use("/",authRoutes);


app.get('/', (req, res) => res.send("Hello"));



//app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports =app;