export interface Events {
    join: [event: JoinQuitEvent];
    quit: [event: JoinQuitEvent];
}
export declare class JoinQuitEvent {
    /**
     * Set broadcast message. It implements setJoinMessage, setQuitMessage.
     *
     * @param message message to set. it can be written on minimessage.
     */
    setBroadcastMessage(message: string): void;
    /**
     * Get broadcast message. It implements getJoinMessage, getQuitMessage.
     *
     * @return broadcast message. it returned as minimessage
    */
    getBroadcastMessage(): string;
    /**
     * Get target player.
     */
    getPlayer(): Player;
}
export declare class Player {
    /**
     * Player's name.
     */
    name: string;
    /**
     * Player's uuid. It implements getUniqueId().toString()
     */
    uuid: string;
}
export declare function registerEvent<K extends keyof Events>(eventName: K, run: (...args: Events[K]) => void, priority?: 'lowest' | 'low' | 'normal' | 'high' | 'highest' | 'monitor', ignoreCancelled?: boolean): void;
