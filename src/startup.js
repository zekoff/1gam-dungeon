/* global Phaser, game */
global.print = console.log.bind(console);
global.game = new Phaser.Game();
game.state.add('main', require('./state/main'));
game.state.add('load', require('./state/load'));
game.state.add('title', require('./state/title'));
game.state.start('load');