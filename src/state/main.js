/* global game */
var state = {};

var WORLD_WIDTH = 40;
var WORLD_HEIGHT = 20;

var player;
var layer;
var moveTarget;

state.create = function() {
    player = game.add.sprite(50, 50, 'pix');
    player.height = 20;
    player.width = 20;
    player.tint = 0x00ff00;
    player.anchor.set(0.5);
    game.camera.follow(player);
    game.camera.roundPx = false;
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
        moveTarget = game.add.sprite(game.input.activePointer.worldX,
            game.input.activePointer.worldY, 'pix');
        moveTarget.width = 5;
        moveTarget.height = 5;
        moveTarget.anchor.set(0.5);
        game.physics.enable(moveTarget);
        game.physics.arcade.moveToXY(player, moveTarget.x, moveTarget.y, 300);
    });
};

state.update = function() {
    game.physics.arcade.collide(player, layer, function() {
        player.body.velocity.set(0);
        if (moveTarget) moveTarget.destroy();
    });
    if (moveTarget)
        game.physics.arcade.collide(player, moveTarget, function() {
            player.body.velocity.set(0);
            moveTarget.destroy();
        });
};

module.exports = state;