/* global game, Phaser */
var Waypoint = require('../util/waypoint');

var MAX_SWING_TIMER = 1; // seconds

var Enemy = function(roomNumber) {
    var randomLocationInRoom = game.dungeon.pickRandomTileInRoom(roomNumber);
    var x = randomLocationInRoom.x * 32;
    var y = randomLocationInRoom.y * 32;
    Phaser.Sprite.call(this, game, x, y, 'pix');
    this.roomNumber = roomNumber;
    this.height = 40;
    this.width = 40;
    this.tint = 0xff0000;
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.hp = 15;
    this.atk = 5;
    this.swingTimer = 0;
    this.target = null;
    this.runSpeed = 50;

    var randomTargetLocation = game.dungeon.pickRandomTileInRoom(roomNumber);
    this.target = new Waypoint(randomTargetLocation.x * 32,
        randomTargetLocation.y * 32);
};
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.targetType = 'enemy';
Enemy.prototype.isAtDestination = function() {
    if (this.target &&
        game.physics.arcade.intersects(this, this.target)) {
        this.body.velocity.set(0);
        this.target.destroy();
        var randomTargetLocation = game.dungeon.pickRandomTileInRoom(this.roomNumber);
        this.target = new Waypoint(randomTargetLocation.x * 32,
            randomTargetLocation.y * 32);
    }
};

Enemy.prototype.update = function() {
    if (this.target)
        game.physics.arcade.moveToXY(this, this.target.x, this.target.y,
            this.runSpeed);
    this.isAtDestination();

};

module.exports = Enemy;