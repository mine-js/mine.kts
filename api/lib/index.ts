/*
 * !!!! DON'T TRUST A INTERNAL IMPLEMENTATION IN THIS SCRIPT!
 * 
 * MOST FEATURES ARE IMPLEMENTED BY api_impl/impl.js
 * ...OTHERS ARE IMPLEMENTED BY THE PLUGIN(JAVA)
 */

export interface Events {
    join: [event: JoinQuitEvent],
    quit: [event: JoinQuitEvent]
}

export class JoinQuitEvent {
    /**
     * Set broadcast message. It implements setJoinMessage, setQuitMessage.
     * 
     * @param message message to set. it can be written on minimessage.
     */
    setBroadcastMessage(message: string) {}

    /** 
     * Get broadcast message. It implements getJoinMessage, getQuitMessage.
     * 
     * @return broadcast message. it returned as minimessage
    */
    getBroadcastMessage(): string { return '' }
    

    /**
     * Get target player.
     */
    getPlayer(): Player { return new Player() }
}

export class Player {

    /**
     * Player's name.
     */
    name: string = ''

    /**
     * Player's uuid. It implements getUniqueId().toString()
     */
    uuid: string = ''

}

export function registerEvent<K extends keyof Events>(eventName: K, run: (...args: Events[K]) => void, priority?: 'lowest' | 'low' | 'normal' | 'high' | 'highest' | 'monitor', ignoreCancelled?: boolean) {
}