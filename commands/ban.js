module.exports = {
    command: "ban",
    execute: async (bot, msg, args) => {
        if(!args[0]) return msg.channel.createMessage("Did not select a user to ban")
        let reason
        if(msg.mentions.length >= 1) {
            let id = msg.mentions[0].id
            args[1] ? reason = args.slice(1).join(" ") : reason = "No Reason Provided"
            banUser(id, reason)
        } else {
            try {
                let id = args[0]
                args[1] ? reason = args.slice(1).join(" ") : reason = "No Reason Provided"
                banUser(id, reason) 
            } catch(e) {
                msg.channel.createMessage("Could not find this user")
            }
        }
        function banUser(id, reason) {
            let target = msg.channel.guild.members.filter(m => m.id === id)[0] 
            if(!target) return msg.channel.createMessage("Could not find this user")
                try { 
                    target.getDMChannel().then(pm => {
                        pm.createMessage(`You have been banned from \`${msg.channel.guild.name}\` by \`${msg.author.username}#${msg.author.discriminator}\``).then(dm => {
                            msg.channel.guild.banMember(id, 7, `Mod: ${msg.author.username}#${msg.author.discriminator} | Reason: ${reason}`).then(m => {
                                msg.channel.createMessage(`Successfully banned <@${target.id}> with reason: \`${reason}\``)
                            }).catch(e => {
                                msg.channel.createMessage(`Error while trying to ban <@${target.id}> with reason: \`${reason}\``)
                            })
                        })
                    })
                } catch(e) {
                    msg.channel.guild.banMember(id, 7, `Mod: ${msg.author.username}#${msg.author.discriminator} | Reason: ${reason}`).then(m => {
                        msg.channel.createMessage(`Successfully banned <@${target.id}> with reason: \`${reason}\``)
                    }).catch(e => {
                        msg.channel.createMessage(`Error while trying to ban <@${target.id}> with reason: \`${reason}\``)
                    })
                }
            }
    }
}