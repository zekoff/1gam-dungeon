/* global game */
var state = {};

state.create = function() {
    game.add.text(0, 0, "Testing", {
        fill: 'white'
    });
    var img = game.add.image(30, 30, 'pix');
    img.height = 40;
    img.width = 20;
    var map = game.add.tilemap();
    map.create('walls', 10, 6, 32, 32);
    map.fill(0, 0, 0, 10, 6);
    map.putTile(1, 4, 3);
};

module.exports = state;