"use strict";


var five = require("johnny-five");


function SwitchAdapter() {
    this.initialized = false;
}


SwitchAdapter.prototype.init = function(){

    this.switchConfig = require('../Config/switches.json');
    this.switchStatus = this.switchConfig;

    var ids = Object.keys(this.switchConfig);
    for(var i = 0, len = ids.length; i < len; i++){

        /*var pinLeftId = this.switchConfig[ids[i]].left,
            pinLeft = new five.Relay(pinLeftId),
            pinRightId = this.switchConfig[ids[i]].right,
            pinRight = new five.Relay(pinRightId)

        this.switchStatus[ids[i]].pins = {};
        this.switchStatus[ids[i]].pins.left = pinLeft;
        this.switchStatus[ids[i]].pins.right = pinRight;*/

        this.changeSwitch(ids[i], this.switchConfig[ids[i]].default);
    }
    this.initialized = true;
};

SwitchAdapter.prototype.changeSwitch = function(id, dir){

    /*if(!this.initialized){
        return {
            "type": "error",
            "code": "500",
            "message": "not initialized"
        };
    }*/

    if(!this.switchStatus[id]){
        return {
            "type": "error",
            "code": "404",
            "message": "not found"
        };
    }

    // if dir is omitted, toggle the switch to the opposite state it's currently in
    if(typeof dir === "undefined"){
        switch (this.switchStatus[id].state){
            case "left": dir = "right"; break;
            case "right": dir = "left"; break;
        }
    }

    if(this.switchStatus[id].state !== dir) {

        /*var relay = this.switchConfig[id].pins[dir];

        relay.on();
        setTimeout(function () {
            relay.off();
        }, 100);*/

        this.switchStatus[id].state = dir;
    }
    return {
        "type": "success",
        "code": "200",
        "message": this.switchStatus[id].state
    };
};

SwitchAdapter.prototype.getState = function(id){
    return {
        "type": "success",
        "code": "200",
        "message": this.switchStatus[id].state
    };
};



module.exports = new SwitchAdapter();