// Importa la clase 'Game' desde el archivo game.js
import  {Game1}  from './Game1';
import {Pregunta} from './Pregunta'

// Configuración del juego
const config = {
    width: 1280,
    height: 720,
    parent: "container",
    type: Phaser.AUTO,
    scene: [Game1,Pregunta], // Escena del juego es una instancia de la clase Game
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


