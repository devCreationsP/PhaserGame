// Definición de la clase Game que extiende Phaser.Scene
class Game1 extends Phaser.Scene{
    constructor() {
        super({key: 'game'});
        this.score = 0;
        this.scoreText;
        this.gameOver = false;
        this.moveCam = false;
    }
    // Precarga de recursos
    preload(){
        // Cargar imágenes y hojas de sprites
        this.load.image("sky", "./assets/Nivel-i.png");
        this.load.image("bomb", "./assets/bomb.png");
        this.load.spritesheet("dude", "./assets/prueba2-removebg.png",{ frameWidth: 32, frameHeight: 48 });
        this.load.image("platform", "./assets/platform.png");
        this.load.image("star", "./assets/star.png");
        this.load.image("question", "./assets/quest.png");
    }

      // Creación de elementos al inicio del juego
    create(){

        // Agregar una imagen de fondo
        this.add.image(0, 300, "sky").setScale(4,2);

        // Crear un grupo estático de plataformas
        this.platform = this.physics.add.staticGroup();
        this.platform.create(400, 568, "platform").setScale(12, 2).refreshBody();
        this.platform.create(600, 400, "platform");
        this.platform.create(50, 250, "platform");
        this.platform.create(750, 220, "platform");
        this.platform.create(1200, 400, "platform");
        this.platform.create(1400, 200, "platform");

        // Agregar al jugador como un sprite físico
        this.player = this.physics.add.sprite(200, 450, "dude").setScale(1.2);
        this.player.setCollideWorldBounds();
        this.player.setBounce(0.3);

        // Crear animaciones para el jugador derecha izquierda y estatico
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude",{ start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "turn",
            frames: [{key: "dude", frame: 4}],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude",{ start: 5, end: 8}),
            frameRate: 10,
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
        this.cameras.main.startFollow(this.player, true);

        //Interrogante para las preguntas
        this.question = this.physics.add.staticGroup();
        // Configura el temporizador para crear preguntas aleatorias cada 30 segundos
        this.timer = setInterval(() => {
            this.createRandomQuestion();
        }, 30000); // 30 segundos en milisegundos = 30000

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
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
            cam.scrollX -= 4;
        }else if(this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
            cam.scrollX += 4;
        }else{
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }


        // Salto del jugador si está en el suelo y se presiona la tecla de arriba
        if(this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-330);
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
        this.scene.launch('Prueba');
        
    }
    createRandomQuestion() {
        const randomX = Math.random() * 1000; // Reemplaza "tuAncho" con el ancho de tu área de juego
        const randomY = Math.random() * 500; // Reemplaza "tuAlto" con el alto de tu área de juego
        this.question.create(randomX, randomY, "question").setScale(4);
      }
}

export default Game1;



