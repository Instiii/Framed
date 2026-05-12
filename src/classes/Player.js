export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y, 'light');

        // Add player to scene
        scene.add.existing(this);

        // Enable physics
        scene.physics.add.existing(this);

        // Player stats
        this.speed = 300;
        this.maxHealth = 3;
        this.health = this.maxHealth;
        this.lives = 3;

        this.setTint(0x0000ff);

        // Keep inside screen
        this.setCollideWorldBounds(true);
    }

    move(keys) {
        // Stop previous movement
        this.setVelocity(0);
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
    

    takeDamage() {
        // subtract 1 hit
        this.health -= 1;

        // check if life is lost
        if (this.health <= 0) {
            this.lives -= 1;

            if (this.lives > 0) {
                // reset to full hits for next life
                this.health = this.maxHealth;

            } else {
                // game over state
                this.health = 0;
                this.setVelocity(0);
                this.setActive(false);
                this.setVisible(false);
            }
        }
    }
    isDead() {
        return this.lives <= 0;
    }
}