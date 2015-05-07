"use strict";

var switchAdapter = new require('../Adapter/SwitchAdapter');


function SwitchController() {
}


SwitchController.prototype.changeSwitch = function (request, response) {
    var id = request.params.id,
        dir = request.params.dir;


    console.log('switching ' + id + ' to ' + dir);
    switchAdapter.changeSwitch(id, dir);
    response.json({
        "action": "change switch",
        "object": id,
        "direction": dir
    });
};


module.exports = new SwitchController();