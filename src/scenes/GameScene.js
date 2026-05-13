import Player from '../classes/Player.js';
import Enemy from '../classes/Enemy.js';
import WaveManager from '../classes/WaveManager.js';

export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
    }

    preload() {

        // Load images
        this.load.image('light', 'assets/images/light.png');
        this.load.image('tank', 'assets/images/tank.png');
        this.load.image('heavy', 'assets/images/heavy.png');
        this.load.image('shock', 'assets/images/shock.png');
        this.load.image('smallB', 'assets/images/small_bullet.png');
        this.load.image('bigB', 'assets/images/big_bullet.png');
        this.load.image('upgrade', 'assets/images/upgrade.png');
        this.load.image('health', 'assets/images/health.png');

    }

    create() {

        this.cameras.main.setBackgroundColor('#e8ecef');

        this.players = this.physics.add.group();
        this.playerBullets = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.enemyBullets = this.physics.add.group();

        // Create player
        this.player = new Player(this, 400, 500);
        this.players.add(this.player);
        console.log(this.player instanceof Player);

        // Create WASD keys
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Create shoot key
        this.spaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );        

        // ESC -> Game Over Scene
        this.input.keyboard.once('keydown-ESC', () => {
            this.scene.start('GameOverScene');
        });

        //testing
        // this.enemies.add(new Enemy(this, 100, 400, 'light'));
        // this.enemies.add(new Enemy(this, 300, 400, 'tank'));
        // this.enemies.add(new Enemy(this, 500, 400, 'heavy'));

        // player bullets -> enemies
        this.physics.add.overlap(this.playerBullets, this.enemies, (bullet, enemy) => {
            bullet.destroy();
            enemy.takeDamage(1);
        }, null, this);

        // enemy bullets -> player
        this.physics.add.overlap(this.enemyBullets, this.players, (bullet, player) => {
            player.takeDamage(bullet.damage);
            bullet.destroy();

        }, null, this);

        // player -> enemies (ram)
        this.physics.add.overlap(this.players, this.enemies, (player, enemy) => {
            player.takeDamage(enemy.damage || 1);
            enemy.destroy();
        }, null, this);

        //Waves of Enemies
        this.waveManager = new WaveManager(this);
        this.waveManager.start();
    }

    update() {

        // Player movement
        this.player.move(this.keys);

        // Player shoot
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.player.shoot(this.time.now);
        }

        this.enemies.children.iterate(enemy => {
            if (enemy) enemy.update(this.time.now);
        });

        this.playerBullets.children.iterate(b => {
            if (b && b.y < -50) b.destroy();
        });

        this.enemyBullets.children.iterate(b => {
            if (b && b.y > 650) b.destroy();
        });

        let aliveEnemies = this.enemies.getChildren().filter(e => e.active && !e.isDying);

        // LOSE CONDITION
        if (this.player.lives <= 0) {
            this.scene.start('GameOverScene');
        }

        // WIN CONDITION
        if (this.waveManager.completed && aliveEnemies.length === 0) {
            this.scene.start('WinScene');
        }

        // WAVE PROGRESSION
        if (!this.waveManager.completed && aliveEnemies.length === 0) {
            this.waveManager.nextWave();
        }
    }
}