// Importa la clase 'Game' desde el archivo game.js
import  Game1  from './nivel-1';

// Configuración del juego
const config = {
    width: 1920,
    height: 1080,
    parent: "container",
    type: Phaser.AUTO,
    scene: [Game1], // Escena del juego es una instancia de la clase Game
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

var score = 0;
var scoreText = '';
// Crear una nueva instancia del juego con la configuración proporcionada
var game = new Phaser.Game(config);


