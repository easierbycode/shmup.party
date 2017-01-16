
import GAME from '../constants/game';
import PLAYER from '../constants/player';
import STATE_EVENTS from '../constants/state-events';
import { Player } from '../models/player';


export class ExampleState extends Phaser.State {
    
    bg                  = null;
    music               = null;
    pad1                = null;
    pad2                = null;
    
    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.bg                 = this.game.add.tileSprite( 0, 0, 2000, 2000, 'earth' );
        this.bg.fixedToCamera   = true;
        
        this.music = this.game.add.audio( 'ledSpirals' );
        this.music.play();
        
        this.game.input.gamepad.start();
        this.pad1 = this.game.input.gamepad.pad1;
        this.pad2 = this.game.input.gamepad.pad2;
        
        [ this.pad1, this.pad2 ].forEach(function( pad ) {
            pad.addCallbacks( pad, { onConnect: function() {
                this.game[ 'player' + (this.index + 1) ] = new Player(pad, this.game, (PLAYER.DEFAULT_X + (PLAYER.WIDTH * this.index)), PLAYER.DEFAULT_Y);
            } });
        });
        
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
        [ 1, 2 ].forEach(function( idx ) {

            var player  = this.game['player' + idx];
            var gamepad = this['pad' + idx];
            
            if ( player ) {
                player.body.velocity.x        = 0;
                player.body.velocity.y        = 0;
                
                if ( gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1 ) {
                    player.body.velocity.x    = -150;
                } else if ( gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 ) {
                    player.body.velocity.x    = 150;
                }
            
                if ( gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 ) {
                    player.body.velocity.y    = -150;
                } else if (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
                    player.body.velocity.y    = 150;
                }

                var rightStickX     = gamepad.axis( Phaser.Gamepad.XBOX360_STICK_RIGHT_X );
                var rightStickY     = gamepad.axis( Phaser.Gamepad.XBOX360_STICK_RIGHT_Y );
                rightStickX = ( Math.abs( rightStickX ) > gamepad.deadZone ) ? rightStickX : 0;
                rightStickY = ( Math.abs( rightStickY ) > gamepad.deadZone ) ? rightStickY : 0;
                var thumbstickAngle = this.coordinatesToRadians( rightStickX, rightStickY );
                
                if ( thumbstickAngle != null )  player.rotation  = thumbstickAngle;

                if ( gamepad.isDown( Phaser.Gamepad.XBOX360_RIGHT_TRIGGER ) ) {
                    player.weapons[player.currentWeapon].fire();
                }
            }
        }, this)
    }

    render() {
        // this.game.debug.body(this.game.player);
    }
}
