import path from 'path';
import log4js from 'log4js';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';

import { port, redisConfig } from './config/sys.config';
import routes from './routes';
import { setSocket } from './service';

// init log4js
log4js.configure('./config/log4js.json');
const log = log4js.getLogger('app');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const RedisStore = connectRedis(session);

io.on('connection', socket => {
    setSocket(socket);
    socket.emit('clientTest'); 
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    name: 'SSID',
    secret: 'kash-api',
    resave: false,
    saveUninitialized: true,
    store: new RedisStore(redisConfig)
}))

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
})
app.use('/', routes);

app.get('/', (req, res, next) => {
    let env = process.argv.indexOf('--production') > -1 ? 'production' : 'development';
    res.send(`hello api ${env}!`);
})

// catch 404 and forward to error handler
app.use((req, res, next)=> {
    var err = new Error('资源没有找到');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.argv.indexOf('--production') < 0) {
    app.use((err, req, res, next)=> {
        log.error('route error: ', err, req.path);
        res.status(err.status || 500);
        res.json({
            code: err.status || 500,
            msg: err.message
        });
    });
}   

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next)=> {
    log.error('route error: ', err, req.path);
    res.status(err.status || 500);
    res.json({
        code: err.status || 500,
        msg: "服务器内部错误"|| err.message
    });
});

server.listen(port, () => {
    console.log(`==> Listening at http://localhost:${port}`);
    log.info(`Express server listening on port ${port} with pid ${process.pid}`)
});

module.exports = server;

