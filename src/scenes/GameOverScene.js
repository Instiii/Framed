export default class GameOverScene extends Phaser.Scene {

    constructor() {
        super('GameOverScene');
    }

    create() {

        this.add.text(200, 250, 'Game Over', {
            fontSize: '40px',
            fill: '#ff0000'
        });

        this.add.text(150, 320, 'Press ESC to go to Title', {
            fontSize: '24px',
            fill: '#000000'
        });

        this.input.keyboard.once('keydown-ESC', () => {
            this.scene.start('TitleScene');
        });
    }
}