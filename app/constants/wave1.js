
// import { Alien } from '../models/alien';
import { Zombie } from '../models/zombie';


export default {

    ALIENS    : 11,
    ZOMBIES   : 22,

    createBaddies : function( game ) {
      // for ( i = 0; i < this.ALIENS; i++ ) {
      //   game.baddies.add( new Alien( game ) );
      // }

      for ( let i = 0; i < this.ZOMBIES; i++ ) {
        game.baddies.add( new Zombie( game ) );
      }
    }
}