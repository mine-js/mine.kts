// Object.defineProperty issue
const exports = {}
const Object = {
    defineProperty: (a, b, c) => {}
}

const minets = {
    registerEvent: (evt, func) => {
        _registerEvent(evt, func) // plugin implementation
    }
}

const _playerClazz = _getClass('org.bukkit.entity.Player')
const _objectClazz = _getClass('java.lang.Object')

const _joinEventClazz = _getClass('org.bukkit.event.player.PlayerJoinEvent')

function _makePlayer(instance) {
    let uuid = _playerClazz.getMethod('getUniqueId').call(instance).getInst()
    let uuidStr = _objectClazz.getMethod('toString').call(uuid).getString()
    return {
        name: _playerClazz.getMethod('getName').call(instance).getString(),
        uuid: uuidStr
    }
}

function _makeJoinEvent(instance) {
    const setJoinMessage = _joinEventClazz.getMethod('setJoinMessage')
    const getJoinMessage = _joinEventClazz.getMethod('getJoinMessage')
    const getPlayer = _joinEventClazz.getMethod('getPlayer')

    return {
        setBroadcastMessage: (message) => {
            setJoinMessage.call(message)
        },
        getBroadcastMessage: () => {
            return getJoinMessage.call().getString()
        },
        getPlayer: () => {
            return _makePlayer(getPlayer.call().getInst())
        }
    }
}

function require(mod) {
    if(mod !== '@minets/api') {
        console.log('Invalid require! the module\'s name only be "@minets/api"')
        return
    }

    return minets
}