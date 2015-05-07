"use strict";

var five = require("johnny-five");
var board = new five.Board();


// accept the pin number as cmd argument
// node switch.js 2 would access pin 2
var pin = process.argv[2];
console.log(pin);

board.on("ready", function() {
    var relay = new five.Relay(pin);

    // turn the relay on
    relay.on();
    setTimeout(function(){

        // turn it off again after 300ms since the track switch should have changed by now
        relay.off();
        process.exit();
    }, 300);
});