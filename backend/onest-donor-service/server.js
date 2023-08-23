'use strict';

var Http = require('http');
var Express = require('express');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var Path = require('path');
var cors = require('cors');
var App = Express();

var Server = Http.createServer(App);

App.use(cors());
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
    extended: true
}));

App.use(Swaggerize({
    api: Path.resolve('./config/swagger.json'),
    handlers: Path.resolve('./handlers')
}));

App.use(function(err, req, res, next) {
    console.error("Error occurred for ")
    console.error("URL: ", req.url)
    // if (config.LOG_LEVEL === "DEBUG") {
    //     console.error("BODY: ", req.body)
    //     console.error("HEADERS: ", req.headers)
    // }
    if (err && err?.name === "AxiosError") {
        res.status(err?.response?.status || 400).send({
            "status": err?.response?.data?.params?.status,
            "message": err?.response?.data?.params?.errmsg,
            "responseCode": err?.response?.data?.responseCode
        })
    } else {
        res.status(500).send({
            "status": err?.code,
            "message": err?.message
        });
    }
});


Server.listen(8000, function () {
    App.swagger.api.host = this.address().address + ':' + this.address().port;
    /* eslint-disable no-console */
    console.log('App running on %s:%d', this.address().address, this.address().port);
    /* eslint-disable no-console */
});
