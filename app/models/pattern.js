
///////////////////////////////////////////////////////////////////////
//  Bullets have Gravity.y set on a repeating pre-calculated pattern //
///////////////////////////////////////////////////////////////////////

export class Pattern extends Phaser.Weapon {
    
    constructor( player, game, parent = game.world, name = 'Pattern', addToStage = false, enableBody = true, physicsBodyType = Phaser.Physics.ARCADE ) {
        super( game, parent, name, addToStage, enableBody, physicsBodyType );
        
        this.nextFire = 0;
        this.bulletSpeed = 600;
        this.fireRate = 40;
        this.bulletAngleVariance = 10;

        this.createBullets( 64, 'bullet4' );

         this.trackSprite( player, 45, 6, true );
    }

}