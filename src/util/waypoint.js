/* global game, Phaser */
var Waypoint = function(x, y) {
    Phaser.Sprite.call(this, game, x, y, 'pix');
    this.width = 5;
    this.height = 5;
    this.anchor.set(0.5);
    this.targetType = 'waypoint';
    game.physics.arcade.enable(this);
};
Waypoint.prototype = Object.create(Phaser.Sprite.prototype);
Waypoint.prototype.constructor = Waypoint;

module.exports = Waypoint;