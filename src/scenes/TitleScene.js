export default class TitleScene extends Phaser.Scene {

    constructor() {
        super('TitleScene');
    }

    create() {

        this.add.text(220, 250, 'Gallery Shooter', {
            fontSize: '40px',
            fill: '#ffffff'
        });

        this.add.text(240, 320, 'Press SPACE to Start', {
            fontSize: '24px',
            fill: '#ffffff'
        });

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}