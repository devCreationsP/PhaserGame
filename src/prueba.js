// Definición de la clase Game que extiende Phaser.Scene
export class Prueba extends Phaser.Scene{
    constructor() {
        super({key: 'game'});
        
    }
    // Precarga de recursos
    preload() {
        // Aquí puedes cargar recursos si es necesario
    }

    create() {
        // Agregar el contenido HTML al juego
        this.add.dom(400, 300, 'div', 'background-color: white; width: 300px; height: 200px;', '<h1>Holaaaa</h1>');
    }
    // Actualización del juego en cada fotograma
    update(){

        
    }
    
    // Función para recolectar las estrellas del juego
   
}




