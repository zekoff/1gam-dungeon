/* global game */
module.exports = {
    create: function() {
        game.add.image(0, 0, 'splash');
        game.input.onUp.addOnce(function() {
            game.state.start('main');
        });
    }
};