---
title: Konfiguration
description: Alle Umgebungsvariablen von minecraft-entity-view – Adressen, RCON, Abfrageintervalle, Statistik und Karte.
order: 20
slug: konfiguration
section: Einrichtung
---

Alle Teile lesen ihre Einstellungen aus der Datei `.env` im Wurzelverzeichnis des Repos oder aus Umgebungsvariablen.
Eine Vorlage liegt in
[`.env.example`](https://github.com/DasRed/minecraft-entity-view/blob/main/.env.example). Zeiten sind in Millisekunden
angegeben.

> [!NOTE]
> Die Werte für das Frontend (WebSocket-Adresse, Kachel-Server, Karte, Hervorhebung) werden beim `npm run build` fest
> eingebaut. Nach einer Änderung das Frontend neu bauen.

## Adressen

| Name                        | Standard | Beschreibung                                                                                   |
|-----------------------------|----------|------------------------------------------------------------------------------------------------|
| `MINECRAFT_SERVER`          | –        | **Pflicht.** Adresse der minecraft-api, z. B. `http://mc.example.org:9874`                      |
| `WEBSOCKET_CLIENT`          | –        | **Pflicht.** Adresse des WebSockets, wie der Browser sie erreicht, z. B. `ws://mc.example.org:7791` |
| `WEBSOCKET_SERVER_PORT`     | `7791`   | Port, auf dem das Backend den WebSocket öffnet                                                  |
| `WEBSOCKET_SERVER_PROTOCOL` | `ws`     | wird derzeit nicht ausgewertet                                                                  |
| `WEBSOCKET_SERVER_HOST`     | `localhost` | wird derzeit nicht ausgewertet                                                               |
| `TILE_LAYER_SERVER`         | –        | **Pflicht für den Kartenhintergrund.** Adresse des Kachel-Proxys, z. B. `http://mc.example.org:7792` |

## RCON

| Name            | Standard | Beschreibung                                         |
|-----------------|----------|------------------------------------------------------|
| `RCON_HOST`     | –        | Host des Minecraft-Servers für RCON                  |
| `RCON_PORT`     | `25575`  | RCON-Port aus `server.properties`                    |
| `RCON_PASSWORD` | –        | RCON-Passwort aus `server.properties`                |

Ohne RCON läuft alles außer dem Entfernen von Entities.

## Abfrage und Statistik

| Name                                                     | Standard | Beschreibung                                                                         |
|----------------------------------------------------------|----------|--------------------------------------------------------------------------------------|
| `UPDATER_ENTITIES_STATISTIC_INTERVAL`                    | `50`     | Abstand zwischen zwei Abfragen der Entities                                           |
| `UPDATER_PLAYERS_INTERVAL`                               | `50`     | Abstand zwischen zwei Abfragen der Spieler                                            |
| `UPDATER_CHUNKS_ACTIVE_INTERVAL`                         | `50`     | Abstand zwischen zwei Abfragen der geladenen Chunks                                   |
| `UPDATER_ENTITIES_STATISTIC_DELETE_ENTITY_AFTER`         | `2000`   | so lange bleibt eine verschwundene Entity als „gelöscht“ sichtbar                     |
| `UPDATER_ENTITIES_STATISTIC_IS_NEW_ENTITY_FOR`           | `800`    | so lange gilt eine Entity nach ihrem Auftauchen als neu                               |
| `UPDATER_ENTITIES_STATISTIC_IS_ENTITY_REORDERED_FOR`     | `300`    | wird derzeit nicht ausgewertet                                                         |
| `UPDATER_ENTITIES_STATISTIC_HISTORY_DELTA_BETWEEN_POINTS`| `500`    | Mindestabstand zwischen zwei Punkten im Diagramm                                      |
| `UPDATER_ENTITIES_STATISTIC_PRESERVE_HISTORY_DATA_LENGTH`| `4000`   | so viele Punkte behält das Diagramm; bei 500 ms Abstand rund 33 Minuten               |

Kürzere Intervalle machen die Karte flüssiger, kosten aber den Minecraft-Server bei jeder Abfrage Rechenzeit. Bei
vielen Entities lohnen sich Werte von 250 ms oder mehr.

## Karte

| Name                             | Standard   | Beschreibung                                                                 |
|----------------------------------|------------|------------------------------------------------------------------------------|
| `MAP_ZOOM_CURRENT`               | `3`        | Zoomstufe beim Öffnen                                                         |
| `MAP_ZOOM_MIN`                   | `0`        | kleinste Zoomstufe                                                            |
| `MAP_ZOOM_MAX`                   | `8`        | größte Zoomstufe                                                              |
| `MAP_ZOOM_NATIVE_MIN`            | `0`        | kleinste Zoomstufe, für die squaremap Kacheln liefert                         |
| `MAP_ZOOM_NATIVE_MAX`            | `3`        | größte Zoomstufe, für die squaremap Kacheln liefert; darüber wird vergrößert  |
| `ENTITY_HIGHLIGHT_IF_OLDER_THAN` | `43200000` | Entities, die länger als diese Zeit existieren, werden hervorgehoben (12 Stunden) |
