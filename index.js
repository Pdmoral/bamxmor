const express = require('express');
const config = require('./config/jwt');
const middleware = require('./middleware/jwt-middleware');
const api = require('./routes/api');
const login = require('./routes/login');
const index = require('./routes/index');

const cors = require('cors');
const bodyParser = require('body-parser');

const host = '0.0.0.0';
const port = process.env.PORT || 3000;
const app = express(); 



app.use(cors());
app.use(bodyParser.json({limit: '900mb'}));
app.set("key", config.key);


//app.use('/public', express.static('public'));
app.use('/public', express.static(__dirname + '/public'));

//HTML routes
app.use('', index);


//API routes
app.use('/api', middleware, api);
// app.use('/api', api);
app.use('/login', login);


app.use(bodyParser.urlencoded({limit: '20mb',parameterLimit: 100000,extended: false}));
app.use(express.static(__dirname + '/frontend'));

/*app.get('/', (req, res) => {
    res.send("Hi from express server!");
});*/

app.listen(port, () => {
    console.log('El servidor inicio en el puerto ' + port);
});