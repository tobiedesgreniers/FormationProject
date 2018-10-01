// Imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');

const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');
//const authRouter = require('./server/routes/auth');
//const auth0entication = require('./server/auth0/auth0entication')

// Parsers
app.use(bodyParser.json());

app.use(cors());

// API location for routing
app.use('/', api);

//app.use('/', authRouter);

//app.use(express.static(path.join(__dirname, 'dist')));

// Setting Port
const port = process.env.PORT || '3000';
app.set('port', port);


// const server = http.createServer(app);

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});