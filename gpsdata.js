// var file = '/dev/cu.usbserial';
// var file = '/dev/ttyUSB0';
//var file = '/dev/tty.usbserial';
var file = '/dev/serial0';

const SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

const port = new SerialPort(file, {
    baudRate: 9600
});

port.pipe(parser);

var GPS = require('../gps.js');
var date = require('date-and-time')
var now = new Date();
var gps = new GPS;

var lat1;
var lon1;
var timedate;
var request = require('request');
var token = ''
var headers = {
    'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': token
}

gps.on('data', function (data) {
    lat1 = gps.state.lat;
    lon1 = gps.state.lon;
    timedate = date.format(now, 'DD/MM/YYYY HH:mm');
});

parser.on('data', function (data) {
    gps.update(data);
});


setInterval(function () {
if (lat1 != null && lon1 != null && timedate != null) {
var options = {
    url: 'https://osirris.nl:3333/gps/create',
    method: 'POST',
    headers: headers,
    form: { 'lat': lat1, 'long': lon1, 'time': timedate }
}

request(options, function (error, response, body) {

            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        })
    }
}, 60000)
