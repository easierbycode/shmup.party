
import { Beam } from './beam';
import { Pattern } from './pattern';
import { Rockets } from './rockets';
import { ScaleBullet } from './scale-bullet';
import { SkullBullet } from './skull-bullet';
import { SplitShot } from './split-shot';


export class Player extends Phaser.Sprite {
    
    currentWeapon   = 0;
    weapons         = [];
    
    constructor(gamepad, game, x = 0, y = 0, key = 'dude') {
        super(game, x, y, key);

        game.add.existing(this);
        game.physics.arcade.enable(this);
        
        this.body.collideWorldBounds    = true;

        this.anchor.setTo( 0.5, 0.5 );
        
        this.weapons.push( new Beam( this, game ) );
        this.weapons.push( new Pattern( this, game ) );
        this.weapons.push( new Rockets( this, game ) );
        this.weapons.push( new ScaleBullet( this, game ) );
        this.weapons.push( new SkullBullet( this, game ) );
        this.weapons.push( new SplitShot( this, game ) );
        
        var changeWeaponButton  = gamepad.getButton( Phaser.Gamepad.XBOX360_RIGHT_BUMPER );
        changeWeaponButton.onDown.add( this.nextWeapon, this );
    }
    
    nextWeapon() {
        //  Tidy-up the current weapon
        var bullets = this.weapons[this.currentWeapon].bullets;
        bullets.visible = false;
        bullets.callAll( 'reset', null, 0, 0 );
        bullets.setAll( 'exists', false );

        //  Activate the new one
        this.currentWeapon++;

        if (this.currentWeapon === this.weapons.length)
        {
            this.currentWeapon = 0;
        }

        bullets.visible = true;
    }
}
