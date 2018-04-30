module.exports = class HelpCommand {
  execute ({ client, msg, args: [ commandName ] }) {
    const commands = [ ...client.commands.values() ];
    if (!commandName) {
      return {
        content: `Below you will find a list of my commands. Every mod command can take an ID, a tag, or a mention.\nRun \`${client.config.prefix}help <command>\` for more information regarding that command.`,
        embed: {
          color: 0xcb2c33,
          description: commands.map(g => g.props.triggers[0]).join(', ')
        }
      }
    };

    const command = commands.find(c => c.props.triggers.find(trigger => trigger.toLowerCase() === commandName));
    if (!command) {
      return `I was unable to find a command with the name \`${commandName}\`.`;
    }

    const { props } = command;
    return { embed: {
      color: 0xcb2c33,
      title: `Help for command: ${props.triggers[0]}`,
      fields: [
        { name: 'Description', value: props.description },
        { name: 'Usage', value: '```\n' + props.usage.replace('{command}', client.config.prefix + props.triggers[0]) + '```\n' },
        { name: 'Aliases', value: props.triggers[1] ? props.triggers.slice(1).join(', ') : 'None' }
      ]
    }}
  }

  get props () {
    return {
      triggers: ['help', 'h'],
      description: 'suk my duc natan',
      usage: '{command} [command]'
    }
  }
}