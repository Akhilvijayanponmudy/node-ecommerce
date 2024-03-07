const express =require('express');
const app=express();

const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors'); // Import the cors middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cors());
app.use('/uploads', express.static('uploads'));

const productsRouter=require('./products/prodcutsRoutes');
const homeRoute=require('./home/homeRotes');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set the filename to avoid conflicts
  },
});



app.use('/',homeRoute);
app.use('/products',productsRouter);

module.exports=app;