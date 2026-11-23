---
title: Configuration
description: All environment variables of minecraft-entity-view with defaults, for the address of minecraft-api, RCON, polling intervals, statistics and the map.
order: 20
slug: configuration
section: Setup
---

All parts read their settings from the file `.env` in the root of the repo or from environment variables. A template
is in [`.env.example`](https://github.com/DasRed/minecraft-entity-view/blob/main/.env.example). Times are given in
milliseconds.

> [!NOTE]
> The values for the frontend (WebSocket address, tile server, map, highlighting) are built in during
> `npm run build`. Rebuild the frontend after changing them.

## Addresses

| Name                        | Default | Description                                                                                   |
|-----------------------------|---------|-----------------------------------------------------------------------------------------------|
| `MINECRAFT_SERVER`          | –       | **Required.** Address of minecraft-api, e.g. `http://mc.example.org:9874`                      |
| `WEBSOCKET_CLIENT`          | –       | **Required.** Address of the WebSocket as the browser reaches it, e.g. `ws://mc.example.org:7791` |
| `WEBSOCKET_SERVER_PORT`     | `7791`  | port the backend opens the WebSocket on                                                        |
| `WEBSOCKET_SERVER_PROTOCOL` | `ws`    | currently not used                                                                             |
| `WEBSOCKET_SERVER_HOST`     | `localhost` | currently not used                                                                         |
| `TILE_LAYER_SERVER`         | –       | **Required for the map background.** Address of the tile proxy, e.g. `http://mc.example.org:7792` |

## RCON

| Name            | Default | Description                                          |
|-----------------|---------|------------------------------------------------------|
| `RCON_HOST`     | –       | host of the Minecraft server for RCON                |
| `RCON_PORT`     | `25575` | RCON port from `server.properties`                   |
| `RCON_PASSWORD` | –       | RCON password from `server.properties`               |

Without RCON everything works except removing entities.

## Polling and statistics

| Name                                                     | Default | Description                                                                          |
|----------------------------------------------------------|---------|--------------------------------------------------------------------------------------|
| `UPDATER_ENTITIES_STATISTIC_INTERVAL`                    | `50`    | time between two requests for the entities                                           |
| `UPDATER_PLAYERS_INTERVAL`                               | `50`    | time between two requests for the players                                            |
| `UPDATER_CHUNKS_ACTIVE_INTERVAL`                         | `50`    | time between two requests for the loaded chunks                                      |
| `UPDATER_ENTITIES_STATISTIC_DELETE_ENTITY_AFTER`         | `2000`  | how long a vanished entity stays visible as "deleted"                                |
| `UPDATER_ENTITIES_STATISTIC_IS_NEW_ENTITY_FOR`           | `800`   | how long an entity counts as new after it appeared                                   |
| `UPDATER_ENTITIES_STATISTIC_IS_ENTITY_REORDERED_FOR`     | `300`   | currently not used                                                                   |
| `UPDATER_ENTITIES_STATISTIC_HISTORY_DELTA_BETWEEN_POINTS`| `500`   | minimum time between two points in the chart                                         |
| `UPDATER_ENTITIES_STATISTIC_PRESERVE_HISTORY_DATA_LENGTH`| `4000`  | number of points the chart keeps; at 500 ms that is about 33 minutes                 |

Shorter intervals make the map smoother but cost the Minecraft server processing time on every request. With many
entities, values of 250 ms or more are worth it.

## Map

| Name                             | Default    | Description                                                                  |
|----------------------------------|------------|------------------------------------------------------------------------------|
| `MAP_ZOOM_CURRENT`               | `3`        | zoom level when opening                                                       |
| `MAP_ZOOM_MIN`                   | `0`        | smallest zoom level                                                           |
| `MAP_ZOOM_MAX`                   | `8`        | largest zoom level                                                            |
| `MAP_ZOOM_NATIVE_MIN`            | `0`        | smallest zoom level squaremap delivers tiles for                              |
| `MAP_ZOOM_NATIVE_MAX`            | `3`        | largest zoom level squaremap delivers tiles for; above it tiles are scaled up |
| `ENTITY_HIGHLIGHT_IF_OLDER_THAN` | `43200000` | entities that exist longer than this are highlighted (12 hours)               |
