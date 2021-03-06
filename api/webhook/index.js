
(function (){
    'use strict';

    const express = require("express")
        , helpers = require("../../helpers")
        , app = express()
        , axios = require('axios');

    app.get("/webhook", function (req, res, next) {
        console.log("ciao");
        console.log("we bello")
        res.send(req.body)
        //helpers.simpleHttpRequest(endpoints.webhook, res, next);
    });

    app.post('/webhookgithub', function(req, res, next){
        console.log(req.headers);
        // your JSON
        res.send(req.body);    // echo the result back
        axios
            .post('https://master.unisannio.local:8443/apis/build.openshift.io/v1/namespaces/asia/buildconfigs/openshift-jee-sample/webhooks/0531c678c828ba74/github',
                req.body)
            .then(inner_res => {
                res.send(inner_res);
            })
            .catch(error => {
                console.error(error)
            })
    });

    module.exports = app;
}());