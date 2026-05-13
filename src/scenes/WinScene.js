export default class WinScene extends Phaser.Scene {

    constructor() {
        super('WinScene');
    }

    create() {

        this.add.text(200, 200, 'YOU WIN!', {
            fontSize: '48px',
            fill: '#000000'
        });

        this.add.text(100, 300, 'Press ESC to return to menu', {
            fontSize: '24px',
            fill: '#000000'
        });

        this.escapeKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        );
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
            this.scene.start('TitleScene');
        }
    }
}