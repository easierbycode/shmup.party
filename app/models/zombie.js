
export class Zombie extends Phaser.Sprite {

    alive   = true;
    health  = 8;
    speed   = 30;
    
    constructor( game, x = game.world.randomX, y = game.world.randomY, key = 'zombie' ) {
        super( game, x, y, key, 'move-0001' );

        game.add.existing( this );
        game.physics.arcade.enable( this );

        this.anchor.setTo( 0.5, 0.5 );

        //  animation
        this.animations.add( 'die', Phaser.Animation.generateFrameNames('die-', 1, 64, '', 4), 30, false, false );
        this.animations.add( 'walk', Phaser.Animation.generateFrameNames('move-', 1, 64, '', 4), 30, true, false );
        this.animations.play( 'walk' );
    }

    damage( hitPoints ) {
        
        this.health -= hitPoints;

        if ( this.health <= 0 ) {
            this.alive      = false;
            this.body.moves = false;

            this.animations.play( 'die', null, false, true );

            return true;
        }

        return false;
    }

    update() {
        //  don't update if dead (i.e. while 'die' animation is playing)
        if ( ! this.alive )  return;
        
        let closestPlayer         = this.game.players.getClosestTo( this );

        if ( ! closestPlayer )  return;

        //  rotation
        this.rotation             = this.game.physics.arcade.angleBetween( this, closestPlayer );
        //  collision detection
        let zombieTouchingPlayer  = this.game.physics.arcade.collide( this.game.players, this, this.game.baddieHitPlayer );

        if ( ! zombieTouchingPlayer )  this.game.physics.arcade.moveToObject( this, closestPlayer, this.speed );
    }
}