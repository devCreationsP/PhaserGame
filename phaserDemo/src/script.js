// Importa la clase 'Game' desde el archivo game.js
import {Game} from './game';

// Configuración del juego
const config = {
    width: 800,
    height: 600,
    parent: "container",
    type: Phaser.AUTO,
    scene: [Game], // Escena del juego es una instancia de la clase Game
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y:300,
            },
            debug: false,
        }
    }
}

// Crear una nueva instancia del juego con la configuración proporcionada
var game = new Phaser.Game(config);


