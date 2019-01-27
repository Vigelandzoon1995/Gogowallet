const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
const util = require('util');
var gpio = require('rpi-gpio');
var pin = 18;
var request = require('request');
var token = '';
var headers = {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': token
};

app = express();


function checking(Status, pinValue) {
        if (Status == 1 && pinValue == 0) {
                console.log("need to change permission to on");
                gpio.setup(pin, gpio.DIR_OUT, on);
        }
        else if (Status == 0 && pinValue == 1) {
                console.log("need to change permission to off");
                gpio.setup(pin, gpio.DIR_OUT, off);
        }

}

function checkStatus() {

        var options = {
                url: 'https://osirris.nl/solenoid/status/get?device_id=1',
                method: 'GET',
                headers: headers,
                rejectUnauthorized: false
        }

        return new Promise(resolve => {
                request(options, function (error, response, body) {

                        if (!error && response.statusCode == 200) {

                                resolve(body);
                        }
                })
        });

}

function checkPin() {

        var options = {
                url: 'https://osirris.nl/solenoid/pin/get?device_id=1',
                method: 'GET',
                headers: headers,
                rejectUnauthorized: false
        }

        return new Promise(resolve => {
                request(options, function (error, response, body) {

                        if (!error && response.statusCode == 200) {

                                 resolve(body);
                        }
                })
        });

}
function on() {

        gpio.write(pin, 1);
        var options = {
                url: 'https://osirris.nl/solenoid/pin/set',
                method: 'POST',
                headers: headers,
                form: { 'device_id': 1, 'pin': 1 },
                rejectUnauthorized: false
        }
        request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                        console.log(body)
                }
        })
}

function off() {
        gpio.write(pin, 0);
        var options = {
                url: 'https://osirris.nl/solenoid/pin/set',
                method: 'POST',
                headers: headers,
                form: { 'device_id': 1, 'pin': 0 },
                rejectUnauthorized: false
        }
        request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                        console.log(body)
                }
        })
}

cron.schedule("*/1 * * * * *", async function () {
        console.log("running a task every minute");
        var Status = await checkStatus();
        var pinValue = await checkPin();
        console.log("Status: " + Status);
        console.log("Pin: "+ pinValue);
        checking(Status, pinValue);
});

app.listen(3128);
