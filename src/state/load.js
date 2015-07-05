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