class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene1" });
    }

    // laden voordat de game begint
    preload() {
        this.load.image('composite', 'assets/composite.jpg');
    }

    // alle functies aanmaken die we nodig hebben
    create() {
        this.image = this.add.image(400, 300, 'composite');

        // klikken op D om de foto naar rechts te slepen
        this.input.keyboard.on('keyup_D', function (event) {
            this.image.x += 10;
        }, this);

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        // met een muisklik gaat de foto naar waar je hebt geklikt
        this.input.on('pointerdown', function (event) {
            this.image.x = event.x;
            this.image.y = event.y;
        }, this);

        // klikken op P om meerdere foto's van een composiet te generen, die hun eigen
        // zwaartekracht hebben
        this.input.keyboard.on('keyup_P', function (event) {
            var testImage = this.physics.add.image(this.image.x, this.image.y, "composite");
            testImage.setVelocity(Phaser.Math.RND.integerInRange(-100, 100), -300);
        }, this);

        // als je op 2 klikt ga je naar scene 2, op 3 ga je naar scene 3
        this.input.keyboard.on('keyup', function (event) {
            if (event.key === "2") {
                this.scene.start("Scene2");
            }
            if (event.key === "3") {
                this.scene.start("Scene3");
            }
        }, this);
    }

    // update de plaats van de foto als je A blijft houden
    update(delta) {
        if (this.key_A.isDown) {
            this.image.x--;
        }
    }
}