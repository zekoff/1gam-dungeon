/* global game */
var state = {};
var Dungeon = require('../util/dungeon_gen');
var Player = require('../entity/player');
var Enemy = require('../entity/enemy');
var Waypoint = require('../util/waypoint');

var WORLD_WIDTH = 64;
var WORLD_HEIGHT = 64;

var players;
var currentPlayer;
var layer;

var enemies;

state.create = function() {
    players = game.add.group();
    var p1 = new Player(50, 50);
    var p2 = new Player(100, 50);
    var p3 = new Player(50, 100);
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
    var dungeon = new Dungeon();
    dungeon.generate();
    var mapArray = dungeon.map;
    var i, j;
    for (i = 0; i < WORLD_WIDTH; i++)
        for (j = 0; j < WORLD_HEIGHT; j++)
            map.putTile(mapArray[i][j], i, j);
    map.setCollision(2);
    game.physics.arcade.setBoundsToWorld();

    // add input mask
    var mask = game.add.sprite(0, 0);
    mask.height = game.world.height;
    mask.width = game.world.width;
    mask.inputEnabled = true;
    mask.events.onInputUp.add(function(sprite, pointer) {
        console.log('Clicked in room ' + dungeon.getContainingRoom(
            layer.getTileX(pointer.worldX), layer.getTileY(pointer.worldY)));
        var wp = new Waypoint(pointer.worldX, pointer.worldY);
        game.add.existing(wp);
        currentPlayer.setTarget(wp);
    });

    // create enemies
    enemies = game.add.group();
    var ex, ey, enemy, room;
    for (i = 0; i < 5; i++) {
        room = game.rnd.between(0, dungeon.rooms.length - 1);
        ex = (dungeon.rooms[room].x + 1) * 32;
        ey = (dungeon.rooms[room].y + 1) * 32;
        enemy = new Enemy(ex, ey);
        enemy.inputEnabled = true;
        enemy.events.onInputUp.add(function() {
            currentPlayer.setTarget(this);
        }, enemy);
        enemies.add(enemy);
    }

    // add HUD
    var hud = {};
    var TEXT_STYLE = {
        fontSize: 30,
        fill: 'green'
    };
    var hudGroup = game.add.group();
    hud.p1 = game.make.text(0, 0, "P1", TEXT_STYLE);
    hud.p2 = game.make.text(300, 0, "P2", TEXT_STYLE);
    hud.p3 = game.make.text(600, 0, "P3", TEXT_STYLE);
    hudGroup.add(hud.p1);
    hudGroup.add(hud.p2);
    hudGroup.add(hud.p3);
    var activatePlayer = function(player, sprite, pointer) {
        currentPlayer = player;
        game.camera.follow(currentPlayer);
    };
    [hud.p1, hud.p2, hud.p3].forEach(function(e) {
        e.inputEnabled = true;
        e.fixedToCamera = true;
        e.input.useHandCursor = true;
    });
    hud.p1.events.onInputUp.add(activatePlayer.bind(null, p1));
    hud.p2.events.onInputUp.add(activatePlayer.bind(null, p2));
    hud.p3.events.onInputUp.add(activatePlayer.bind(null, p3));
};

state.update = function() {
    // state updates first, then entities
    players.forEach(function(player) {
        if (player.moveTarget)
            game.physics.arcade.moveToXY(player, player.moveTarget.x,
                player.moveTarget.y, 300);
    });
    game.physics.arcade.collide(players, layer);
    players.callAll('isAtDestination');

    game.physics.arcade.collide(players, enemies);
};

module.exports = state;