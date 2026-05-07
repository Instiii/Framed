export default class GameOverScene extends Phaser.Scene {

    constructor() {
        super('GameOverScene');
    }

    create() {

        this.add.text(280, 250, 'Game Over', {
            fontSize: '40px',
            fill: '#ff0000'
        });

        this.add.text(220, 320, 'Press SPACE to Restart', {
            fontSize: '24px',
            fill: '#ffffff'
        });

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}