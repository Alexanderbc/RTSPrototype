class Simulation extends Phaser.Scene {
    constructor() {
        super({ key: "Simulation" });
    }

    preload() {
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
        this.load.image('helper', 'pics/helper.png');
        this.load.image('composite', 'pics/composite.png');
        this.load.image('presser', 'pics/presser.png');
    }

    create() {

        var rect = new Phaser.Geom.Rectangle(20, 320, 70, 45);
        var graphics = this.add.graphics({ fillStyle: { color: 0x7D8C8C } });
        graphics.fillRectShape(rect);
        graphics.setInteractive(rect, event);

        rect = new Phaser.Geom.Rectangle(20, 360, 150, 45);
        graphics.fillRectShape(rect);
        graphics.setInteractive(rect, event);

        rect = new Phaser.Geom.Rectangle(170, 375, 50, 20);
        graphics.fillRectShape(rect);
        graphics.setInteractive(rect, event);

        graphics.strokeRoundedRect(220, 270, 70, 162, 20);
        graphics.strokeRoundedRect(220, 352, 150, 80, 20);
        graphics.strokeRoundedRect(340, 392, 150, 40, 15);

        graphics.lineStyle(5, 0x49D134, 1.0);
        graphics.strokeRect(200, 264, 40, 20);
        graphics.lineStyle(4, 0xffff00, 1);

        rect = new Phaser.Geom.Rectangle(320, 393, 70, 38);
        graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });
        graphics.fillRectShape(rect);
        rect = new Phaser.Geom.Rectangle(299, 373, 70, 38);
        graphics.fillRectShape(rect);

        this.helper1 = this.add.sprite(510, 337, "helper");
        this.helper1.setOrigin(0.1, 0.4);

        graphics.strokeRoundedRect(560, 392, 290, 90, 15);

        graphics.lineStyle(5, 0x49D134, 1.0);
        graphics.strokeRect(200, 264, 40, 20);

        graphics = this.add.graphics({ fillStyle: { color: 0x7D8C8C } });

        this.composites = [];
        this.composite = this.add.sprite(30, 380, "composite");
        //this.composite = this.add.sprite(831, 330, "composite");
        this.composite.setOrigin(0.1, 0.4);
        this.speed = 0.5;

        this.rect1 = this.add.sprite(600, 240, "presser");
        this.rect2 = this.add.sprite(700, 240, "presser");
        this.rect3 = this.add.sprite(800, 240, "presser");

        this.grabbed1 = false;
        this.grabbed2 = false;
        this.rectReachedLowest = [false, false, false];

        this.helper2 = this.add.sprite(900, 337, "helper");
        this.helper2.setOrigin(0.1, 0.4);

        graphics.lineStyle(5, 0x49D134, 1.0);
        graphics.strokeRect(900, 390, 300, 90);

        this.input.keyboard.on('keyup', function (event) {
            if (event.key === "2") {
                this.scene.start("Scene1");
            }
        }, this);
    }

    update() {
        this.helper1.rotation -= 0.01;
        this.helper2.rotation -= 0.01;
        if (this.grabbed1) {
            this.moveCompositeWithHelper(this.composite);
        } else if (this.grabbed2) {
            this.moveCompositeWithHelper2(this.composite);
        }
        else {
            this.moveComposite(this.composite);
        }
    }

    moveComposite(composite) {
        if (composite.x <= 205) {
            composite.x += this.speed;
        } else if (composite.x === 205.5 && composite.y >= 274) {
            composite.y -= this.speed;
        } else if (composite.x <= 275 && composite.y === 273.5) {
            composite.x += this.speed;
        } else if (composite.x === 275.5 && composite.y <= 345) {
            composite.y += this.speed;
        } else if (composite.x <= 355.5 && composite.y === 345.5) {
            composite.x += this.speed;
        } else if (composite.x === 356 && composite.y <= 383.5) {
            composite.y += this.speed;
        } else if (composite.x <= 470 && composite.y === 384) {
            composite.x += this.speed;
        } else if (composite.x === 470.5 && composite.y === 384) {
            if (this.helper1.rotation >= 2.00 && this.helper1.rotation <= 2.30) {
                console.log("Grab");
                this.grabbed1 = true;
                this.moveCompositeWithHelper(composite);
            }
        } else if (composite.x <= 590.5 && composite.y === 330) {
            composite.x += this.speed;
        } else if (composite.x === 591 && composite.y === 330) {
            if (this.rect1.y <= 240 && this.rectReachedLowest[0]) {
                composite.x += this.speed;
            } else {
                console.log(this.rect1.y + " " + this.rectReachedLowest[0]);
                this.movePress(this.rect1, 0);
            }

        } else if (composite.x <= 691.5 && composite.y === 330) {
            composite.x += this.speed;
        } else if (composite.x <= 692 && composite.y === 330) {
            if (this.rect2.y <= 240 && this.rectReachedLowest[1]) {
                composite.x += this.speed;
            } else {
                console.log(this.rect2.y + " " + this.rectReachedLowest[1]);
                this.movePress(this.rect2, 1);
            }

        } else if (composite.x <= 792.5 && composite.y === 330) {
            composite.x += this.speed;
        } else if (composite.x <= 793 && composite.y === 330) {
            if (this.rect3.y <= 240 && this.rectReachedLowest[2]) {
                composite.x += this.speed;
            } else {
                console.log(this.rect3.y + " " + this.rectReachedLowest[2]);
                this.movePress(this.rect3, 2);
            }

        } else if (composite.x <= 830.5 && composite.y === 330) {
            composite.x += this.speed;
        } else if (composite.x <= 831 && composite.y === 330) {
            if (this.helper2.rotation >= 3.00 && this.helper2.rotation <= 3.24) {
                console.log("Grab");
                this.grabbed2 = true;
                this.moveCompositeWithHelper2(composite);
            }
        } else if (composite.x >= 900 && composite.x < 1170) {
            composite.x += this.speed;
        } else if (composite.x >= 1170) {
            composite.x = 30;
            composite.y = 380;
            this.rectReachedLowest[0] = false;
            this.rectReachedLowest[1] = false;
            this.rectReachedLowest[2] = false;
        }
        //console.log("Rotation: " + this.helper1.rotation.toFixed(2));
        //890
        console.log("x: " + composite.x);
        console.log("y: " + composite.y);

    }

    movePress(rect, point) {

        if (rect.y <= 314 && this.rectReachedLowest[point] === false) {
            rect.y += 0.5;
        } else {
            this.rectReachedLowest[point] = true;
            rect.y -= 0.5;
        }
        console.log("rect: " + rect.y);
    }

    moveCompositeWithHelper(composite) {
        if (composite.y <= 330) {
            this.grabbed1 = false;
            return false;
        }
        if (composite.x <= 550) {
            composite.x += this.speed;
        } else {
            composite.y -= this.speed;
        }

    }

    moveCompositeWithHelper2(composite) {
        if (composite.x >= 900) {
            this.grabbed2 = false;
            return false;
        }
        if (composite.y >= 330 && composite.y <= 380) {
            composite.y += this.speed;
            composite.x += 0.3;
            console.log("A");
        } else {
            composite.x += this.speed;
            //if (composite.x >= 1170) {
            //composite.destroy();
            //}
            console.log(composite.x + " " + composite.y);

        }
    }
}
