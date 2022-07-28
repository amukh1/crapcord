const client = require('./package.js'); // or require('squacker.js')


client.on('READY', ()=>{
    console.log('Bot is online!')
})

client.on('INTERACTION_CREATE', (interaction)=>{
    // console.log('Interaction!^2')
    if(interaction.data.name == 'help'){
    new client.INTERACTION(interaction).repy('Help Message!', [], [])
    }else if(interaction.data.name == 't'){
    new client.INTERACTION(interaction).repy('oohh yeah! you said.. ' + interaction.data.options[0].value, [], [])
    }
})


client.on('MESSAGE_CREATE', (msg)=>{
    if(msg.content == 'ping'){
       let ping = new client.MESSAGE(msg)
       ping.reply('pong')
        ping.channel.send('pong')
        console.log('pong')
    }
})


client.login('TOKEN', 513, {
    name: "Froggy",
    type: client.activityTypes["Playing"],
  });