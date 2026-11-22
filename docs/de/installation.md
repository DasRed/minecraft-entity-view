---
title: Installation
description: Minecraft-Server mit minecraft-api, squaremap und RCON vorbereiten und minecraft-entity-view mit Node.js oder Docker starten.
order: 10
section: Einstieg
---

## Voraussetzungen

- Minecraft-Server 1.21.8 mit NeoForge 21.8.33 oder neuer
- Node.js 26.12.1 oder neuer und npm 11.20 oder neuer – oder Docker

## Minecraft-Server vorbereiten

1. **minecraft-api installieren.** Die Mod liefert alle Daten, siehe
   [Installation von minecraft-api](https://www.marco-starker.de/de/projekte/minecraft-api/doku/installation). Sie
   lauscht standardmäßig auf Port `9874`.
2. **squaremap installieren** (optional, für den Kartenhintergrund). Lade die NeoForge-Fassung von
   [squaremap](https://github.com/jpenilla/squaremap) für 1.21.8 herunter, lege sie in `mods/` und lass die Karte
   einmal rendern. Ohne squaremap bleibt der Hintergrund leer, Entities und Chunks erscheinen trotzdem.
3. **RCON einschalten** (optional, für den Knopf zum Entfernen von Entities). In `server.properties`:

   ```properties
   enable-rcon=true
   rcon.port=25575
   rcon.password=ein-langes-passwort
   ```

## Mit Node.js starten

```bash
git clone https://github.com/DasRed/minecraft-entity-view.git
cd minecraft-entity-view
cp .env.example .env
npm ci
npm run build
npm start
```

Trag vor `npm run build` in `.env` die Adressen deines Servers ein, siehe [Konfiguration](configuration.md). Das
Frontend übernimmt seine Werte beim Bauen; nach einer Änderung an `.env` also neu bauen.

`npm start` startet alle drei Teile:

| Teil         | Port   |
|--------------|--------|
| Frontend     | `7790` |
| WebSocket    | `7791` |
| Kachel-Proxy | `7792` |

Danach ist die Karte unter `http://localhost:7790` erreichbar.

## Mit Docker starten

Das Image enthält das fertig gebaute Frontend. Baue es deshalb erst mit Node.js und dann das Image:

```bash
npm ci
npm run build
docker build -t minecraft-entity-view .
docker run -d --name minecraft-entity-view --env-file .env -p 7790:7790 -p 7791:7791 -p 7792:7792 minecraft-entity-view
```

## Anpassungen im Code

Zwei Werte stehen nicht in `.env`, sondern im Code:

- **Ziel des Kachel-Proxys:** die Adresse des squaremap-Webservers in
  [`apps/squaremapProxy/src/config.ts`](https://github.com/DasRed/minecraft-entity-view/blob/main/apps/squaremapProxy/src/config.ts)
- **Erlaubte Hostnamen des Frontends:** `preview.allowedHosts` in
  [`apps/frontend/vite.config.ts`](https://github.com/DasRed/minecraft-entity-view/blob/main/apps/frontend/vite.config.ts) –
  trag dort den Hostnamen ein, unter dem du die Karte aufrufst, wenn es nicht `localhost` ist

## Absicherung

> [!CAUTION]
> Die Anwendung hat keine Anmeldung. Wer Frontend und WebSocket erreicht, sieht alle Spielerpositionen und kann über
> RCON Entities entfernen. Betreibe sie nur im eigenen Netz oder hinter einem Reverse Proxy mit Zugangsschutz.
