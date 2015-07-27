/* global game */
module.exports = {
    preload: function() {
        game.load.baseURL = './assets/';
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    create: function() {
        game.load.image('pix', 'pix.png');
        game.load.image('test_tileset', 'sample_floors.png', 64, 16);
        game.load.image('norbert', 'norbert.png');
        game.load.image('agnes', 'agnes.png');
        game.load.image('frederick', 'frederick.png');
        game.load.image('orc', 'orc.png');
        game.load.image('statue', 'dngn_orcish_idol.png');
        game.load.start();
    },
    update: function() {
        if (game.load.hasLoaded) game.state.start('title');
    }
};