import STATE_EVENTS from '../constants/state-events';

export class BootstrapState extends Phaser.State {
    
    init() {
        this.stage.backgroundColor = '#6888FF'
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
    }
    
    preload() {
        this.load.image('loader', 'assets/images/loader.png');
    }

    create() {
        this.game.stage.backgroundColor = '#000000';

        this.game.trigger(STATE_EVENTS.BOOTSTRAP_COMPLETED);
    }

    update() {

    }

    render() {

    }
}
