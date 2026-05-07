export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
    }

    create() {

        this.add.text(300, 280, 'Game Running', {
            fontSize: '32px',
            fill: '#ffffff'
        });

        this.input.keyboard.once('keydown-ESC', () => {
            this.scene.start('GameOverScene');
        });
    }
}