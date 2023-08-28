// Definición de la clase Game que extiende Phaser.Scene
export class Game extends Phaser.Scene{
    constructor() {
        super({key: 'game'});

    }
    // Precarga de recursos
    preload(){
        // Cargar imágenes y hojas de sprites
        this.load.image("sky", "./assets/sky.png");
        this.load.image("bomb", "./assets/bomb.png");
        this.load.spritesheet("dude", "./assets/dude.png",{ frameWidth: 32, frameHeight: 48 });
        this.load.image("platform", "./assets/platform.png");
        this.load.image("star", "./assets/star.png");
    }

      // Creación de elementos al inicio del juego
    create(){

        // Agregar una imagen de fondo
        this.add.image(400, 300, "sky");

        // Crear un grupo estático de plataformas
        this.platform = this.physics.add.staticGroup();
        this.platform.create(400, 568, "platform").setImmovable().setScale(2).refreshBody();
        this.platform.create(600, 400, "platform");
        this.platform.create(50, 250, "platform");
        this.platform.create(750, 220, "platform");

        // Agregar al jugador como un sprite físico
        this.player = this.physics.add.sprite(100, 450, "dude");
        this.player.setCollideWorldBounds();
        this.player.setBounce(0.3);

        // Crear animaciones para el jugador derecha izquierda y estatico
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude",{ start: 0, end: 3}),
            frameRete: 10,
            repeat: -1
        });

        this.anims.create({
            key: "turn",
            frames: [{key: "dude", frame: 4}],
            frameRete: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude",{ start: 5, end: 8}),
            frameRete: 10,
            repeat: -1
        });

        //con esta linea de codigo se le da gravedad al elemento que se escoja
        // this.player.body.setGravityY(1000);

        // Agregar colisión entre el jugador y las plataformas
        this.physics.add.collider(this.player, this.platform);
        // Crear cursores para el control del jugador
        this.cursors = this.input.keyboard.createCursorKeys();
    }   

    // Actualización del juego en cada fotograma
    update(){

        // Control del jugador basado en las teclas
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }else if(this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }else{
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        // Salto del jugador si está en el suelo y se presiona la tecla de arriba
        if(this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-330);
        }
    }
    
}





