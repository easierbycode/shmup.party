import SuperEventEmitter from 'super-event-emitter';

export class Game extends Phaser.Game {
    player = null;

    constructor(...args) {
        super(...args);
        SuperEventEmitter.mixin(this);

        this.baddieHitPlayer   = function( baddie, player ) {
            // player.damage( baddie );
        }
        
        this.bulletHitBaddie   = function( baddie, bullet ) {
            bullet.kill();
            
            let destroyed   = baddie.damage( bullet );
        }
    }
}
