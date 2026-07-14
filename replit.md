# Quran Bot (Telegram)

## Overview
A Telegram bot that sends Quran translations in Uzbek. It uses long-polling
(no web server / no HTTP port), built with `node-telegram-bot-api` and `axios`.

## Stack
- Node.js 20
- `node-telegram-bot-api` (v1.x, ESM/CJS named export: `const { TelegramBot } = require(...)`)
- `axios`

## Running the project
- Workflow: **Quran Bot** runs `node index.js` (console output, no port — it's a polling bot, not a web server).
- Workflow: **Quran Web** runs `node web-server.js` (Express web server, port 5000) — a separate Quran reading website, completely independent of the bot.
- Requires the `BOT_TOKEN` secret (a Telegram bot token from @BotFather). This is already configured as a Replit secret.

## Notes
- All Quran verse translations (Uzbek) live in `quran-translations.json` (114 surahs, keyed by surah number then verse number). `index.js` loads it via `require("./quran-translations.json")`. It was originally a hardcoded object inline in `index.js`; it was imported with several JSON-syntax typos (missing commas between verses/surahs, one stray malformed line, one corrupted surah delimiter) which were fixed to make the file parseable before extracting it.
- The originally pinned `node-telegram-bot-api@^0.61.0` pulled in a transitive dependency (`form-data@2.3.3`) blocked by Replit's package security firewall (critical CVE). Installed `node-telegram-bot-api@latest` (v1.x) instead, which required updating the import to the new named-export API.
- `quran.json` merges Arabic Uthmani text + Uzbek translation per ayah (114 surahs, 6236 ayahs) and is the sole data source for the Quran reading website (`web-server.js` + `public/`). The bot (`index.js`) is untouched and keeps using `quran-translations.json` plus the live AlQuran Cloud API — the two surfaces do not share code or data-loading paths.

## User preferences
None recorded yet.
