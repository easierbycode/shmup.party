 
////////////////////////////////////////////////////////////////////////
//  A single bullet that scales in size as it moves across the screen //
////////////////////////////////////////////////////////////////////////

export class ScaleBullet extends Phaser.Weapon {
    
    pulseFireSound;
    
    constructor( player, game, parent = game.world, name = 'Scale Bullet', addToStage = false, enableBody = true, physicsBodyType = Phaser.Physics.ARCADE ) {
        super( game, parent, name, addToStage, enableBody, physicsBodyType );
        
        this.nextFire = 0;
        this.bulletSpeed = 800;
        this.fireRate = 100;

        this.createBullets( 32, 'bullet9' );

        this.pulseFireSound = this.game.add.audio( 'pulseFire' );

        this.onFire.add(function( bullet ) {
            this.pulseFireSound.play();
        }, this);

        this.trackSprite( player, 30, 6, true );
    }

}