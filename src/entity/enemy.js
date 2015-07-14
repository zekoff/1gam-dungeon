/* global game, Phaser */
var Waypoint = require('../util/waypoint');

var MAX_SWING_TIMER = 1; // seconds

var Enemy = function(roomNumber) {
    var randomLocationInRoom = game.dungeon.pickRandomTileInRoom(roomNumber);
    var x = randomLocationInRoom.x * 32;
    var y = randomLocationInRoom.y * 32;
    Phaser.Sprite.call(this, game, x, y, 'orc');
    this.roomNumber = roomNumber;
    this.height = 32;
    this.width = 32;
    this.tint = 0xff0000;
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.setSize(36, 36);
    this.hp = 20;
    this.atk = 5;
    this.swingTimer = 0;
    this.target = null;
    this.runSpeed = 50;
    this.setRandomWaypoint();

    this.ai = [createWanderAi(this)];
};
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.targetType = 'enemy';
Enemy.prototype.isAtDestination = function() {
    if (this.target &&
        game.physics.arcade.intersects(this, this.target)) {
        this.body.velocity.set(0);
        this.target.destroy();
        this.setRandomWaypoint();
    }
};

Enemy.prototype.update = function() {
    this.ai[this.ai.length - 1]();
};

Enemy.prototype.setRandomWaypoint = function() {
    var randomTargetLocation = game.dungeon.pickRandomTileInRoom(this.roomNumber);
    this.target = new Waypoint(randomTargetLocation.x * 32,
        randomTargetLocation.y * 32);
};

var createWanderAi = function(self) {
    return function() {
        // add attack AI if player in same room as enemy
        game.players.forEachAlive(function(player) {
            if (game.dungeon.getContainingRoomPixels(player.x, player.y) === this.roomNumber) {
                this.ai.push(createAttackAi(this, player));
            }
        }, this);
        if (this.target)
            game.physics.arcade.moveToXY(this, this.target.x, this.target.y,
                this.runSpeed);
        this.isAtDestination();
    }.bind(self);
};

var createAttackAi = function(self, target) {
    self.target = target;
    return function() {
        if (game.dungeon.getContainingRoomPixels(target.x, target.y) !== this.roomNumber) {
            this.ai.pop();
            this.setRandomWaypoint();
            return;
        }
        if (this.target.targetType === 'player' &&
            game.physics.arcade.distanceBetween(this, this.target) < 45) {
            this.body.velocity.set(0);
            this.swingTimer += game.time.physicsElapsed;
        }
        else if (this.target)
            game.physics.arcade.moveToXY(this, this.target.x, this.target.y,
                this.runSpeed);
        if (this.swingTimer > MAX_SWING_TIMER) {
            this.target.hp -= this.atk;
            this.swingTimer = 0;
            print('enemy swing');
        }
    }.bind(self);
};

module.exports = Enemy;