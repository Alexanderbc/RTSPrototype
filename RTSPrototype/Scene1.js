class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene1" });
    }

    // laden voordat de game begint
    preload() {
        this.load.image('composite2', 'pics/composite2.png');
        this.load.image('block', 'pics/block.png');
    }

    // alle functies aanmaken die we nodig hebben
    create() {
        this.composite = this.add.image(0, 300, 'composite2');

        this.upPress1 = this.add.image(150, 100, 'block');
        this.downPress1 = this.add.image(150, 440, 'block');

        this.upPress2 = this.add.image(400, 100, 'block');
        this.downPress2 = this.add.image(400, 440, 'block');

        this.upPress3 = this.add.image(650, 100, 'block');
        this.downPress3 = this.add.image(650, 440, 'block');

        this.goingDown = true;


        // klikken op D om de foto naar rechts te slepen
        this.input.keyboard.on('keyup_D', function (event) {
            this.composite.x += 10;
        }, this);

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // met een muisklik gaat de foto naar waar je hebt geklikt
        this.input.on('pointerdown', function (event) {
            this.composite.x = event.x;
            this.composite.y = event.y;
        }, this);

        // klikken op P om meerdere foto's van een composiet te generen, die hun eigen
        // zwaartekracht hebben
        this.input.keyboard.on('keyup_P', function (event) {
            var testcomposite = this.physics.add.composite(this.composite.x, this.composite.y, "composite2");
            testcomposite.setVelocity(Phaser.Math.RND.integerInRange(-100, 100), -300);
        }, this);

        // als je op 2 klikt ga je naar scene 2, op 3 ga je naar scene 3
        this.input.keyboard.on('keyup', function (event) {
            if (event.key === "1") {
                this.scene.start("Simulation");
            }
            if (event.key === "3") {
                this.scene.start("Scene3");
            }
        }, this);
    }

    // update gebeurt elke frame dus 60x per sec
    update() {
        if (this.composite.x === 150) {
            if (this.upPress1.y <= 300 && this.goingDown) {
                this.upPress1.y++
            }
            else {
                this.goingDown = false;
                if (this.upPress1.y >= 100 && !this.goingDown) {
                    this.upPress1.y--
                }
                else {
                    this.goingDown = true;
                    this.composite.x++
                }
            }
        }
        else if (this.composite.x < 400) {
            this.composite.x++
        }

        if (this.composite.x === 400) {
            if (this.upPress2.y <= 300 && this.goingDown) {
                this.upPress2.y++
            }
            else {
                this.goingDown = false;
                if (this.upPress2.y >= 100 && !this.goingDown) {
                    this.upPress2.y--
                }
                else {
                    this.goingDown = true;
                    this.composite.x++
                }
            }
        }
        else if (this.composite.x < 650 && this.composite.x >= 401) {
            this.composite.x++
        }

        if (this.composite.x === 650) {
            if (this.upPress3.y <= 300 && this.goingDown) {
                this.upPress3.y++
            }
            else {
                this.goingDown = false;
                if (this.upPress3.y >= 100 && !this.goingDown) {
                    this.upPress3.y--
                }
                else {
                    this.goingDown = true;
                    this.composite.x++
                }
            }
        }
        else if (this.composite.x < 900 && this.composite.x >= 651) {
            this.composite.x++
            if (this.composite.x === 900) {
                this.composite.x = 0
            }
        }
    }
}