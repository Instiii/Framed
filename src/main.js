import TitleScene from './scenes/TitleScene.js';
import GameScene from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import WinScene from './scenes/WinScene.js';
import Settings from './scenes/Settings.js';

const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    backgroundColor: '#e8ecef',

    scale: {
        mode: Phaser.Scale.FIT,
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scene: [TitleScene, GameScene, GameOverScene, WinScene, Settings]
};

new Phaser.Game(config);