const express =require('express');
const app=express();

const userRoutes=require('./User/userRoutes')
const adminRoutes=require('./Admin/AdminRoutes')


app.use('/',userRoutes);
app.use('/admin',adminRoutes);

module.exports=app;