export default class Settings extends Phaser.Scene {

    constructor() {
        super('Settings');
    }

    create() {

        this.cameras.main.setBackgroundColor('#1c1c1c');

        this.add.text(300, 80, 'MISSION BRIEFING', {
            fontSize: '28px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(300, 160,
            'You have been FRAMED by a system error.\n' +
            'Save all your former teams to survive.\n' +
            'Survive all waves to win.',
            {
                fontSize: '18px',
                fill: '#cccccc',
                align: 'center'
            }
        ).setOrigin(0.5);

        this.add.text(300, 280, 'CONTROLS', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(300, 350,
            'WASD - Move\n' +
            'SPACE - Shoot\n' +
            'ESC - Quit / Menu',
            {
                fontSize: '18px',
                fill: '#cccccc',
                align: 'center'
            }
        ).setOrigin(0.5);

        this.add.text(300, 480, 'Press SPACE to start', {
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.scene.start('GameScene');
        }
    }
}