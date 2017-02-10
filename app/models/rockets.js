
class Bullet extends Phaser.Bullet {

    kill() {
        var explosionAnimation = this.game.explosions.getFirstExists( false );
        explosionAnimation.reset( this.x, this.y );
        explosionAnimation.play( 'kaboom', 30, false, true );
        super.kill();
    }

}


///////////////////////////////////////////////////////////////////
//  Rockets that visually track the direction they're heading in //
///////////////////////////////////////////////////////////////////

export class Rockets extends Phaser.Weapon {

    BLOWS_SHIT_UP       = true;
    hitPoints           = 4;
    rocketFireSound;
    
    constructor( player, game, parent = game.world, name = 'Rockets', addToStage = false, enableBody = true, physicsBodyType = Phaser.Physics.ARCADE ) {
        super( game, parent, name, addToStage, enableBody, physicsBodyType );
        
        this.nextFire       = 0;
        this.bulletSpeed    = 400;
        this.fireRate       = 250;
        this.bulletClass    = Bullet;

        this.createBullets( 32, 'bullet10' );

        this.rocketFireSound = this.game.add.audio( 'rocketFire' );

        this.onFire.add(function( bullet ) {
            this.rocketFireSound.play();
        }, this);

        this.trackSprite( player, 40, 6, true );
    }

}