import STATE_EVENTS from '../constants/state-events';

export class LoadingState extends Phaser.State {
    preload() {
        let loader = this.add.image(this.world.centerX, this.world.centerY, 'loader');
        loader.anchor.set(0.5, 0.5);
        this.load.setPreloadSprite(loader);

        this.load.audio( 'beam', ['assets/sounds/beam.mp3'] );
        this.load.audio( 'ledSpirals', ['assets/sounds/led-spirals.mp3'] );
        this.load.audio( 'pulseFire', ['assets/sounds/pulse-fire.mp3'] );
        this.load.audio( 'rocketFire', ['assets/sounds/rocket-fire.mp3'] );
        
        this.load.image( 'dude', 'assets/images/trooper.png' );
        this.load.image( 'earth', 'assets/images/scorched-earth.png' );
        this.load.image( 'skullBullet', 'assets/images/skull-bullet.png' );
        this.load.image( 'bullet4', 'assets/images/bullet4.png' );
        
        for (var i = 8; i <= 11; i++)
        {
            this.load.image('bullet' + i, 'assets/images/bullet' + i + '.png');
        }
    }

    create() {
        this.time.events.add(500, () => {
            this.game.trigger(STATE_EVENTS.LOADING_COMPLETED);
        });
    }

    update() {

    }

    render() {

    }
}
