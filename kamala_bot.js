const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  WebhookClient,
} = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const gifs = [
  "https://tenor.com/view/fpotus-kamala-kamala-harris-gif-558410502468458000",
];

// --- Commands ---
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "sexy") {
    await interaction.reply(gifs[Math.floor(Math.random() * gifs.length)]);
  }

  if (interaction.commandName === "webhook") {
    const webhookUrl = process.env.WEBHOOK_URL;
    const webhookClient = new WebhookClient({ url: webhookUrl });

    const embed = new EmbedBuilder()
      .setTitle("Kamala Harris")
      .setDescription("Kamala Harris is so freaking sexy")
      .setURL("https://www.kamalaharris.org")
      .setColor(0xff66aa)
      .setImage(
        "https://pbs.twimg.com/media/GXKJWe_XAAEUb3S?format=jpg&name=large"
      )
      .setFooter({ text: "Kamala Harris Fan Club" });

    try {
      await webhookClient.send({
        content: "kamala harris is sexy",
        username: "Kamala SIMPer",
        avatarURL: gifs[0],
        embeds: [embed],
      });
      await interaction.reply({
        content: "Webhook sent successfully!",
        ephemeral: true,
      });
    } catch (error) {
      console.error("Error sending webhook:", error);
      await interaction.reply({
        content: `Failed to send webhook: ${error.message}`,
        ephemeral: true,
      });
    }
  }
});

// --- Bot Events ---
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);
