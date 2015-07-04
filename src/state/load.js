/* global game */
module.exports = {
    preload: function() {
        game.load.baseURL = './assets/';
    },
    create: function() {
        game.load.image('pix', 'pix.png');
        game.load.start();
    },
    update: function() {
        if (game.load.hasLoaded) game.state.start('title');
    }
};