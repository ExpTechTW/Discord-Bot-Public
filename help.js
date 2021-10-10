const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "此機器人指令",
  usage: "[command]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd"],
   run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
            .setAuthor(
              `${client.user.username} 的命令`,
              client.botconfig.IconURL
            )
            .setColor("RANDOM")
            .setFooter(
              `查看某指令功能 ${
                GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
              }help [指令名]`
            ).setDescription(`${Commands.join("\n")}
  
  目前版本: v${require("../package.json").version}
`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(message.channel, `無此指令`);

      let embed = new MessageEmbed()
        .setAuthor(`Command: ${cmd.name}`, client.botconfig.IconURL)
        .setDescription(cmd.description)
        .setColor("RED")
        .addField("Aliases", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Usage",
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "Permissions",
          "Member: " +
            cmd.permissions.member.join(", ") +
            "\nBot: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Prefix - ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },
