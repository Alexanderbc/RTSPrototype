class Scene3 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene3" });
    }

    // laden voordat de game begint
    preload() {
        // we gaan nu muziek afspelen
        this.load.audio('test', ['assets/avemaria.mp3']);
    }

    // alle functies aanmaken die we nodig hebben
    create() {
        // geef je muziek een variable, naam en zet loop op true, speel daarna af
        this.soundFX = this.sound.add("test", { loop: "true" });
        this.soundFX.play();

        // op L klikken om loop te stoppen
        this.input.keyboard.on("keydown_L", function (event) {
            this.soundFX.loop = !this.soundFX.loop;
            if (this.soundFX.loop) {
                this.soundFX.play();
            }
        }, this);

        // op P klikken om muziek te pauzeren of laten afspelen
        this.input.keyboard.on("keydown_P", function (event) {
            if (this.soundFX.isPlaying) {
                this.soundFX.pause();
            } else {
                this.soundFX.resume();
            }
        }, this);
    }
}