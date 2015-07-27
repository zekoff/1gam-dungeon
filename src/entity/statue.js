/* global game, Phaser */

var Statue = function(roomNumber) {
    var randomLocationInRoom = game.dungeon.pickRandomTileInRoom(roomNumber);
    var x = randomLocationInRoom.x * 32;
    var y = randomLocationInRoom.y * 32;
    Phaser.Sprite.call(this, game, x, y, 'statue');
    this.roomNumber = roomNumber;
    this.height = 32;
    this.width = 32;
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.interactTime = 3;
    this.inputEnabled = true;
};
Statue.prototype = Object.create(Phaser.Sprite.prototype);
Statue.prototype.constructor = Statue;
Statue.prototype.targetType = 'object';
Statue.prototype.finishedInteraction = function() {
    this.destroy();
    print('found gold... or whatever');
};

module.exports = Statue;