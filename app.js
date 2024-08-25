const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


// express app
const app = express();

// connect to mongodb & listen for requests
const dburi =
  "mongodb+srv://noderami:helloworld@cluster0.ro21q.mongodb.net/node-test?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dburi)
  .then((result) => {app.listen(3000)
console.log('is connected to cluster')})
  .catch((err) => console.log("error connecting"));


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//app routes
app.use('/blogs/', blogRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});