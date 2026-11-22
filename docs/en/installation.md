---
title: Installation
description: Prepare the Minecraft server with minecraft-api, squaremap and RCON and start minecraft-entity-view with Node.js or Docker.
order: 10
section: Getting started
---

## Requirements

- Minecraft server 1.21.8 with NeoForge 21.8.33 or newer
- Node.js 26.12.1 or newer and npm 11.20 or newer – or Docker

## Prepare the Minecraft server

1. **Install minecraft-api.** The mod delivers all data, see
   [installation of minecraft-api](https://www.marco-starker.de/en/projects/minecraft-api/docs/installation). It
   listens on port `9874` by default.
2. **Install squaremap** (optional, for the map background). Download the NeoForge build of
   [squaremap](https://github.com/jpenilla/squaremap) for 1.21.8, put it into `mods/` and let it render the map once.
   Without squaremap the background stays empty; entities and chunks still show up.
3. **Turn on RCON** (optional, for the button that removes entities). In `server.properties`:

   ```properties
   enable-rcon=true
   rcon.port=25575
   rcon.password=a-long-password
   ```

## Start with Node.js

```bash
git clone https://github.com/DasRed/minecraft-entity-view.git
cd minecraft-entity-view
cp .env.example .env
npm ci
npm run build
npm start
```

Before `npm run build`, put the addresses of your server into `.env`, see [Configuration](configuration.md). The
frontend takes its values at build time, so rebuild after changing `.env`.

`npm start` starts all three parts:

| Part         | Port   |
|--------------|--------|
| Frontend     | `7790` |
| WebSocket    | `7791` |
| Tile proxy   | `7792` |

The map is then available at `http://localhost:7790`.

## Start with Docker

The image contains the built frontend. So build it with Node.js first and then the image:

```bash
npm ci
npm run build
docker build -t minecraft-entity-view .
docker run -d --name minecraft-entity-view --env-file .env -p 7790:7790 -p 7791:7791 -p 7792:7792 minecraft-entity-view
```

## Changes in the code

Two values are not in `.env` but in the code:

- **Target of the tile proxy:** the address of the squaremap web server in
  [`apps/squaremapProxy/src/config.ts`](https://github.com/DasRed/minecraft-entity-view/blob/main/apps/squaremapProxy/src/config.ts)
- **Allowed host names of the frontend:** `preview.allowedHosts` in
  [`apps/frontend/vite.config.ts`](https://github.com/DasRed/minecraft-entity-view/blob/main/apps/frontend/vite.config.ts) –
  add the host name you open the map with if it is not `localhost`

## Protection

> [!CAUTION]
> The application has no login. Anyone who reaches the frontend and the WebSocket sees all player positions and can
> remove entities via RCON. Run it only within your own network or behind a reverse proxy with access control.
