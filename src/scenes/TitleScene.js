export default class TitleScene extends Phaser.Scene {

    constructor() {
        super('TitleScene');
    }

    create() {

        this.add.text(225, 200, 'FRAMED', {
            fontSize: '48px',
            fill: '#000000'
        });

        this.add.text(215, 300, 'Press SPACE to Start', {
            fill: '#000000'
        });

        this.add.text(215, 400, 'Press S for Settings', {
            fill: '#000000'
        });

        this.spaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.sKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        );
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.scene.start('GameScene');
        }

        if (Phaser.Input.Keyboard.JustDown(this.sKey)) {
            this.scene.start('Settings');
        }
    }
}