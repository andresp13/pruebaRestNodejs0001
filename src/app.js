// inicializar express
const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyparser = require('body-parser');

// Settings
app.set('port',process.env.PORT || 10000);

// middleware
app.use(morgan('dev'));
app.use(bodyparser.json()); 

// routes
require('./routes/userRoutes')(app);

// static files


app.listen(app.get('port'),() => {
    console.log('Servidor en el puerto :', app.get('port'));
});