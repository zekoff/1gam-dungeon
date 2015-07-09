/* global game */
var state = {};
var DungeonGen = require('../util/dungeon_gen');
var Player = require('../entity/player');

var WORLD_WIDTH = 64;
var WORLD_HEIGHT = 64;

var players;
var currentPlayer;
var layer;
var moveTarget;

state.create = function() {
    players = game.add.group();
    var p1 = new Player(50,50);
    var p2 = new Player(100,50);
    var p3 = new Player(50,100);
    players.add(p1);
    players.add(p2);
    players.add(p3);
    currentPlayer = p1;
    game.camera.follow(currentPlayer);
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

    // add HUD
    var hud = {};
    var TEXT_STYLE = {
        fontSize: 30,
        fill: 'green'
    };
    var p0 = game.add.text(0,0, "P0000", TEXT_STYLE);
    hud.p1 = game.add.text(0, 0, "P1", TEXT_STYLE);
    hud.p2 = game.add.text(300, 0, "P2", TEXT_STYLE);
    hud.p3 = game.add.text(600, 0, "P3", TEXT_STYLE);
    var activatePlayer = function(player, sprite, pointer) {
        console.log(pointer);
        console.log('player activated');
        currentPlayer = player;
        game.camera.follow(currentPlayer);
        console.log(sprite.input.consumePointerEvent);
    };
    [p0, hud.p1, hud.p2, hud.p3].forEach(function(e){
        e.inputEnabled = true;
        e.fixedToCamera = true;
        // debugger;
        e.input.useHandCursor = true;
        // e.input.consumePointerEvent = true;
    });
    p0.events.onInputUp.add(function(){console.log('hit');});
    hud.p1.events.onInputUp.add(activatePlayer.bind(null, p1));
    hud.p2.events.onInputUp.add(activatePlayer.bind(null, p2));
    hud.p3.events.onInputUp.add(activatePlayer.bind(null, p3));
};

var reachedDestination = function() {
    currentPlayer.body.velocity.set(0);
    if (moveTarget) {
        moveTarget.destroy();
        moveTarget = null;
    }
};

state.update = function() {
    if (moveTarget) game.physics.arcade.moveToXY(currentPlayer, moveTarget.x, moveTarget.y, 300);
    game.physics.arcade.collide(currentPlayer, layer);
    game.physics.arcade.collide(currentPlayer, moveTarget, reachedDestination);
};

module.exports = state;