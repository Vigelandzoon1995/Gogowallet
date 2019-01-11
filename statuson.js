var gpio = require('../rpi-gpio');
var request = require('request');
var pin = 18;
var token = ''
var headers = {
    'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': token
}


gpio.setup(pin, gpio.DIR_OUT, on);

function on() {
        gpio.write(pin, 1);
        var options = {
                url: 'http://145.24.222.187:3333/solenoid/state',
                method: 'POST',
                headers: headers,
                form: {'device_id': 1, 'solenoidstate': 1}
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        })
}
