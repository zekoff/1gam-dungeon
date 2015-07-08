/* global game */
var state = {};
var DungeonGen = require('../util/dungeon_gen');
var Player = require('../entity/player');

var WORLD_WIDTH = 64;
var WORLD_HEIGHT = 64;

var players;
var layer;
var moveTarget;

state.create = function() {
    players = [];
    players.push(new Player(50,50));
    game.add.existing(players[0]);
    game.camera.follow(players[0]);
    game.camera.roundPx = false;
    var map = game.add.tilemap();
    map.addTilesetImage('test_tileset', 'test_tileset', 32, 32, 32, 32, 1);
    layer = map.create('walls', WORLD_WIDTH, WORLD_HEIGHT, 32, 32);
    layer.resizeWorld();
    DungeonGen.Dungeon.Generate();
    var mapArray = DungeonGen.Dungeon.map;
    var i, j;
    for (i = 0; i < WORLD_WIDTH; i++)
        for (j = 0; j < WORLD_HEIGHT; j++)
            map.putTile(mapArray[i][j], i, j);
    map.setCollision(2);
    game.physics.arcade.setBoundsToWorld();
    game.input.onUp.add(function() {
        if (moveTarget) moveTarget.destroy();
        moveTarget = game.add.sprite(game.input.activePointer.worldX,
            game.input.activePointer.worldY, 'pix');
        moveTarget.width = 5;
        moveTarget.height = 5;
        moveTarget.anchor.set(0.5);
        game.physics.enable(moveTarget);
    });
};

var reachedDestination = function() {
    players[0].body.velocity.set(0);
    if (moveTarget) {
        moveTarget.destroy();
        moveTarget = null;
    }
};

state.update = function() {
    if (moveTarget) game.physics.arcade.moveToXY(players[0], moveTarget.x, moveTarget.y, 300);
    game.physics.arcade.collide(players[0], layer);
    game.physics.arcade.collide(players[0], moveTarget, reachedDestination);
};

module.exports = state;