import Enemy from './Enemy.js';

export default class WaveManager {

    constructor(scene) {
        this.scene = scene;
        this.wave = 0;
        this.maxWaves = 3;
        this.completed = false;
    }

    start() {
        this.nextWave();
    }

    nextWave() {

        if (this.completed) return;

        this.wave++;

        if (this.wave === 1) this.wave1();
        else if (this.wave === 2) this.wave2();
        else if (this.wave === 3) this.wave3();
        else {
            console.log("All waves complete!");
            this.completed = true;
        }
    }

    wave1() {
        this.spawnRow('light', 3, 150);
    }

    wave2() {
        this.spawnRow('light', 3, 100);
        this.spawnRow('tank', 2, 250);
    }

    wave3() {
        this.spawnRow('heavy', 3, 100);
        this.spawnRow('tank', 2, 200);
        this.spawnRow('light', 3, 50);
    }

    spawnRow(type, count, y) {

        for (let i = 0; i < count; i++) {

            let x = 200 + i * 150;

            let enemy = new Enemy(this.scene, x, y, type);

            this.scene.enemies.add(enemy);
        }
    }
}