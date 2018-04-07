module.exports = {
    command: "mute",
    execute: async (bot, msg, args) => {
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
}