
class Bullet extends Phaser.Bullet {
    
    kill() {

    }
    
    update() {
        this.tint   = Math.random() * 0xFFFFFF;
        super.update();
    }

}


/////////////////////////////////////////////////////////////
//  A single skull bullet is fired in front of the trooper //
/////////////////////////////////////////////////////////////

export class SkullBullet extends Phaser.Weapon {

    hitPoints   = 8;
    skullBulletFireSound;
    
    constructor( player, game, parent = game.world, name = 'Skull Bullet', addToStage = false, enableBody = true, physicsBodyType = Phaser.Physics.ARCADE ) {
        super( game, parent, name, addToStage, enableBody, physicsBodyType );
        
        this.nextFire       = 0;
        this.bulletSpeed    = 600;
        this.fireRate       = 1600;
        this.bulletClass    = Bullet;

        this.createBullets( 32, 'skullBullet' );

        this.skullBulletFireSound   = this.game.add.audio( 'skullBulletFire' );

        this.onFire.add(() => {
            this.skullBulletFireSound.play();
        }, this);
        
        this.trackSprite( player, 60, 5, true );
    }

}