import Phaser from 'phaser';
// Definición de la clase Game que extiende Phaser.Scene
export class Game1 extends Phaser.Scene{
    constructor() {
        super({key: 'game'});
        this.score = 0;
        this.scoreText;
        this.gameOver = false;
        this.moveCam = false;
        this.gamePause = false
    }
    // Precarga de recursos
    preload(){
        // Cargar imágenes y hojas de sprites
        this.load.image("sky", "./assets/Nivel I.png");
        this.load.image("bomb", "./assets/bomb.png");
        this.load.spritesheet("dude", "./assets/Personajes2.png",{ frameWidth: 131, frameHeight: 137 });
        this.load.image("platform4", "./assets/Bloque4.png");
        this.load.image("platform2", "./assets/Bloque2.png");
        this.load.image("platform1", "./assets/Bloque1.png");
        this.load.image("floor", "./assets/PNivelII y IV.png")
        this.load.image("star", "./assets/star.png");
        this.load.image("question", "./assets/CajaPregunta.png");
        this.load.image("cloud1", "./assets/Nube1.png");
        this.load.image("bush1", "./assets/Arbusto1.png");
        this.load.image("bush2", "./assets/Arbusto2.png");        
    }

      // Creación de elementos al inicio del juego
    create(){

        // Agregar una imagen de fondo
        this.add.image(0, 450, "sky").setScale(1,0.6);
        this.add.image(600, 450, "sky").setScale(1,0.6);
        this.add.image(1200, 450, "sky").setScale(1,0.6);
        this.add.image(0, 650, "sky").setScale(1,0.6);

    
        //-------------------------------------- Crear un grupo estático de plataformas ---------------------------//
        this.platform = this.physics.add.staticGroup();

        const floorPositions = [
            {x: 0, y: 850},
            {x: 400, y: 850},
            {x: 800, y: 850},
            {x: 1200, y: 850},
        ]

        floorPositions.forEach((position)=> {
            const floor = this.platform.create(position.x, position.y, "floor").setScale(1,2).refreshBody();
        })  
        //------------------------------------- Crear plataforma de 2 bloques ----------------------------------//
        const bricks2 = [
            {x: 1200, y: 400 }
        ]

        bricks2.forEach((position) => {
            const platform = this.platform.create(position.x, position.y, "platform2").setScale(0.8).refreshBody(0.5)
            platform.body.setSize(platform.width * 0.7, platform.height * 0.7);
        })
        //------------------------------------- Crear plataforma de 4 bloques -----------------------------------//
         const floor4 = [
             { x: 600, y: 520 },
             { x: 1600, y: 520}
             // Otras posiciones de plataformas aquí...
         ];
        
         floor4.forEach((position) => {
             const platform = this.platform.create(position.x, position.y, "platform4").setScale(0.8).refreshBody(0.5);
         });
        //------------------------------------- Crear un grupo para las nubes -----------------------------------//
        this.clouds1 = this.physics.add.staticGroup();

        // Definir las posiciones de las nubes
        const cloudPositions = [
            { x: 600, y: 300 },
            { x: 1500, y: 300 }
        ];
        cloudPositions.forEach((position) => {
            const cloud = this.clouds1.create(position.x, position.y, "cloud1").setScale(0.8);
        });
        //------------------------------------- Crear un grupo para los arbustos --------------------------------//

        this.bush1 = this.physics.add.staticGroup();
        const bushPosition = [
            { x: 470, y: 658 }
        ]
        bushPosition.forEach((position) => {
            const bush = this.bush1.create(position.x, position.y, "bush1").setScale(0.8)
        })
        //------------------------------------- Crear un grupo para los arbustos --------------------------------//
        const bushPosition2 = [
            { x: 1270, y: 658 }
        ]
        bushPosition2.forEach((position) => {
            const bush = this.bush1.create(position.x, position.y, "bush2").setScale(0.8)
        })
        //-------------------------------------------------------------------------------------------------------//
        // Agregar al jugador como un sprite físico
        this.player = this.physics.add.sprite(200, 450, "dude").setScale(0.9).refreshBody(0.5);
        this.player.setCollideWorldBounds();
        this.player.setBounce(0.2);

        // Crear animaciones para el jugador derecha izquierda y estatico
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude",{ start: 0, end: 3}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "turn",
            frames: [{key: "dude", frame: 4}],
            frameRate: 25,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude",{ start: 5, end: 8}),
            frameRate: 20,
            repeat: -1
        });

        //con esta linea de codigo se le da gravedad al elemento que se escoja
        // this.player.body.setGravityY(1000);

        // Agregar colisión entre el jugador y las plataformas
        this.physics.add.collider(this.player, this.platform);
        // Crear cursores para el control del jugador
        this.cursors = this.input.keyboard.createCursorKeys();

        // Creacion de grupo de estrellas
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 20,
            setXY: {x: 12, y:0, stepX: 70}
        })
        // Función para que las estrellas tengan el efecto Bounce
        this.stars.children.iterate(function(child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })
        // Colisión con las plataformas creadas
        this.physics.add.collider(this.stars, this.platform)

        // Hacer desaparecer las estrellas cuando el personaje pasa por encima
        
        this.physics.add.overlap(this.player, this.stars, (player, star) => this.collectStar(player,star))
        // Se setea el puntaje en la p (x , y) , text ,  json { tamaño  y color}
        
        this.scoreText = this.add.text(16, 16, 'Score : 0', { fontSize: '18px', fill:'white'})
        
        // Creacion del grupo de bombas 

        this.bombs = this.physics.add.group();

        // Para que reboten en las plataformas
        this.physics.add.collider(this.bombs, this.platforms);
         
        // Función de collisión de personaje con bomba
        this.physics.add.collider(this.player, this.bombs, (player, bomb) => this.hitBomb(player, bomb))

        //Camare que sigue al personaje
        this.cameras.main.startFollow(this.player, true, 0.1, 0);
        //Camara fija en el eje y
        this.initialCameraY = this.cameras.main.centerY;

        //Interrogante para las preguntas
        this.question = this.physics.add.staticGroup();
        // Configura el temporizador para crear preguntas aleatorias cada 30 segundos
        this.question.create(0, 500, "question").setScale(0.5).refreshBody();
        // this.timer = setInterval(() => {
        //     this.createRandomQuestion();
        // }, 30000); // 30 segundos en milisegundos = 30000

        this.physics.add.collider(this.player, this.question, (player, question) => this.hitQuestion(player, question));

    }   
    // Actualización del juego en cada fotograma
    update(){

        if(this.gameOver){
            return
        }
        // Control del jugador basado en las teclas
        const cam = this.cameras.main;

        if(this.cursors.left.isDown){
            this.player.setVelocityX(-260);
            this.player.anims.play('left', true);
            cam.scrollX -= 4;
        }else if(this.cursors.right.isDown){
            this.player.setVelocityX(260);
            this.player.anims.play('right', true);
            cam.scrollX += 4;
        }else{
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }


        // Salto del jugador si está en el suelo y se presiona la tecla de arriba
        if(this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-400);
        }
    }
    
    // Función para recolectar las estrellas del juego
    collectStar (player, star) {
        star.disableBody(true, true)
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);

        // Cada vez que se terminan las estrellas se genera 1 bomba
        if(this.stars.countActive(true) === 0){
            this.stars.children.iterate(function(child){
                child.enableBody(true, child.x, 0, true, true)
            })
            // Condicion para obtener posicion del personaje y generar una bomba 
            // en una poisición contraria
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            
            // Creacion y seteo de la bomba
            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1)
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
        }

    }

    // Creación de las bombas
    hitBomb(player, bomb) {

        this.physics.pause();

        player.setTint(0xff0000)

        player.anims.play('turn')

        this.gameOver = true;
    }

    hitQuestion(player, question){
        question.disableBody(true, true)
        this.scene.launch('Pregunta');
        
    }
 //   createRandomQuestion() {
 //       const randomX = Math.random() * 1000; // Reemplaza "tuAncho" con el ancho de tu área de juego
 //       const randomY = Math.random() * 500; // Reemplaza "tuAlto" con el alto de tu área de juego
 //       this.question.create(randomX, randomY, "question").setScale(4);
 //     }
}