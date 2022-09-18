package xyz.minets.plugin

import org.bukkit.Bukkit
import org.bukkit.event.*
import org.bukkit.plugin.EventExecutor
import org.bukkit.plugin.IllegalPluginAccessException
import org.bukkit.plugin.RegisteredListener
import org.bukkit.plugin.TimedRegisteredListener
import org.bukkit.plugin.java.JavaPlugin
import java.lang.reflect.InvocationTargetException

internal fun callEvent(event : Event) {
    Bukkit.getServer().pluginManager.callEvent(event)
}

internal fun <T : Event> listener(
    clazz : Class<T>,
    listener: T.() -> Unit
) : Listener {
    return listener(clazz, EventPriority.NORMAL, false, listener)
}

internal fun <T : Event> listener(
    clazz : Class<T>,
    priority : EventPriority = EventPriority.NORMAL,
    ignoreCancelled : Boolean = false,
    listener: T.() -> Unit,
    plugin: JavaPlugin = minets
) : Listener {
    val listenerData = object : Listener {
        @EventHandler
        fun on(event : T) {
            listener(event)
        }
    }
    val executor = EventExecutor { l, event ->
        runCatching {
            if (!clazz.isAssignableFrom(event.javaClass)) {
                return@EventExecutor
            }
            listenerData.javaClass.declaredMethods[0].invoke(l, event)
        }.exceptionOrNull()?.let {
            if (it is InvocationTargetException) throw EventException(it.cause)
            throw EventException(it)
        }
    }
    if (Bukkit.getServer().pluginManager.useTimings()) {
        clazz.handlerList.register(
            TimedRegisteredListener(
                listenerData,
                executor,
                priority,
                plugin,
                ignoreCancelled
            )
        )
    } else {
        clazz.handlerList.register(
            RegisteredListener(listenerData, executor, priority, plugin, ignoreCancelled)
        )
    }
    return listenerData
}

private val Class<out Event>.handlerList : HandlerList
    get() {
        val throwException = fun (): Nothing = throw IllegalPluginAccessException(
            "Unable to find handler list for event ${name}. Static getHandlerList method required!"
        )

        val exceptionableHandlerList = fun Class<out Event>.() : HandlerList {
            val method = getDeclaredMethod("getHandlerList").apply { isAccessible = true }
            return method.invoke(null) as HandlerList
        }
        var nowClass : Class<out Event> = this
        kotlin.runCatching { return nowClass.exceptionableHandlerList() }
        while (true) {
            kotlin.runCatching { return nowClass.exceptionableHandlerList() }
            nowClass.superclass ?: throwException()
            if (nowClass.superclass == Event::class.java) throwException()
            nowClass = nowClass.superclass as Class<out Event>
        }
    }

internal fun <T : Event> JavaPlugin.listener(clazz : Class<T>, listener : T.() -> Unit) {
    listener(clazz, listener)
}