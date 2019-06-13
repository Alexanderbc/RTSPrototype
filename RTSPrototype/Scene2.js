class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene2" });
    }

    // alle functies aanmaken die we nodig hebben
    create() {

        // alleen text met welkom bericht
        this.text = this.add.text(0, 0, "Welcome to Scene 2!", { font: "40px Impact" });

        // text verandert van kleur, plaats en animatie op basis van hardcoded data hier
        var tween = this.tweens.add({
            targets: this.text,
            x: 200,
            y: 200,
            duration: 2000,
            ease: "Elastic",
            easeParams: [1.5, 0.5],
            delay: 1000,
            onComplete: function (src, tgt) {
                tgt[0].x = 0;
                tgt[0].y = 0;
                tgt[0].setColor("Red");
            }
        }, this);

        // keys toekennen aan variables
        this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    }

    // teruggaan naar scenes 1 en 3 met nummers
    update(delta) {
        if (this.key_1.isDown) {
            this.scene.start("Scene1");
        }
        if (this.key_3.isDown) {
            this.scene.start("Scene3");
        }
    }
}