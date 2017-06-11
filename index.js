import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import { port, redisConfig } from './config/sys.config';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
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
app.use((err, req, res, next)=> {
    res.status(err.status || 500);
    res.json({
        code: err.status || 500,
        msg: err.message
    });
});

// production error handler
// no stacktraces leaked to user
if (process.argv.indexOf('--production') > -1) {
    app.use((err, req, res, next)=> {
        res.status(err.status || 500);
        res.json({
            code: err.status || 500,
            msg: "服务器内部错误"|| err.message
        });
    });
}

app.listen(port, () => {
    console.log(`==> Listening at http://localhost:${port}`);
});

module.exports = app;

