/* global game, Phaser */

var Player = function(x, y) {
    Phaser.Sprite.call(this, game, x, y, 'pix');
    this.height = 20;
    this.width = 20;
    this.tint = 0x00ff00;
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

module.exports = Player;