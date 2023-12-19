const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config')[process.env.NODE_ENV || 'development'];

const app = express();
const log = config.log();
app.use(bodyParser.urlencoded({ extended: true }));

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
const port = normalizePort(process.env.PORT || '3000');
app.listen(port, () => {
    log.info("App listening on port " + port);
});


app.all('*', (req, res, next) => {
    const err= new Error(`Requested URL ${req.path} not found!`, 404);
    err.statusCode=404
    next(err)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    log.error({err:err.stack});
    res.status(statusCode).json({
        success: 0,
        message: err.message,
        stack: err.stack
    })
})
