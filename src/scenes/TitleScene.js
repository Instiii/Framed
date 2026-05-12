export default class TitleScene extends Phaser.Scene {

    constructor() {
        super('TitleScene');
    }

    create() {

        this.add.text(250, 200, 'FRAMED', {
            fontSize: '48px',
            fill: '#fff'
        });

        this.add.text(220, 300, 'Press SPACE to Start');

        this.spaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.scene.start('GameScene');
        }
    }
}