const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// const multer = require('multer');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use('/uploads', express.static('uploads'));

app.use(express.static('public'));
app.use(cors());


const mainRoutes = require('./routes');

app.use('/images', express.static(path.join(__dirname, 'uploads', 'category')));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

app.use('/', mainRoutes);
module.exports = app;

// test