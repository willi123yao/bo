module.exports = {
    command: "shitpostmute",
    execute: async (bot, msg, args) => {
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
}