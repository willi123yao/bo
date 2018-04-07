const Eris = require("eris")
const c = require("./config.json")
const fs = require("fs")
const bot = new Eris(c.token, { getAllUsers: true })
const prefix = "dbl!"

let commands = new Map()
fs.readdir("./commands/", (err, files) => {
    files.forEach(file => {
        if(file.toString().includes(".js")) {
            let cmd = require(`./commands/${file.toString()}`)
            if (cmd) {
                console.log(`Loaded command: ${cmd.command}`)
                commands.set(cmd.command, cmd.execute)
            }
        }
    })
})

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

    let cmd = commands.get(command)
    if (cmd) await cmd(bot, msg, args)

})

bot.connect()

process.on("unhandledRejection", e => console.log(e) )
process.on("uncaughtException", e => console.log(e) )