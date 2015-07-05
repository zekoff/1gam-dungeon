(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/* global Phaser, game */
global.game = new Phaser.Game();
game.state.add('main', require('./state/main'));
game.state.add('load', require('./state/load'));
game.state.add('title', require('./state/title'));
game.state.start('load');
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./state/load":2,"./state/main":3,"./state/title":4}],2:[function(require,module,exports){
/* global game */
module.exports = {
    preload: function() {
        game.load.baseURL = './assets/';
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    create: function() {
        game.load.image('pix', 'pix.png');
        game.load.image('test_tileset', 'pix.png', 32, 32);
        game.load.start();
    },
    update: function() {
        if (game.load.hasLoaded) game.state.start('title');
    }
};
},{}],3:[function(require,module,exports){
/* global game */
var state = {};

var WORLD_WIDTH = 40;
var WORLD_HEIGHT = 20;

var player;
var layer;

state.create = function() {
    player = game.add.sprite(30, 30, 'pix');
    player.height = 40;
    player.width = 20;
    player.tint = 0x00ff00;
    game.camera.follow(player);
    game.physics.arcade.enable(player);
    var map = game.add.tilemap();
    map.addTilesetImage('test_tileset');
    layer = map.create('walls', WORLD_WIDTH, WORLD_HEIGHT, 32, 32);
    layer.resizeWorld();
    map.putTile(1, 4, 8);
    map.putTile(1, 10, 2);
    var i;
    for (i = 0; i < WORLD_WIDTH; i++) {
        map.putTile(1, i, 0);
        map.putTile(1, i, WORLD_HEIGHT - 1);
    }
    for (i = 0; i < WORLD_HEIGHT; i++) {
        map.putTile(1, 0, i);
        map.putTile(1, WORLD_WIDTH - 1, i);
    }
    map.setCollision(1);
    game.physics.arcade.setBoundsToWorld();
    player.body.collideWorldBounds = true;
    game.input.onUp.add(function() {
        game.physics.arcade.moveToXY(player, game.input.activePointer.worldX,
            game.input.activePointer.worldY, 300);
    });
};

state.update = function() {
    game.physics.arcade.collide(player, layer, function(player) {
        player.body.velocity.set(0);
    });
};

module.exports = state;
},{}],4:[function(require,module,exports){
/* global game */
module.exports = {
    create: function() {
        game.state.start('main');
    }
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5udm0vdjAuMTAuMzUvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc3RhcnR1cC5qcyIsInNyYy9zdGF0ZS9sb2FkLmpzIiwic3JjL3N0YXRlL21haW4uanMiLCJzcmMvc3RhdGUvdGl0bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCBQaGFzZXIsIGdhbWUgKi9cbmdsb2JhbC5nYW1lID0gbmV3IFBoYXNlci5HYW1lKCk7XG5nYW1lLnN0YXRlLmFkZCgnbWFpbicsIHJlcXVpcmUoJy4vc3RhdGUvbWFpbicpKTtcbmdhbWUuc3RhdGUuYWRkKCdsb2FkJywgcmVxdWlyZSgnLi9zdGF0ZS9sb2FkJykpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3RpdGxlJywgcmVxdWlyZSgnLi9zdGF0ZS90aXRsZScpKTtcbmdhbWUuc3RhdGUuc3RhcnQoJ2xvYWQnKTsiLCIvKiBnbG9iYWwgZ2FtZSAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcHJlbG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGdhbWUubG9hZC5iYXNlVVJMID0gJy4vYXNzZXRzLyc7XG4gICAgICAgIGdhbWUuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcbiAgICAgICAgZ2FtZS5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcbiAgICB9LFxuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgncGl4JywgJ3BpeC5wbmcnKTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCd0ZXN0X3RpbGVzZXQnLCAncGl4LnBuZycsIDMyLCAzMik7XG4gICAgICAgIGdhbWUubG9hZC5zdGFydCgpO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdhbWUubG9hZC5oYXNMb2FkZWQpIGdhbWUuc3RhdGUuc3RhcnQoJ3RpdGxlJyk7XG4gICAgfVxufTsiLCIvKiBnbG9iYWwgZ2FtZSAqL1xudmFyIHN0YXRlID0ge307XG5cbnZhciBXT1JMRF9XSURUSCA9IDQwO1xudmFyIFdPUkxEX0hFSUdIVCA9IDIwO1xuXG52YXIgcGxheWVyO1xudmFyIGxheWVyO1xuXG5zdGF0ZS5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICBwbGF5ZXIgPSBnYW1lLmFkZC5zcHJpdGUoMzAsIDMwLCAncGl4Jyk7XG4gICAgcGxheWVyLmhlaWdodCA9IDQwO1xuICAgIHBsYXllci53aWR0aCA9IDIwO1xuICAgIHBsYXllci50aW50ID0gMHgwMGZmMDA7XG4gICAgZ2FtZS5jYW1lcmEuZm9sbG93KHBsYXllcik7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5lbmFibGUocGxheWVyKTtcbiAgICB2YXIgbWFwID0gZ2FtZS5hZGQudGlsZW1hcCgpO1xuICAgIG1hcC5hZGRUaWxlc2V0SW1hZ2UoJ3Rlc3RfdGlsZXNldCcpO1xuICAgIGxheWVyID0gbWFwLmNyZWF0ZSgnd2FsbHMnLCBXT1JMRF9XSURUSCwgV09STERfSEVJR0hULCAzMiwgMzIpO1xuICAgIGxheWVyLnJlc2l6ZVdvcmxkKCk7XG4gICAgbWFwLnB1dFRpbGUoMSwgNCwgOCk7XG4gICAgbWFwLnB1dFRpbGUoMSwgMTAsIDIpO1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBXT1JMRF9XSURUSDsgaSsrKSB7XG4gICAgICAgIG1hcC5wdXRUaWxlKDEsIGksIDApO1xuICAgICAgICBtYXAucHV0VGlsZSgxLCBpLCBXT1JMRF9IRUlHSFQgLSAxKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IFdPUkxEX0hFSUdIVDsgaSsrKSB7XG4gICAgICAgIG1hcC5wdXRUaWxlKDEsIDAsIGkpO1xuICAgICAgICBtYXAucHV0VGlsZSgxLCBXT1JMRF9XSURUSCAtIDEsIGkpO1xuICAgIH1cbiAgICBtYXAuc2V0Q29sbGlzaW9uKDEpO1xuICAgIGdhbWUucGh5c2ljcy5hcmNhZGUuc2V0Qm91bmRzVG9Xb3JsZCgpO1xuICAgIHBsYXllci5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgZ2FtZS5pbnB1dC5vblVwLmFkZChmdW5jdGlvbigpIHtcbiAgICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5tb3ZlVG9YWShwbGF5ZXIsIGdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlci53b3JsZFgsXG4gICAgICAgICAgICBnYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIud29ybGRZLCAzMDApO1xuICAgIH0pO1xufTtcblxuc3RhdGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHBsYXllciwgbGF5ZXIsIGZ1bmN0aW9uKHBsYXllcikge1xuICAgICAgICBwbGF5ZXIuYm9keS52ZWxvY2l0eS5zZXQoMCk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXRlOyIsIi8qIGdsb2JhbCBnYW1lICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBnYW1lLnN0YXRlLnN0YXJ0KCdtYWluJyk7XG4gICAgfVxufTsiXX0=
