const connectDB = require('./config/db');
connectDB();

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const cookieParser = require('cookie-parser');

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts')
}));

app.use(cookieParser());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./routes/userRoutes.js');
app.use('/', userRoutes);

module.exports = app;
