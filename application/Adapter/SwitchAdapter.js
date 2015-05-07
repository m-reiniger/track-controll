"use strict";


var five = require("johnny-five");


function SwitchAdapter() {
}


SwitchAdapter.prototype.init = function(){
    this.switchConfig = require('../Config/switches.json');
    this.switchStatus = this.switchConfig;

    var ids = Object.keys(this.switchConfig);
    for(var i = 0, len = ids.length; i < len; i++){

        var pinLeftId = this.switchConfig[ids[i]].left,
            pinLeft = new five.Relay(pinLeftId),
            pinRightId = this.switchConfig[ids[i]].right,
            pinRight = new five.Relay(pinRightId)

        this.switchStatus[ids[i]].pins = {};
        this.switchStatus[ids[i]].pins.left = pinLeft;
        this.switchStatus[ids[i]].pins.right = pinRight;

        this.changeSwitch(ids[i], this.switchConfig[ids[i]].default);
    }
};

SwitchAdapter.prototype.changeSwitch = function(id, dir){

    if(this.switchStatus[id].state !== dir) {

        var relay = this.switchConfig[id].pins[dir];

        // turn the relay on
        relay.on();
        setTimeout(function () {

            // turn it off again after 300ms since the track switch should have changed by now
            relay.off();
        }, 100);

        this.switchStatus[id].state = dir;
    }
};

module.exports = new SwitchAdapter();