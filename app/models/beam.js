
//////////////////////////////////////////////////////////////////////////
//  Fires a streaming beam of lazers, very fast, in front of the player //
//////////////////////////////////////////////////////////////////////////

export class Beam extends Phaser.Weapon {
    
    constructor( player, game, parent = game.world, name = 'Beam', addToStage = false, enableBody = true, physicsBodyType = Phaser.Physics.ARCADE ) {
        super( game, parent, name, addToStage, enableBody, physicsBodyType );
        
        this.nextFire = 0;
        this.bulletSpeed = 1000;
        // this.fireRate = 45;
        this.fireRate = 180;

        this.createBullets( 64, 'bullet11' );

        this.trackSprite( player, 62, 6, true );

        this.beamFireSound = this.game.add.audio( 'beam' );

        this.onFire.add(function( bullet ) {
            this.beamFireSound.play();
        }, this);
    }

}