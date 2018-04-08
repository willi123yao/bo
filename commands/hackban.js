module.exports = {
    command: "hackban",
    execute: async (bot, msg, args) => {
        if(!args[0]) return msg.channel.createMessage("You need to choose somebody to hackban.")
        try {
            let id = args[0]
            let reason
            args[1] ? reason = args.slice(1).join(" ") : reason = "No Reason Provided"
            banUser(id, reason)
        } catch(e) {
            msg.channel.createMessage("Could not find this user")
        }
        function banUser(id, reason) {
            msg.channel.guild.banMember(id, 7, `Mod: ${msg.author.username}#${msg.author.discriminator} | Reason: ${reason}`).then(m => {
                msg.channel.createMessage(`Successfully banned <@${id}> with reason: \`${reason}\``)
            }).catch(e => {
                msg.channel.createMessage(`An error happened while trying to hackban <@${id}> with reason: \`${reason}\``)
            })
        }
    }
}