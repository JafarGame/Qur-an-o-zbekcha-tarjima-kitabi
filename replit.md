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
- Requires the `BOT_TOKEN` secret (a Telegram bot token from @BotFather). This is already configured as a Replit secret.

## Notes
- `index.js` is a single large file containing a hardcoded `translations` object (all Quran verses in Uzbek) plus the bot logic. It was imported with several JSON-syntax typos (missing commas between verses/surahs, one stray malformed line, one corrupted surah delimiter) which were fixed to make the file parseable.
- The originally pinned `node-telegram-bot-api@^0.61.0` pulled in a transitive dependency (`form-data@2.3.3`) blocked by Replit's package security firewall (critical CVE). Installed `node-telegram-bot-api@latest` (v1.x) instead, which required updating the import to the new named-export API.

## User preferences
None recorded yet.
