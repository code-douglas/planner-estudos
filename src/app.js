const connectDB = require('./config/db');
connectDB();

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const cookieParser = require('cookie-parser');

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}));

app.use(cookieParser());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./routes/userRoutes.js');
const plansRoutes = require('./routes/plansRoutes.js');

app.use('/', userRoutes);
app.use('/', plansRoutes);

module.exports = app;
