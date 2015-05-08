"use strict";


var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    router = express.Router(),
    boardAdapter = require('./application/Adapter/BoardAdapter'),
    switchController = require('./application/Controller/SwitchController');


boardAdapter.init();


router.get('/switch/change/:id/:dir', switchController.changeSwitch);
router.get('/switch/toggle/:id', switchController.toggleSwitch);
router.get('/switch/state/:id', switchController.toggleSwitch);

app.use('/', express.static('public'));
app.use('/rest', router);

server.listen(3000);

io.on('connection', function (socket) {
    //socket.emit('news', { hello: 'world' });

    socket.on('toggleSwitch', function (data) {
        switchController.toggleSwitchDirect(data.id, null, socket);
    });

    socket.on('changeSwitch', function (data) {
        switchController.changeSwitch(data.id, data.dir, null, socket);
    });

    socket.on('getSwitchState', function (data) {
        switchController.getSwitchStateDirect(data.id, null, socket);
    });

    socket.on('error', function (error){
        console.error(error);
    });
});

