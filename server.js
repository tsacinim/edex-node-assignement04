// Imports
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const errorHandler = require('errorhandler')
const { accounts } = require('./routes');

// Instantiations
const app = express();
const url = process.env.URL || 'mongodb://localhost/accounts'
mongoose.connect(url, { useMongoClient: true, autoReconnect:true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.once('open', function() {console.log('DB successfully connected')});
db.on('disconnected', function() {
  console.log('MongoDB disconnected!');
  mongoose.connect(dbURI, { useMongoClient: true, autoReconnect:true});
});
db.on('error', console.error.bind(console, 'connection error:'));

// Configurations
if (process.env.NODE_ENV === 'testing') {
  app.set('port', process.env.PORT || 3001);
} else {
  app.set('port', process.env.PORT || 3000);
}

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());

// Custom middleware
const middleware = (request, response, next) => {
  // Process request/response
  // console.log('Applied custom middleware');
  // Execute the callback when done
  next();
}
app.use(middleware);

// GET / index/home route
app.get('/', (req, res)=>{
  res.send('Hello world! \n try a route, for example: \n /accounts');
});

// GET and POST /posts
app.get('/accounts', accounts.getAccounts)
app.post('/accounts', accounts.addAccount)
// PUT DELETE and GET /accounts/:accountId/
app.get('/accounts/:accountId', accounts.getOneAccount)
app.put('/accounts/:accountId', accounts.updateAccount)
app.delete('/accounts/:accountId', accounts.removeAccount)

// Error handlers // only use in development
if (process.env.NODE_ENV === 'development') { 
  app.use(errorHandler()) }

// Bootup
app.listen(app.get('port'), 
  () => console.log(`Server listening at port: ${app.get('port')}`));

// Module exports 
module.exports = app; 