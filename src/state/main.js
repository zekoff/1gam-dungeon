/* global game */
var state = {};

var WORLD_WIDTH = 40;
var WORLD_HEIGHT = 20;

var player;
var layer;

state.create = function() {
    player = game.add.sprite(30, 30, 'pix');
    player.height = 40;
    player.width = 20;
    player.tint = 0x00ff00;
    game.camera.follow(player);
    game.physics.arcade.enable(player);
    var map = game.add.tilemap();
    map.addTilesetImage('test_tileset');
    layer = map.create('walls', WORLD_WIDTH, WORLD_HEIGHT, 32, 32);
    layer.resizeWorld();
    map.putTile(1, 4, 8);
    map.putTile(1, 10, 2);
    var i;
    for (i = 0; i < WORLD_WIDTH; i++) {
        map.putTile(1, i, 0);
        map.putTile(1, i, WORLD_HEIGHT - 1);
    }
    for (i = 0; i < WORLD_HEIGHT; i++) {
        map.putTile(1, 0, i);
        map.putTile(1, WORLD_WIDTH - 1, i);
    }
    map.setCollision(1);
    game.physics.arcade.setBoundsToWorld();
    player.body.collideWorldBounds = true;
    game.input.onUp.add(function() {
        game.physics.arcade.moveToXY(player, game.input.activePointer.worldX,
            game.input.activePointer.worldY, 300);
    });
};

state.update = function() {
    game.physics.arcade.collide(player, layer, function(player) {
        player.body.velocity.set(0);
    });
};

module.exports = state;