export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y, 'light');

        console.log("PLAYER CLASS CREATED");

        // Add player to scene
        scene.add.existing(this);

        // Enable physics
        scene.physics.add.existing(this);

        // Player stats
        this.speed = 200;
        this.maxHealth = 3;
        this.health = this.maxHealth;
        this.lives = 3;
        this.fireRate = 100;
        this.lastShotTime = 0;

        this.setTint(0x4682b4);

        // Keep inside screen
        this.setCollideWorldBounds(true);
    }

    move(keys) {
        // Stop previous movement
        this.setVelocity(0, 0);
        // LEFT
        if (keys.left.isDown) {
            this.setVelocityX(-this.speed);
        }
        // RIGHT
        else if (keys.right.isDown) {
            this.setVelocityX(this.speed);
        }
        // UP
        if (keys.up.isDown) {
            this.setVelocityY(-this.speed);
        }
        // DOWN
        else if (keys.down.isDown) {
            this.setVelocityY(this.speed);
        }
    }

    shoot(time) {

        if (time < this.lastShotTime + this.fireRate) return;

        this.lastShotTime = time;

        let bullet = this.scene.playerBullets.create(
            this.x,
            this.y - 20,
            'shock'
        );

        bullet.setScale(0.2);
        bullet.setTint(0x66ccff);

        bullet.setVelocity(0, -400);
        bullet.body.setCircle(5);
        bullet.body.allowGravity = false;
        bullet.body.setCollideWorldBounds(false);
    }
    

    takeDamage(amount = 1) {

        this.health -= amount;

        if (this.health <= 0) {

            this.health = 0;

            this.setVelocity(0, 0);
            this.setActive(false);
            this.setVisible(false);

            this.body.enable = false;

            this.scene.scene.start('GameOverScene');
        }
    }

    isDead() {
        return this.lives <= 0;
    }
}