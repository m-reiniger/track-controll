"use strict";

var five = require("johnny-five"),
    board = new five.Board(),
    switchAdapter = require('./SwitchAdapter');


function BoardAdapter(){

}


BoardAdapter.prototype.init = function(){

    board.on("ready", function() {
        switchAdapter.init();
    });
};


module.exports = new BoardAdapter();