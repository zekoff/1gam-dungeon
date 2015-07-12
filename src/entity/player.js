/* global game, Phaser */

var Player = function(x, y) {
    Phaser.Sprite.call(this, game, x, y, 'pix');
    this.height = 20;
    this.width = 20;
    this.tint = 0x00ff00;
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.moveTarget = null;
    this.hp = 100;
    this.atk = 5;
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.isAtDestination = function() {
    if (this.moveTarget &&
        game.physics.arcade.intersects(this, this.moveTarget)) {
        this.body.velocity.set(0);
        this.moveTarget.destroy();
        this.moveTarget = null;
    }
};

Player.prototype.setTarget = function(target) {
    if (this.moveTarget && this.moveTarget.targetType === 'waypoint')
        this.moveTarget.destroy();
    this.moveTarget = target;
};

Player.prototype.update = function() {};

module.exports = Player;