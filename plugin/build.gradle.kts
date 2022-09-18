import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

plugins {
    id("com.github.johnrengelman.shadow") version "7.1.2"
    kotlin("jvm") version "1.6.10"
}

group = "xyz.minets"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()

    maven { url = uri("https://repo.papermc.io/repository/maven-public/") }
}

val nativeV8Version = "4.6.0"
val j2v8Version = "6.2.1"

dependencies {

    compileOnly("io.papermc.paper:paper-api:1.19.2-R0.1-SNAPSHOT")

    implementation("com.eclipsesource.j2v8:j2v8:$j2v8Version")
    implementation("com.eclipsesource.j2v8:j2v8_win32_x86_64:$nativeV8Version")
    implementation("com.eclipsesource.j2v8:j2v8_linux_x86_64:$nativeV8Version")
    implementation("com.eclipsesource.j2v8:j2v8_macosx_x86_64:$nativeV8Version")

    implementation(kotlin("stdlib"))
}

tasks.shadowJar {
    archiveBaseName.set("minets")

    dependencies {
        include(dependency("com.eclipsesource.j2v8:j2v8:$j2v8Version"))
        include(dependency("com.eclipsesource.j2v8:j2v8_win32_x86_64:$nativeV8Version"))
        include(dependency("com.eclipsesource.j2v8:j2v8_linux_x86_64:$nativeV8Version"))
        include(dependency("com.eclipsesource.j2v8:j2v8_macosx_x86_64:$nativeV8Version"))
    }
}