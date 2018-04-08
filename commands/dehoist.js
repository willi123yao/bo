module.exports = {
    command: "dehoist",
    execute: async (bot, msg, args) => {
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
        hoisters.forEach(member => {
            promise = promise.then(() => {
                let nickname = member.username.split("")
                if(member.username.length < 31) {
                    nickname.unshift("𛲢")
                    member.edit({ nick: nickname.join("") })
                } else {
                    nickname.splice(30, 2)
                    nickname.unshift("𛲢")
                    member.edit({ nick: nickname.join("") })
                }
                return new Promise(resolve => {
                    setTimeout(resolve, interval)
                });
            });
        });
        promise.then(() => {
            msg.channel.createMessage(`Finished Dehoisting! <@${msg.author.id}>`)
        });
    }
}