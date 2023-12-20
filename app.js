const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config')[process.env.NODE_ENV || 'development'];
const sequelize = require("./helpers/init_database")
const AuthRoute = require('./Routes/Auth.route')
const { verifyAccessToken } = require("./helpers/jwt_helper")
const log = config.log();
const app = express();
app.use(bodyParser.json())
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) 
        return val;
    if (port >= 0) 
        return port;
    return false;
}
const port = normalizePort(process.env.PORT || '3000');

sequelize.sync().then(() => {
    console.log("Connected to the database!!!!")
}).catch((err) => {
    console.error(err)
})


app.listen(port, () => {
    log.info("App listening on port " + port);
});

app.use('/api/v1/', AuthRoute)

app.use(verifyAccessToken)


app.all('*', (req, res, next) => {
    const err = new Error(`Requested URL ${req.path} not found!`, 404);
    err.statusCode = 404
    next(err)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    log.error({ err: err.stack });
    res.status(statusCode).json({
        success: false,
        message: err.message
    })
})
