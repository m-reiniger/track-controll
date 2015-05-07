"use strict";


var express = require('express'),
    app = express(),
    router = express.Router(),
    boardAdapter = require('./application/Adapter/BoardAdapter'),
    switchController = require('./application/Controller/SwitchController');


boardAdapter.init();


router.get('/switch/change/:id/:dir', switchController.changeSwitch);


app.use('/', express.static('public'));
app.use('/rest', router);


app.listen(3000);

