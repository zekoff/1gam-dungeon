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
        game.load.start();
    },
    update: function() {
        if (game.load.hasLoaded) game.state.start('title');
    }
};
},{}],3:[function(require,module,exports){
/* global game */
var state = {};

state.create = function() {
    game.add.text(0, 0, "Testing", {
        fill: 'white'
    });
    var img = game.add.image(30, 30, 'pix');
    img.height = 40;
    img.width = 20;
    var map = game.add.tilemap();
    map.create('walls', 10, 6, 32, 32);
    map.fill(0, 0, 0, 10, 6);
    map.putTile(1, 4, 3);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5udm0vdjAuMTAuMzUvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc3RhcnR1cC5qcyIsInNyYy9zdGF0ZS9sb2FkLmpzIiwic3JjL3N0YXRlL21haW4uanMiLCJzcmMvc3RhdGUvdGl0bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBnbG9iYWwgUGhhc2VyLCBnYW1lICovXG5nbG9iYWwuZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgpO1xuZ2FtZS5zdGF0ZS5hZGQoJ21haW4nLCByZXF1aXJlKCcuL3N0YXRlL21haW4nKSk7XG5nYW1lLnN0YXRlLmFkZCgnbG9hZCcsIHJlcXVpcmUoJy4vc3RhdGUvbG9hZCcpKTtcbmdhbWUuc3RhdGUuYWRkKCd0aXRsZScsIHJlcXVpcmUoJy4vc3RhdGUvdGl0bGUnKSk7XG5nYW1lLnN0YXRlLnN0YXJ0KCdsb2FkJyk7IiwiLyogZ2xvYmFsIGdhbWUgKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHByZWxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBnYW1lLmxvYWQuYmFzZVVSTCA9ICcuL2Fzc2V0cy8nO1xuICAgICAgICBnYW1lLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XG4gICAgICAgIGdhbWUuc2NhbGUucGFnZUFsaWduVmVydGljYWxseSA9IHRydWU7XG4gICAgfSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BpeCcsICdwaXgucG5nJyk7XG4gICAgICAgIGdhbWUubG9hZC5zdGFydCgpO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdhbWUubG9hZC5oYXNMb2FkZWQpIGdhbWUuc3RhdGUuc3RhcnQoJ3RpdGxlJyk7XG4gICAgfVxufTsiLCIvKiBnbG9iYWwgZ2FtZSAqL1xudmFyIHN0YXRlID0ge307XG5cbnN0YXRlLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGdhbWUuYWRkLnRleHQoMCwgMCwgXCJUZXN0aW5nXCIsIHtcbiAgICAgICAgZmlsbDogJ3doaXRlJ1xuICAgIH0pO1xuICAgIHZhciBpbWcgPSBnYW1lLmFkZC5pbWFnZSgzMCwgMzAsICdwaXgnKTtcbiAgICBpbWcuaGVpZ2h0ID0gNDA7XG4gICAgaW1nLndpZHRoID0gMjA7XG4gICAgdmFyIG1hcCA9IGdhbWUuYWRkLnRpbGVtYXAoKTtcbiAgICBtYXAuY3JlYXRlKCd3YWxscycsIDEwLCA2LCAzMiwgMzIpO1xuICAgIG1hcC5maWxsKDAsIDAsIDAsIDEwLCA2KTtcbiAgICBtYXAucHV0VGlsZSgxLCA0LCAzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhdGU7IiwiLyogZ2xvYmFsIGdhbWUgKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGdhbWUuc3RhdGUuc3RhcnQoJ21haW4nKTtcbiAgICB9XG59OyJdfQ==
