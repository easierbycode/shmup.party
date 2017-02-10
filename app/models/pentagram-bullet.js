
class Bullet extends Phaser.Bullet {
    
    kill() {

    }
    
    update() {
        this.angle++;
        this.tint   = Math.random() * 0xFFFFFF;
        super.update();
    }

}


/////////////////////////////////////////////////////////////////
//  A single pentagram bullet is fired in front of the trooper //
/////////////////////////////////////////////////////////////////

export class PentagramBullet extends Phaser.Weapon {

    BLOWS_SHIT_UP   = true;
    hitPoints   = 8;
    skullBulletFireSound;
    
    constructor( player, game, parent = game.world, name = 'Pentagram Bullet', addToStage = false, enableBody = true, physicsBodyType = Phaser.Physics.ARCADE ) {
        super( game, parent, name, addToStage, enableBody, physicsBodyType );
        
        this.nextFire       = 0;
        this.bulletSpeed    = 600;
        this.fireRate       = 1600;
        this.bulletClass    = Bullet;

        this.createBullets( 32, 'pentagramBullet' );

        this.pentagramBulletFireSound   = this.game.add.audio( 'pentagramBulletFire' );

        this.onFire.add(() => {
            this.pentagramBulletFireSound.play();
        }, this);
        
        this.trackSprite( player, 60, 5, true );
    }

}