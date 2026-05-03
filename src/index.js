import "dotenv/config";

import { Client, Collection, Events, GatewayIntentBits } from "discord.js";

import * as pingCommand from "./commands/ping.js";
import * as forecastCommand from "./commands/forecast.js";
import * as astroCommand from "./commands/astro.js";

import { clientReadyHandler } from "./events/clientReady.js";

import { interactionCreateHandler } from "./events/interactionCreate.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(forecastCommand.data.name, forecastCommand);
client.commands.set(astroCommand.data.name, astroCommand);

client.once(Events.ClientReady, clientReadyHandler);

client.on(Events.InteractionCreate, interactionCreateHandler);

client.login(process.env.DISCORD_TOKEN);
