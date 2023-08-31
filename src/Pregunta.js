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

       this.add.image(0, 300, "sky").setScale(2);

        const preguntaText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 100,
            '¿Cuál es la capital de Francia?',
            {
                fontSize: '24px',
                color: '#ffffff',
                align: 'center'
            }
        );
        preguntaText.setOrigin(0.5);
    
        const opciones = ['Londres', 'París', 'Berlín', 'Madrid'];
        const opcionRects = []; // Para almacenar los rectángulos de las opciones
        const opcionTexts = []; // Para almacenar los textos de las opciones
    
        opciones.forEach((opcion, index) => {
            const opcionRect = new Phaser.Geom.Rectangle(
                this.cameras.main.centerX - 100, // X de inicio del recuadro
                this.cameras.main.centerY + (index + 1) * 50 - 20, // Y de inicio del recuadro
                200, // Ancho del recuadro
                40 // Alto del recuadro
            );
    
            const opcionText = this.add.text(
                opcionRect.centerX,
                opcionRect.centerY,
                opcion,
                {
                    fontSize: '20px',
                    color: '#ffffff',
                    align: 'center'
                }
            );
            opcionText.setOrigin(0.5);
            opcionTexts.push(opcionText);
            
            opcionText.setInteractive({ useHandCursor: true });
            opcionText.on('pointerdown', () => {
                opcionText.setColor('#00ff00'); // Cambiar a verde (#00ff00)

                // Obtener referencia a la escena game1
                const game1Scene = this.scene.get('Game1');

                // Llamar a la función para generar estrellas en game1
                game1Scene.generateStars();

                // Cerrar la escena después de 5 segundos
                setTimeout(() => {
                    this.scene.stop('Pregunta'); // Detener la escena
                }, 3000); // 5000 milisegundos = 5 segundos 
                
            });

    
            // Dibujar el recuadro alrededor del texto
            const graphics = this.add.graphics();
            graphics.fillStyle(0x333333, 0.1); // Color y opacidad del recuadro
            graphics.fillRectShape(opcionRect);
    
            // Almacenar el rectángulo y el texto en sus respectivos arrays
            opcionRects.push(opcionRect);
        });
    }
    
    // Actualización del juego en cada fotograma
    update(){

        
    }
    
   
}


        // Crear el texto como un botón
        // const buttonText = this.add.text(100, 100, 'Hola mundo', {
        //     fontSize: '32px',
        //     color: '#ffffff'
        // });
        // Agregar interactividad al botón
        // buttonText.setInteractive({ useHandCursor: true });
        // buttonText.on('pointerdown', () => {
        //     buttonText.setColor('#00ff00'); // Cambiar a verde (#00ff00)
        //             // Cerrar la escena después de 5 segundos
        // setTimeout(() => {
        //     this.scene.stop('Pregunta'); // Detener la escena
        // }, 5000); // 5000 milisegundos = 5 segundos  
        // });





