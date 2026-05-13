export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, type = 'light') {
        super(scene, x, y, type);
        
        this.type = type;
        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        

        this.initStats(type);

        this.setVelocityY(this.speed);
        this.setCollideWorldBounds(false);

        this.body.setSize(this.width, this.height);
        this.body.setOffset(0, 0);

        this.setTint(0xff0000); 
        this.setFlipY(true);
        this.fireRate = this.fireRate || 1200;
        this.lastShotTime = 0;
        this.isDying = false;
    }

    initStats(type) {

        if (type === 'light') {
            this.health = 1;
            this.damage = 1;
            this.speed = 100;
            this.fireRate = 2000;
        }

        else if (type === 'tank') {
            this.health = 3;
            this.damage = 2; // ram damage
            this.speed = 70;
            this.fireRate = 0;
        }

        else if (type === 'heavy') {
            this.health = 4;
            this.damage = 2;
            this.speed = 50;
            this.fireRate = 1200;
        }
    }

    takeDamage(amount = 1) {

        this.health -= amount;

        if (this.health <= 0 && !this.isDying) {
            this.isDying = true;
            this.setTint(0x4682b4);

            this.setActive(false);
            this.setVisible(true);
            this.lastShotTime = Infinity;

            const playerX = this.scene.player.x;
            const direction = (this.x < playerX) ? -1 : 1;

            this.setVelocity(200 * direction, 100); // drift sideways + down
        }
    }

    shoot() {

        let bulletKey = (this.type === 'heavy') ? 'bigB' : 'smallB';

        let bullet = this.scene.enemyBullets.create(
            this.x,
            this.y + 20,
            bulletKey
        );

        bullet.damage = (this.type === 'heavy') ? 2 : 1;

        bullet.setVelocity(0, 300);
        bullet.body.setCircle(5);
        bullet.body.allowGravity = false;
        bullet.body.setCollideWorldBounds(false);
    }

    update(time) {

        if (!this.isDying && this.type !== 'tank') {

            if (time < this.lastShotTime + this.fireRate) return;

            this.lastShotTime = time;
            this.shoot();
        }
        }


}