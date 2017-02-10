
class Bullet extends Phaser.Bullet {

    kill() {

    }

    update() {

      if ( this.animations.frame < 2 )
      {
        this.animations.frame++;
      
      } else {
        this.animations.frame  = 0;
      }

      super.update();
    }

}


export class PacmanBullet extends Phaser.Weapon {

    BLOWS_SHIT_UP     = true;
    hitPoints         = 8;
    
    constructor( player, game, parent = game.world, name = 'Pacman Bullet', addToStage = false, enableBody = true, physicsBodyType = Phaser.Physics.ARCADE ) {
        super( game, parent, name, addToStage, enableBody, physicsBodyType );
        
        this.nextFire       = 0;
        this.bulletSpeed    = 600;
        this.fireRate       = 600;
        this.bulletClass    = Bullet;

        this.createBullets( 32, 'pacmanBullet', 0 );
        
        this.trackSprite( player, 42, 5, true );
    }

}