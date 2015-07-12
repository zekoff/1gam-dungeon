/* global game, Phaser */
var Enemy = function(x, y) {
    Phaser.Sprite.call(this, game, x, y, 'pix');
    this.height = 36;
    this.width = 36;
    this.tint = 0xff0000;
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.hp = 15;
    this.atk = 5;
};
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.targetType = 'enemy';

Enemy.prototype.update = function() {
};

module.exports = Enemy;