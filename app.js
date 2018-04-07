const Eris = require("eris")
const c = require("./config.json")
const bot = new Eris(c.token, { getAllUsers: true })
const prefix = "dbl!"

bot.on("ready", () => {
    console.log("DBL Moderation Bot Online")
    bot.editStatus("invisible")
})

bot.on("guildMemberUpdate", (guild, member, oldMember) => {
    if(member.nick) {
        if(member.nick.toLowerCase().codePointAt(0) < "a".codePointAt(0)) {
            member.edit({ nick: "No Hoisting" })
        }
    } else if(member.username.toLowerCase().codePointAt(0) < "a".codePointAt(0) && !member.nick) {
        member.edit({ nick: "No Hoisting" })
    }
})

bot.on("guildMemberAdd", (guild, member) => {
    if(member.nick) {
        if(member.nick.toLowerCase().codePointAt(0) < "a".codePointAt(0)) {
            member.edit({ nick: "No Hoisting" })
        }
    } else if(member.username.toLowerCase().codePointAt(0) < "a".codePointAt(0) && !member.nick) {
        member.edit({ nick: "No Hoisting" })
    }
})

bot.on("messageCreate", async msg => {
    if(msg.author.bot) return
    let moderator = msg.channel.permissionsOf(msg.author.id).has("banMembers") && msg.channel.permissionsOf(bot.user.id).has("banMembers")
    if(!moderator) return
    if(msg.channel.guild.id !== "264445053596991498") return
    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toString().toLowerCase()
    if(msg.content.indexOf(prefix) !== 0) return

    if(command === "invis") {
        bot.editStatus("invisible")
    }

    if(command === "ban") {
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

    if(command === "kick") {
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

    if(command === "mute") {
        if(!args[0]) return msg.channel.createMessage("You did not give any user to mute")
        let target
        if(msg.mentions.length >= 1) {
            target = msg.mentions[0].id
            mute(target)
        } else if(msg.content.match(/[0-9]{16,18}/)) {
            target = msg.content.match(/[0-9]{16,18}/)[0]
            mute(target)
        }
        function mute(id) {
            let muteRole = "300375880088158208"
            if(msg.channel.guild.members.get(id).roles.includes(muteRole)) return msg.channel.createMessage("This user is already muted")
            msg.channel.guild.addMemberRole(target, muteRole).then(() => {
                msg.channel.createMessage(`Successfully muted <@${id}>`)
            }).catch(e => {
                msg.channel.createMessage("Could not mute this person")
            })
        }
    } 

    if(command === "shitpostmute") {
        if(!args[0]) return msg.channel.createMessage("You did not give any user to shitpost mute")
        let target
        if(msg.mentions.length >= 1) {
            target = msg.mentions[0].id
            mute(target)
        } else if(msg.content.match(/[0-9]{16,18}/)) {
            target = msg.content.match(/[0-9]{16,18}/)[0]
            mute(target)
        }
        function mute(id) {
            let muteRole = "324625084700688385"
            if(msg.channel.guild.members.get(id).roles.includes(muteRole)) return msg.channel.createMessage("This user is already shitpost muted")
            msg.channel.guild.addMemberRole(target, muteRole).then(() => {
                msg.channel.createMessage(`Successfully shitpost muted <@${id}>`)
            }).catch(e => {
                msg.channel.createMessage("Could not shitpost mute this person")
            })
        }
    } 

    if(command === "unmute") {
        if(!args[0]) return msg.channel.createMessage("You did not give any user to unmute")
        let target
        if(msg.mentions.length >= 1) {
            target = msg.mentions[0].id
            mute(target)
        } else if(msg.content.match(/[0-9]{16,18}/)) {
            target = msg.content.match(/[0-9]{16,18}/)[0]
            mute(target)
        }
        function mute(id) {
            let muteRole = "300375880088158208"
            if(!msg.channel.guild.members.get(id).roles.includes(muteRole)) return msg.channel.createMessage("This user is not muted")
            msg.channel.guild.removeMemberRole(target, muteRole).then(() => {
                msg.channel.createMessage(`Successfully unmuted <@${id}>`)
            }).catch(e => {
                msg.channel.createMessage("Could not unmute this person")
            })
        }
    } 

    if(command === "unshitpostmute") {
        if(!args[0]) return msg.channel.createMessage("You did not give any user to shitpost unmute")
        let target
        if(msg.mentions.length >= 1) {
            target = msg.mentions[0].id
            mute(target)
        } else if(msg.content.match(/[0-9]{16,18}/)) {
            target = msg.content.match(/[0-9]{16,18}/)[0]
            mute(target)
        }
        function mute(id) {
            let muteRole = "324625084700688385"
            if(!msg.channel.guild.members.get(id).roles.includes(muteRole)) return msg.channel.createMessage("This user is not shitpost muted")
            msg.channel.guild.removeMemberRole(target, muteRole).then(() => {
                msg.channel.createMessage(`Successfully shitpost unmuted <@${id}>`)
            }).catch(e => {
                msg.channel.createMessage("Could not shitpost unmute this person")
            })
        }
    } 

    if(command === "dehoist") {
        let hoisters = []
        msg.channel.guild.members.map(m => {
            if(m.nick) {
                if(m.username.toLowerCase().codePointAt(0) < "a".codePointAt(0)) {
                    hoisters.push(m)
                }
            } else if(m.username.toLowerCase().codePointAt(0) < "a".codePointAt(0) && !m.nick) {
                hoisters.push(m)
            }
        })
        let interval = 1100
        let promise = Promise.resolve()
        msg.channel.createMessage("Now dehoisting")
        hoisters.forEach(m => {
            promise = promise.then(() => {
                m.edit({ nick: "No Hoisting" })
                return new Promise(resolve => {
                    setTimeout(resolve, interval)
                });
            });
        });
        promise.then(() => {
            msg.channel.createMessage(`Finished Dehoisting! <@${msg.author.id}>`)
        });
    }

    if(command === "ping") {
        msg.channel.createMessage("My Ping is: 23.66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666663")
    }

})

bot.connect()

process.on("unhandledRejection", e => console.log(e) )
process.on("uncaughtException", e => console.log(e) )