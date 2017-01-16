
///////////////////////////////////////////////////////////////////////
//  A three-way fire where the top and bottom bullets bend on a path //
///////////////////////////////////////////////////////////////////////

export class SplitShot extends Phaser.Weapon {
    
    constructor( player, game, parent = game.world, name = 'Split Shot', addToStage = false, enableBody = true, physicsBodyType = Phaser.Physics.ARCADE ) {
        super( game, parent, name, addToStage, enableBody, physicsBodyType );
        
        this.nextFire = 0;
        this.bulletSpeed = 700;
        this.fireRate = 40;     

        this.createBullets( 64, 'bullet8' );

        this.trackSprite( player, 35, 6, true );
    }

}