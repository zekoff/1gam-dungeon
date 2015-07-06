/* global game */
var state = {};
var DungeonGen = require('../util/dungeon_gen');

var WORLD_WIDTH = 64;
var WORLD_HEIGHT = 64;

var player;
var layer;
var moveTarget;

var createDungeon = function() {
    // create footprint and fill with floor/blank tiles
    var mapArray = [];
    var i;
    var j;
    for (i = 0; i < WORLD_WIDTH; i++) mapArray.push([]);
    for (i = 0; i < WORLD_WIDTH; i++)
        for (j = 0; j < WORLD_HEIGHT; j++) mapArray[i][j] = 0;
    for (i = 0; i < WORLD_WIDTH; i++) {
        mapArray[i][0] = 1;
        mapArray[i][WORLD_HEIGHT - 1] = 1;
    }
    for (i = 0; i < WORLD_HEIGHT; i++) {
        mapArray[0][i] = 1;
        mapArray[WORLD_WIDTH - 1][i] = 1;
    }

    var room1, room2;
    // create room 1
    room1 = {};
    room1.x = game.rnd.between(0, WORLD_WIDTH / 2);
    room1.y = game.rnd.between(0, WORLD_HEIGHT / 2);
    room1.width = game.rnd.between(3, WORLD_WIDTH / 2 - 3);
    room1.height = game.rnd.between(3, WORLD_HEIGHT / 2 - 3);
    for (i = 0; i < room1.width; i++) {
        for (j = 0; j < room1.height; j++) {
            mapArray[i + room1.x][j + room1.y] = 1;
        }
    }

    // create room 2
    room2 = {};
    room2.x = game.rnd.between(0, WORLD_WIDTH / 2);
    room2.y = game.rnd.between(0, WORLD_HEIGHT / 2);
    room2.width = game.rnd.between(3, WORLD_WIDTH / 2 - 3);
    room2.height = game.rnd.between(3, WORLD_HEIGHT / 2 - 3);
    for (i = 0; i < room2.width; i++) {
        for (j = 0; j < room2.height; j++) {
            mapArray[i + room2.x][j + room2.y] = 1;
        }
    }

    // connect with a tunnel

    // wall tiles
    mapArray[4][8] = 1;
    mapArray[10][2] = 1;
    mapArray[14][12] = 1;
    return mapArray;
};

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
    map.addTilesetImage('test_tileset', 'test_tileset', 32, 32, 32, 32, 1);
    layer = map.create('walls', WORLD_WIDTH, WORLD_HEIGHT, 32, 32);
    layer.resizeWorld();
    // var mapArray = createDungeon();
    DungeonGen.Dungeon.Generate();
    var mapArray = DungeonGen.Dungeon.map;
    var i, j;
    for (i = 0; i < WORLD_WIDTH; i++)
        for (j = 0; j < WORLD_HEIGHT; j++)
            map.putTile(mapArray[i][j], i, j);
    map.setCollision(2);
    game.physics.arcade.setBoundsToWorld();
    player.body.collideWorldBounds = true;
    game.input.onUp.add(function() {
        if (moveTarget) moveTarget.destroy();
        moveTarget = game.add.sprite(game.input.activePointer.worldX,
            game.input.activePointer.worldY, 'pix');
        moveTarget.width = 5;
        moveTarget.height = 5;
        moveTarget.anchor.set(0.5);
        game.physics.enable(moveTarget);
        // game.physics.arcade.moveToXY(player, moveTarget.x, moveTarget.y, 300);
    });
};

var reachedDestination = function() {
    player.body.velocity.set(0);
    if (moveTarget) {
        moveTarget.destroy();
        moveTarget = null;
    }
};

state.update = function() {
    if (moveTarget) game.physics.arcade.moveToXY(player, moveTarget.x, moveTarget.y, 300);
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(player, moveTarget, reachedDestination);
};

module.exports = state;