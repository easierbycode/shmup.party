
///////////////////////////////////////////////////////////////////
//  Rockets that visually track the direction they're heading in //
///////////////////////////////////////////////////////////////////

export class Rockets extends Phaser.Weapon {
    
    rocketFireSound;
    
    constructor( player, game, parent = game.world, name = 'Rockets', addToStage = false, enableBody = true, physicsBodyType = Phaser.Physics.ARCADE ) {
        super( game, parent, name, addToStage, enableBody, physicsBodyType );
        
        this.nextFire = 0;
        this.bulletSpeed = 400;
        this.fireRate = 250;

        this.createBullets( 32, 'bullet10' );

        this.rocketFireSound = this.game.add.audio( 'rocketFire' );

        this.onFire.add(function( bullet ) {
            this.rocketFireSound.play();
        }, this);

        this.trackSprite( player, 40, 6, true );
    }

}