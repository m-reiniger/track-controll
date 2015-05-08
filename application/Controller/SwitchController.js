"use strict";

var switchAdapter = new require('../Adapter/SwitchAdapter');


function SwitchController() {
}


SwitchController.prototype.changeSwitch = function (request, response) {
    var id = request.params.id,
        dir = request.params.dir;
    new SwitchController().changeSwitchDirect(id, dir, response, null);
};


SwitchController.prototype.changeSwitchDirect = function (id, dir, respone, socket) {

    var state = switchAdapter.changeSwitch(id, dir);

    console.log('switched ' + id + ' to ' + state);

    if(response) {
        response.json({
            "action": "changeSwitch",
            "if": id,
            "state": state
        });
    }
    if(socket){
        socket.emit('stateChange', {
            "id": id,
            "state": state
        })
    }
};

SwitchController.prototype.toggleSwitch = function (request, response) {
    var id = request.params.id;
    new SwitchController().toggleSwitchDirect(id, response, null);
};

SwitchController.prototype.toggleSwitchDirect = function (id, response, socket) {

    var state = switchAdapter.changeSwitch(id);

    console.log('Id: ' + id + ' - ' + state.message);

    if(response) {
        response.json({
            "action": "stateChange",
            "id": id,
            "state": state
        });
    }
    if(socket){
        socket.emit('stateChange', {
            "id": id,
            "state": state
        })
    }
};

SwitchController.prototype.toggleSwitch = function (request, response) {
    var id = request.params.id;
    new SwitchController().getSwitchStateDirect(id, response, null);
};


SwitchController.prototype.getSwitchStateDirect = function(id, response, socket){

    var state = switchAdapter.getState(id);

    if(response) {
        response.json({
            "action": "stateChange",
            "object": id,
            "state": state
        });
    }
    if(socket){
        socket.emit('stateChange', {
            "id": id,
            "state": state
        })
    }
};



module.exports = new SwitchController();