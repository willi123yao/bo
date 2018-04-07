module.exports = {
    command: "kick",
    execute: async (bot, msg, args) => {
        if(!args[0]) return msg.channel.createMessage("Did not select a user to kick")
        let reason
        if(msg.mentions.length >= 1) {
            let id = msg.mentions[0].id
            args[1] ? reason = args.slice(1).join(" ") : reason = "No Reason Provided"
            kickUser(id, reason)
        } else {
            try {
                let id = args[0]
                args[1] ? reason = args.slice(1).join(" ") : reason = "No Reason Provided"
                kickUser(id, reason) 
            } catch(e) {
                msg.channel.createMessage("Could not find this user")
            }
        }
        function kickUser(id, reason) {
            let target = msg.channel.guild.members.filter(m => m.id === id)[0]
            if(!target) return msg.channel.createMessage("Could not find this user")
                try{
                    target.getDMChannel().then(pm => {
                        pm.createMessage(`You have been kicked from \`${msg.channel.guild.name}\` by \`${msg.author.username}#${msg.author.discriminator}\``).then(dm => {
                            msg.channel.guild.kickMember(id, `Mod: ${msg.author.username}#${msg.author.discriminator} | Reason: ${reason}`).then(m => {
                                msg.channel.createMessage(`Successfully kicked <@${target.id}> with reason: \`${reason}\``)
                            }).catch(e => {
                                msg.channel.createMessage(`Error\n${e}`)
                            })
                        })
                    })
                } catch(e) {
                    msg.channel.guild.kickMember(id, `Mod: ${msg.author.username}#${msg.author.discriminator} | Reason: ${reason}`).then(m => {
                        msg.channel.createMessage(`Successfully kicked <@${target.id}> with reason: \`${reason}\``)
                    }).catch(e => {
                        msg.channel.createMessage(`Error\n${e}`)
                    })
                }
        }
    }
}