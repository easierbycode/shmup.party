
import GAME from '../constants/game';
import PLAYER from '../constants/player';
import STATE_EVENTS from '../constants/state-events';
import WAVE1 from '../constants/wave1';
import { Player } from '../models/player';
import { Zombie } from '../models/zombie';


export class ExampleState extends Phaser.State {
    
    bg                  = null;
    music               = null;
    gamepad1                = null;
    gamepad2                = null;
    
    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.bg                 = this.game.add.tileSprite( 0, 0, 2000, 2000, 'earth' );
        this.bg.fixedToCamera   = true;

        //  explosion pool
        this.game.explosions     = new Phaser.Group( this.game );

        for ( let i = 0; i < 64; i++ )  {
            var explosionAnimation = this.game.explosions.create( 0, 0, 'kaboom', [0], false );
            explosionAnimation.anchor.setTo( 0.5, 0.5 );
            explosionAnimation.animations.add( 'kaboom' );
        }

        this.game.baddies       = new Phaser.Group( this.game );
        this.game.players       = new Phaser.Group( this.game );
        
        this.music = this.game.add.audio( 'ledSpirals' );
        this.music.play();
        
        this.game.input.gamepad.start();
        this.gamepad1 = this.game.input.gamepad.pad1;
        this.gamepad2 = this.game.input.gamepad.pad2;
        
        [ this.gamepad1, this.gamepad2 ].forEach(( gamepad ) => {
            gamepad.addCallbacks( gamepad, { onConnect: () => {
                let newPlayer   = new Player( gamepad, this.game, (PLAYER.DEFAULT_X + (PLAYER.WIDTH * this.index)), PLAYER.DEFAULT_Y );
                this.game.players.add( newPlayer );
            } });
        });

        WAVE1.createBaddies( this.game );
        
        this.game.trigger(STATE_EVENTS.EXAMPLE_COMPLETED);
    }

    coordinatesToRadians(x, y) {
        if (x === 0 && y === 0) {
            return null;
        }

        let radians = Math.atan2(y, x);
        if (radians < 0) {
            radians += 2 * Math.PI;
        }
        return Math.abs(radians);
    }
    
    update() {
        let bullets = [];
        
        this.game.players.forEachAlive(( player ) => {
            bullets.push( player.bullets );

            let gamepad = player.gamepad;

            player.body.velocity.x        = 0;
            player.body.velocity.y        = 0;
            
            if ( gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1 ) {
                player.body.velocity.x    = -150;
            } else if ( gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 ) {
                player.body.velocity.x    = 150;
            }
        
            if ( gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 ) {
                player.body.velocity.y    = -150;
            } else if ( gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 ) {
                player.body.velocity.y    = 150;
            }

            let rightStickX     = gamepad.axis( Phaser.Gamepad.XBOX360_STICK_RIGHT_X );
            let rightStickY     = gamepad.axis( Phaser.Gamepad.XBOX360_STICK_RIGHT_Y );
            rightStickX         = ( Math.abs( rightStickX ) > gamepad.deadZone ) ? rightStickX : 0;
            rightStickY         = ( Math.abs( rightStickY ) > gamepad.deadZone ) ? rightStickY : 0;
            let thumbstickAngle = this.coordinatesToRadians( rightStickX, rightStickY );

            if ( thumbstickAngle != null ) {
                player.rotation  = thumbstickAngle;

                player.weapons[ player.currentWeapon ].fire();
            }
        });

        this.game.baddies.forEachAlive(( baddie ) => {
            this.game.physics.arcade.overlap( baddie, bullets, this.game.bulletHitBaddie );
        });
    }

    render() {
        // this.game.debug.body(this.game.player);
    }
}