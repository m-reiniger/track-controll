/**
 * Created by sparx on 08/05/15.
 */

$(document).ready(function(){

    var switches = [
        "sbhf1", "sbhf2"
    ];


    var socket = io('http://' + location.host);

    init(socket, switches);

    socket.on('stateChange', function(data){
        if(data.state.code === "200"){
            var $elem = $('#' + data.id);
            if(data.state.message === "left"){
                $elem.find('#' + data.id + '-red-right').show();
                $elem.find('#' + data.id + '-red-left').hide();
                $elem.find('#' + data.id + '-green-right').hide();
                $elem.find('#' + data.id + '-green-left').show();
            }
            if(data.state.message === "right"){
                $elem.find('#' + data.id + '-red-right').hide();
                $elem.find('#' + data.id + '-red-left').show();
                $elem.find('#' + data.id + '-green-right').show();
                $elem.find('#' + data.id + '-green-left').hide();
            }
        }else{
            $('#sbhf-status').text(data.id + ': ' + data.state.code + " - " + data.state.message);
        }

    });

    $('div.switch').click(
        function () {
            var id = $(this).attr('id');
            var data = {
                "id": id
            };
            socket.emit('toggleSwitch', data);
        }
    );


    function init(socket, switches){
        for (var i = 0, len = switches.length; i < len; i++) {
            var data = {
                "id": switches[i]
            };
            socket.emit('getSwitchState', data);
        }
    }


    $(function() {
        var dragging = 0;
        var target     = $('.speedcontrol');
        var elOfs, cent, elPos, mainTarget, last;

        target.mousedown(function(e) {
            dragging = true;
            mainTarget = $(e.target);
            elOfs = mainTarget.offset();
            cent  = {X: mainTarget.width()/2, Y: mainTarget.height()/2};
            elPos = {X: elOfs.left, Y: elOfs.top};
            last = mainTarget.attr('data-value');
        });
        $(document).mouseup(function() {
            dragging = 0;
        }).mousemove(function(e) {
            if(dragging) {
                var mPos    = (e.pageX - elPos.X - cent.X)/2;
                mPos += (last/2);
                if(mPos < 135 && mPos > -135) {
                    mainTarget.css({transform: 'rotate(' + mPos + 'deg)'});
                    $(mainTarget.attr('data-meter')).text(Math.round(mPos));
                    mainTarget.attr('data-value', mPos);
                }

            }
        });

        target.on('touchstart', function(e) {
            dragging = true;
            mainTarget = $(e.target);
            elOfs = mainTarget.offset();
            cent  = {X: mainTarget.width()/2, Y: mainTarget.height()/2};
            elPos = {X: elOfs.left, Y: elOfs.top};
            last = mainTarget.attr('data-value');
        });
        $(document).on('touchend', function() {
            dragging = 0;
        });
        $(document).on('touchmove', function(e) {
            if(dragging) {
                var touches = e.originalEvent.changedTouches;
                var mPos = (touches[0].pageX - elPos.X - cent.X);
                mPos += parseInt(last);
                if(mPos < 135 && mPos > -135) {
                    mainTarget.css({transform: 'rotate(' + mPos + 'deg)'});
                    $(mainTarget.attr('data-meter')).text(Math.round(mPos));
                    mainTarget.attr('data-value', mPos);
                }
            }
        });


    });

});