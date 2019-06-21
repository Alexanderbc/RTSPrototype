﻿var config = {
    type: Phaser.AUTO,
    width: 1350,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [Simulation]
};

var game = new Phaser.Game(config);