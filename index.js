import Phaser from 'phaser';
import { Game1 } from './src/Game1.js'
import { Pregunta } from './src/Pregunta.js'

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

// Crear una nueva instancia del juego con la configuración proporcionada
var game = new Phaser.Game(config);








