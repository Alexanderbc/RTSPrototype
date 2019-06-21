// maak config voor alle opties van de Phaser game window hier

var config = {
    type: Phaser.AUTO,
    width: 1350,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },

    // zet al je scenes hier voordat je eraan begint te werken
    scene: [Simulation, Scene1, Scene2, Scene3] 
    //{
    //    preload: preload,
    //    create: create
    //}
};

var game = new Phaser.Game(config);