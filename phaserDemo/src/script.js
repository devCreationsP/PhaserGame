import {Game} from './game';

const config = {
    width: 800,
    height: 600,
    parent: "container",
    type: Phaser.AUTO,
    scene: [Game],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y:40,
            },
            debug: false,
        }
    }
}

var game = new Phaser.Game(config);


