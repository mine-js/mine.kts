"use strict";
/*
 * !!!! DON'T TRUST A INTERNAL IMPLEMENTATION IN THIS SCRIPT!
 *
 * MOST FEATURES ARE IMPLEMENTED BY api_impl/impl.js
 * ...OTHERS ARE IMPLEMENTED BY THE PLUGIN(JAVA)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEvent = exports.Player = exports.JoinQuitEvent = void 0;
var JoinQuitEvent = /** @class */ (function () {
    function JoinQuitEvent() {
    }
    /**
     * Set broadcast message. It implements setJoinMessage, setQuitMessage.
     *
     * @param message message to set. it can be written on minimessage.
     */
    JoinQuitEvent.prototype.setBroadcastMessage = function (message) { };
    /**
     * Get broadcast message. It implements getJoinMessage, getQuitMessage.
     *
     * @return broadcast message. it returned as minimessage
    */
    JoinQuitEvent.prototype.getBroadcastMessage = function () { return ''; };
    /**
     * Get target player.
     */
    JoinQuitEvent.prototype.getPlayer = function () { return new Player(); };
    return JoinQuitEvent;
}());
exports.JoinQuitEvent = JoinQuitEvent;
var Player = /** @class */ (function () {
    function Player() {
        /**
         * Player's name.
         */
        this.name = '';
        /**
         * Player's uuid. It implements getUniqueId().toString()
         */
        this.uuid = '';
    }
    return Player;
}());
exports.Player = Player;
function registerEvent(eventName, run, priority, ignoreCancelled) {
}
exports.registerEvent = registerEvent;
