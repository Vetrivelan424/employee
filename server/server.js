const CONFIG = require('./src/config/config');
const express = require("express");
const cors = require("cors");
const HttpException = require('./src/utils/HttpException.utils');
const errorMiddleware = require('./src/middleware/error.middleware');
const logger            = require('./src/helper/winston-loggers');

const compression = require('compression');

// Init express
const app = express();
// Init environment
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// Apply compression middleware to compress all responses
app.use(compression());

// enabling cors for all requests by using cors middleware
app.use(cors());

// Enable pre-flight
app.options("*", cors());

app.use(function (req, res, next) {    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods to allow
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Refresh_Authorization, Activation_Token, Reset_Token, User_Access_Token, Content-Type');
    // Set to true if the website needed to include cookies in the requests sent
    res.setHeader('Access-Control-Allow-Credentials', false);
    //set default header content type
    //if(req.path !== '/docs' && req.path !== '/docs/')
    res.setHeader('Content-Type', 'application/json');
    // Pass to next layer of middleware
    next();
});

const port = Number(CONFIG.PORT || 4000);

var https        = require('https');
var fs           = require('fs');

if(CONFIG.NODE_ENV !== 'LOCAL')
{
    var options = {
        key: fs.readFileSync(CONFIG.SSL_KEY),
        cert: fs.readFileSync(CONFIG.SSL_CERT),
        ca: fs.readFileSync(CONFIG.SSL_CA)
    };
    var server = https.createServer(options,app);
}else{
    var http = require('http');
    var server = http.createServer(app);
}

    app.set('port', port);
    server.listen(port, () => {console.log('server listening on port '+ port)});

app.use((err, req, res, next) => {
  logger.error(`Error server occurred: ${err}`);
});


// app.use(PageNotFoundMiddleware);

Router = require('./src/routes/index')
app.use(`/api/v1`, Router);
// Middleware to log HTTP method and path for each request

// app.use(loggers.exceptionMiddleware);
// 404 error
app.all('*', (req, res, next) => { 
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

module.exports = app;
