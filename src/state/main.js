/* global game */
var state = {};

state.create = function() {
    game.add.text(0, 0, "Testing", {
        fill: 'white'
    });
    var img = game.add.image(30, 30, 'pix');
    img.height = 40;
    img.width = 20;
};

module.exports = state;