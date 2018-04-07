module.exports = {
    command: "unmute",
    execute: async (bot, msg, args) => {
        if(!args[0]) return msg.channel.createMessage("You did not give any user to unmute")
        let target
        if(msg.mentions.length >= 1) {
            target = msg.mentions[0].id
            unmute(target)
        } else if(msg.content.match(/[0-9]{16,18}/)) {
            target = msg.content.match(/[0-9]{16,18}/)[0]
            unmute(target)
        }
        function unmute(id) {
            let muteRole = "300375880088158208"
            if(!msg.channel.guild.members.get(id).roles.includes(muteRole)) return msg.channel.createMessage("This user is not muted")
            msg.channel.guild.removeMemberRole(target, muteRole).then(() => {
                msg.channel.createMessage(`Successfully unmuted <@${id}>`)
            }).catch(e => {
                msg.channel.createMessage("Could not unmute this person")
            })
        }
    }
}