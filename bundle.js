(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/* global Phaser, game */
global.game = new Phaser.Game();
game.state.add('main', require('./state/main'));
game.state.add('load', require('./state/load'));
game.state.add('title', require('./state/title'));
game.state.start('title');
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./state/load":2,"./state/main":3,"./state/title":4}],2:[function(require,module,exports){
/* global game */
module.exports = {
    create: function() {
        game.state.start('title');
    }
};
},{}],3:[function(require,module,exports){
/* global game */
var state = {};

state.create = function() {
    game.add.text(0,0,"Testing",{fill:'white'});
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5udm0vdjAuMTAuMzUvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc3RhcnR1cC5qcyIsInNyYy9zdGF0ZS9sb2FkLmpzIiwic3JjL3N0YXRlL21haW4uanMiLCJzcmMvc3RhdGUvdGl0bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCBQaGFzZXIsIGdhbWUgKi9cbmdsb2JhbC5nYW1lID0gbmV3IFBoYXNlci5HYW1lKCk7XG5nYW1lLnN0YXRlLmFkZCgnbWFpbicsIHJlcXVpcmUoJy4vc3RhdGUvbWFpbicpKTtcbmdhbWUuc3RhdGUuYWRkKCdsb2FkJywgcmVxdWlyZSgnLi9zdGF0ZS9sb2FkJykpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3RpdGxlJywgcmVxdWlyZSgnLi9zdGF0ZS90aXRsZScpKTtcbmdhbWUuc3RhdGUuc3RhcnQoJ3RpdGxlJyk7IiwiLyogZ2xvYmFsIGdhbWUgKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3RpdGxlJyk7XG4gICAgfVxufTsiLCIvKiBnbG9iYWwgZ2FtZSAqL1xudmFyIHN0YXRlID0ge307XG5cbnN0YXRlLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGdhbWUuYWRkLnRleHQoMCwwLFwiVGVzdGluZ1wiLHtmaWxsOid3aGl0ZSd9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhdGU7IiwiLyogZ2xvYmFsIGdhbWUgKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGdhbWUuc3RhdGUuc3RhcnQoJ21haW4nKTtcbiAgICB9XG59OyJdfQ==
