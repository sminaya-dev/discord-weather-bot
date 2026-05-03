import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

import { fetchForecast } from "../requests/requestForecast.js";

const data = new SlashCommandBuilder()
  .setName("astro")
  .setDescription("Replies with the astronomical information for the day!")
  .addStringOption((option) => {
    return option
      .setName("location")
      .setDescription(
        "The location can be a city, zip/postal code, or a latitude and longitude.",
      )
      .setRequired(true);
  });

async function execute(interaction) {
  await interaction.deferReply();

  const location = interaction.options.getString("location");

  try {
    const { weatherData, locationName } = await fetchForecast(location);

    const embed = new EmbedBuilder()
      .setColor(0x3f704d)
      .setTitle(`Astronomical forecast for ${locationName}...`)
      .setTimestamp()
      .setFooter({
        text: "Powered by WeatherAPI",
      });

    for (const day of weatherData) {
      embed.addFields({
        name: day.date,
        value: `🌅 Sunrise: ${day.sunriseTime}\n🌇 Sunset: ${day.sunsetTime}\n🌕 Moonrise: ${day.moonriseTime}\n🌙 Moonset: ${day.moonsetTime}`,
      });
    }

    await interaction.editReply({
      embeds: [embed],
    });
  } catch (error) {
    await interaction.editReply(error);
  }
}

export { data, execute };
