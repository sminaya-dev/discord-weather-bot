# discord-weather-bot

*A Discord slash command bot for weather forecasts and astronomical data*

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=nodedotjs) ![Discord.js](https://img.shields.io/badge/Discord.js-v14-5865F2?logo=discord) ![WeatherAPI](https://img.shields.io/badge/API-WeatherAPI-blue)

---

## About

A Discord bot that surfaces weather and astronomical data directly in your server via slash commands. Built with Discord.js v14 and the WeatherAPI, it supports any location by city name, zip/postal code, or latitude and longitude.

---

## Commands

| Command | Description |
|---|---|
| `/forecast [location] [units]` | 3-day weather forecast with daily high/low temperatures. Units default to imperial but can be switched to metric. |
| `/astro [location]` | Sunrise, sunset, moonrise, and moonset times for the next 3 days. |
| `/ping` | Confirms the bot is online and responding. |

---

## Project Structure

```
discord-weather-bot/
├── src/
│   ├── index.js                  # Entry point — client setup, command/event registration
│   ├── commands/
│   │   ├── forecast.js           # /forecast slash command
│   │   ├── astro.js              # /astro slash command
│   │   └── ping.js               # /ping slash command
│   ├── events/
│   │   ├── clientReady.js        # Registers slash commands on bot startup
│   │   └── interactionCreate.js  # Routes interactions to the correct command handler
│   └── requests/
│       └── requestForecast.js    # WeatherAPI integration and response mapping
├── .env                          # Environment variables (not committed)
├── .env.example                  # Template showing required variables
├── package.json
└── .gitignore
```

---

## Setup

**1. Clone the repo and install dependencies:**
```
npm install
```

**2. Create a `.env` file based on `.env.example`:**
```
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_application_id
GUILD_ID=your_server_id
WEATHER_API_KEY=your_weatherapi_key
```

**3. Register your bot with Discord:**
- Create an application at the [Discord Developer Portal](https://discord.com/developers/applications)
- Add a bot, copy the token into `DISCORD_TOKEN`
- Copy the Application ID into `CLIENT_ID`
- Copy your server's ID into `GUILD_ID`

**4. Get a WeatherAPI key:**
- Sign up at [weatherapi.com](https://www.weatherapi.com/) (free tier available)
- Copy the key into `WEATHER_API_KEY`

**5. Start the bot:**
```
npm start
```

Slash commands are registered automatically on startup via the `clientReady` event.

---

## Technical Highlights

**Event-driven architecture**

The bot uses Discord.js's event system rather than polling. Two event handlers are registered on the client — `clientReady` fires once on startup to register slash commands via the REST API, and `interactionCreate` fires on every user interaction to route it to the correct command handler. This keeps the bot responsive without any continuous loops or timers.

**Programmatic slash command registration**

Commands are registered on startup using Discord's REST API via `Routes.applicationGuildCommands()`. Adding a new command is as simple as creating a new file in `commands/` and importing it in `index.js` — no manual configuration in the Discord Developer Portal required.

**Deferred replies for async operations**

Both weather commands call `interaction.deferReply()` immediately before making the API request. This sends Discord an acknowledgment within the required 3-second response window, preventing an "application did not respond" timeout while the external API call completes. The actual response is then sent via `interaction.editReply()` once the data is ready.

**Ephemeral error handling**

The `interactionCreate` handler checks whether an interaction has already been replied to or deferred before sending an error message, using `followUp()` or `reply()` accordingly. All errors are sent as ephemeral messages, visible only to the user who triggered the command, to avoid cluttering the channel.

---

## Environment Variables

| Variable | Description |
|---|---|
| `DISCORD_TOKEN` | Your bot's token from the Discord Developer Portal |
| `CLIENT_ID` | Your application's ID from the Discord Developer Portal |
| `GUILD_ID` | The ID of the Discord server to register commands in |
| `WEATHER_API_KEY` | Your API key from weatherapi.com |

---

## License

[MIT](LICENSE)