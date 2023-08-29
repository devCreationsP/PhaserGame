// Definición de la clase Game que extiende Phaser.Scene
export class Pregunta extends Phaser.Scene{
    constructor() {
        super({key: 'Pregunta'});
        
    }
    // Precarga de recursos
    preload() {
        // Aquí puedes cargar recursos si es necesario
        this.load.image("sky", "./assets/Nivel-i.png");
    }

    create() {
        this.add.image(0, 300, "sky").setScale(4, 2);

        // Crear el texto como un botón
        const buttonText = this.add.text(100, 100, 'Hola mundo', {
            fontSize: '32px',
            color: '#ffffff'
        });

        // Agregar interactividad al botón
        buttonText.setInteractive({ useHandCursor: true });
        buttonText.on('pointerdown', () => {
            buttonText.setColor('#00ff00'); // Cambiar a verde (#00ff00)
                    // Cerrar la escena después de 5 segundos
        setTimeout(() => {
            this.scene.stop('Pregunta'); // Detener la escena
        }, 5000); // 5000 milisegundos = 5 segundos  
        });
      
    }
    // Actualización del juego en cada fotograma
    update(){

        
    }
    
    // Función para recolectar las estrellas del juego
   
}




