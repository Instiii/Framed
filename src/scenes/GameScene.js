import Player from '../classes/Player.js';

export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
    }

    preload() {

        // Load player image
        this.load.image('player', 'assets/images/light.png');
        this.load.image('heavy', 'assets/images/heavy.png');
        this.load.image('shock', 'assets/images/shock.png');

    }

    create() {

        // Background text
        this.add.text(300, 50, 'Game Running', {
            fontSize: '32px',
            fill: '#ffffff'
        });

        // Create player
        this.player = new Player(this, 400, 500);

        // Create WASD keys
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // ESC -> Game Over Scene
        this.input.keyboard.once('keydown-ESC', () => {
            this.scene.start('GameOverScene');
        });
    }

    update() {

        // Player movement
        this.player.move(this.keys);
    }
}