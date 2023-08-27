export class Game extends Phaser.Scene{
    constructor() {
        super({key: 'game'});

    }
    preload(){
        this.load.image("sky", "./assets/sky.png");
        this.load.image("bomb", "./assets/bomb.png");
        this.load.image("dude", "./assets/dude.png");
        this.load.image("platform", "./assets/platform.png");
        this.load.image("star", "./assets/star.png");
    }
    create(){
        this.add.image(400, 300, "sky");
        this.add.image(500, 90, "star");
        this.add.image(150, 80, "dude");
        /**
         * con esta linea de codigo consigo que el elmento no se salga de la pantalla
         * y permanezca dentro del campo visual
         */
        this.physics.world.setBoundsCollision(true, true, true, false);

        /**
         * con el metodo physiscs nos permite manipular
         *  la imagen para asignarle acciones
         * el metodo setInmovable nos permitira dejar fijo el elemnto
         * evitando algun desplazamiento cuando ocurra alguna colision
        */
        this.ball = this.physics.add.image(400, 90, "bomb");
        
        /**
         * con esta linea de codigo el elemento colisionara con los vorder
         * del entorno del juego
         */
        this.ball.setCollideWorldBounds(true);
        this.platform = this.physics.add.image(400, 500, "platform").setImmovable();
        this.platform.body.allowGravity = false;

        /**
         * aca creo una variable que me permite asignarle posiciones y velocidad
         * aleatoria al elemento cada vez que se reinicie la pagina
         */
        let velocity = 100 * Phaser.Math.Between(1.3, 2);
        if(Phaser.Math.Between(0, 10) > 5){
            velocity = 0 - velocity;
        }
        this.ball.setVelocity(velocity, 10);

        /**
         * con el metodo collider conseguimos programar colisiones,
         * dentro le asignamos los elementos que queremos que colisionen 
        */
        this.physics.add.collider(this.ball, this.platform);

        /**
         * el metodo setBounce nos permitira generar el rebote al
         * momento en el que sucede la colicion
         */

        this.ball.setBounce(0.8);
        /**
         * el metodo keyboard nos permite interactuar
         *  con los elementos que le asignemos
        */
        this.cursors = this.input.keyboard.createCursorKeys();

        
    }
    update(time, delta){
        if(this.cursors.left.isDown){
            this.platform.setVelocityX(-500);
        }else if(this.cursors.right.isDown){
            this.platform.setVelocityX(500);
        }
        else{
            this.platform.setVelocityX(0);
        }

        if(this.ball.y > 500){
            console.log('fin');
            this.scene.pause();
        }


    }
    
}





