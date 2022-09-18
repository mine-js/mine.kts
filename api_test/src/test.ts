import * as minets from '@minets/api'

minets.registerEvent('quit', (event) => {
    event.setBroadcastMessage('Hello, World!')
})