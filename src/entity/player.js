/* global game, Phaser */

var MAX_SWING_TIMER = 1; // seconds
var MAX_IDLE_TIME = 2;

var Player = function(x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);
    this.height = 32;
    this.width = 32;
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.setSize(20, 20);
    // this.body.immovable = true;
    this.target = null;
    this.hp = 100;
    this.atk = 5;
    this.swingTimer = 0;
    this.runSpeed = 200;
    this.targetType = 'player';

    this.idleTime = 0;
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.setTarget = function(target) {
    if (this.target && this.target.targetType === 'waypoint')
        this.target.destroy();
    if (target.targetType === 'enemy') this.swingTimer = 0;
    this.target = target;
};

Player.prototype.update = function() {
    if (this.target) {
        this.idleTime = 0;
        switch (this.target.targetType) {
            case 'waypoint':
                this.moveToWaypoint('target');
                break;
            case 'enemy':
                this.attackEnemy('target');
                break;
            case 'object':
                this.interactWithObject();
                break;
        }
    }
    else this.idle();
};

Player.prototype.idle = function() {
    var previouslyIdling = this.idleTime < MAX_IDLE_TIME;
    this.idleTime += game.time.physicsElapsed;
    if (this.idleTime >= MAX_IDLE_TIME && previouslyIdling) print('now idling');
    if (this.idleTime < MAX_IDLE_TIME) return;
    // if enemies in room, attack them
    for (var i = 0; i < game.enemies.children.length; i++) {
        var enemy = game.enemies.children[i];
        var myRoom = game.dungeon.getContainingRoomPixels(this.x, this.y);
        if (enemy.roomNumber === myRoom) {
            this.idleTarget = enemy;
            break;
        }
    }
    if (this.idleTarget === null) return;
    if (this.idleTarget.targetType === 'enemy') this.attackEnemy('idleTarget');
    // if room is empty, search for treasure
};

Player.prototype.moveToWaypoint = function(target) {
    game.physics.arcade.moveToXY(this, this[target].x, this[target].y,
        this.runSpeed);
    if (game.physics.arcade.intersects(this, this[target])) {
        this.body.velocity.set(0);
        this[target].destroy();
        this[target] = null;
    }
};

Player.prototype.attackEnemy = function(target) {
    game.physics.arcade.moveToXY(this, this[target].x, this[target].y,
        this.runSpeed);
    if (game.physics.arcade.distanceBetween(this, this[target]) < 55)
        this.swingTimer += game.time.physicsElapsed;
    if (this.swingTimer > MAX_SWING_TIMER) {
        this[target].hp -= this.atk;
        this.swingTimer = 0;
        print('swing');
    }
    if (this[target].hp <= 0) {
        // this will cause a crash if more than one player is targeting this enemy
        this[target].destroy();
        this[target] = null;
        this.body.velocity.set(0);
    }
};

Player.prototype.interactWithObject = function(target) {

};

module.exports = Player;