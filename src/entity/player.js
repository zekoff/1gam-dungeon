/* global game, Phaser */

var MAX_SWING_TIMER = 1; // seconds

var Player = function(x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);
    this.height = 32;
    this.width = 32;
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.setSize(20, 20);
    this.target = null;
    this.hp = 100;
    this.atk = 5;
    this.swingTimer = 0;
    this.runSpeed = 200;
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.isAtDestination = function() {
    if (this.target &&
        game.physics.arcade.intersects(this, this.target)) {
        this.body.velocity.set(0);
        this.target.destroy();
        this.target = null;
    }
};

Player.prototype.setTarget = function(target) {
    if (this.target && this.target.targetType === 'waypoint')
        this.target.destroy();
    if (target.targetType === 'enemy') this.swingTimer = 0;
    this.target = target;
};

Player.prototype.update = function() {
    if (this.target)
        game.physics.arcade.moveToXY(this, this.target.x, this.target.y,
            this.runSpeed);
    this.isAtDestination();
    if (this.target === null) return;
    if (this.target.targetType === 'enemy' &&
        game.physics.arcade.distanceBetween(this, this.target) < 50) {
        this.swingTimer += game.time.physicsElapsed;
    }
    if (this.swingTimer > MAX_SWING_TIMER) {
        this.target.hp -= this.atk;
        this.swingTimer = 0;
        print('swing');
    }
    if (this.target.targetType === 'enemy' && this.target.hp <= 0) {
        this.target.destroy();
        this.target = null;
        this.body.velocity.set(0);
    }
};

module.exports = Player;