import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

async function execute(interaction) {
  await interaction.reply("Pong!");

  // Run this to test ephemeral error functionality
  // throw new Error("Made up error");
}

export { data, execute };
