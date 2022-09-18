package xyz.minets.plugin

import org.bukkit.plugin.java.JavaPlugin

lateinit var minets: MineTsPlugin

class MineTsPlugin: JavaPlugin() {

    override fun onEnable() {
        minets = this
    }

}