
// generate common body part names
var commonParts             = Phaser.Animation.generateFrameNames( 'bodypart-common-', 1, 4, '', 4 );
// commonParts should contain 2 of each common part
commonParts.concat( commonParts );
var uniqueParts             = Phaser.Animation.generateFrameNames( 'bodypart-unique-', 1, 4, '', 4 );
var BODY_PARTS              = commonParts.concat( uniqueParts );


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

        // body part explosion
        let emitter = game.add.emitter( 0, 0, BODY_PARTS.length );
        emitter.makeParticles( 'zombieBodyParts', BODY_PARTS );
        this.emitter = emitter;
    }

    damage( bullet ) {

        let hitPoints   = bullet.data.bulletManager.hitPoints || 1;
        
        this.health -= hitPoints;

        if ( this.health <= 0 ) {
            this.alive      = false;
            this.body.moves = false;

            if ( bullet.data.bulletManager.BLOWS_SHIT_UP )
            {
                this.kill();

                // explode it's parts away with a random lifespan
                this.emitter.x  = this.body.x;
                this.emitter.y  = this.body.y;
                this.emitter.start( true, this.game.rnd.between( 500, 1250 ), null, BODY_PARTS.length );

            } else {
                this.animations.play( 'die', null, false, true );
            }

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