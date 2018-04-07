module.exports = {
    command: "unshitpostmute",
    execute: async (bot, msg, args) => {
        if(!args[0]) return msg.channel.createMessage("You did not give any user to shitpost unmute")
        let target
        if(msg.mentions.length >= 1) {
            target = msg.mentions[0].id
            unmute(target)
        } else if(msg.content.match(/[0-9]{16,18}/)) {
            target = msg.content.match(/[0-9]{16,18}/)[0]
            unmute(target)
        }
        function unmute(id) {
            let muteRole = "324625084700688385"
            if(!msg.channel.guild.members.get(id).roles.includes(muteRole)) return msg.channel.createMessage("This user is not shitpost muted")
            msg.channel.guild.removeMemberRole(target, muteRole).then(() => {
                msg.channel.createMessage(`Successfully shitpost unmuted <@${id}>`)
            }).catch(e => {
                msg.channel.createMessage("Could not shitpost unmute this person")
            })
        }
    }
}