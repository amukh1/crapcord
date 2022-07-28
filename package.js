// require('dotenv').config()
const WebSocket = require('ws');
const ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json')
// const fetch = require('node-fetch')
const fetchPromise = import('node-fetch').then(mod => mod.default)
const fetch = (...args) => fetchPromise.then(fetch => fetch(...args))
let interval = 0;



ws.addEventListener('message', function(event) {
    const payload = event.data
    // console.log(JSON.parse(payload.toString()))
}) 

ws.on('message', function incoming(data) {
    let payload = JSON.parse(data)
    const { t, event, op, d } = payload;

    switch (op) {
        case 10:
            const { heartbeat_interval } = d;
            interval = heartbeat(heartbeat_interval)
            break;
    }
    // console.log(t)

        if(t == "ready"){
               pkg.READY()
}else if(t == "MESSAGE_CREATE"){
            pkg.MESSAGE_CREATE(d)
}else if( t == "INTERACTION_CREATE"){
             // https://discord.com/api/v9/interactions/${d.id}/${d.token}/callback
            let URL = `https://discord.com/api/v9/interactions/${d.id}/${d.token}/callback`;
             pkg["INTERACTION_CREATE"](d)
}else if(typeof(t) == "string"){
    pkg[t](d)
}
        

    
})

const heartbeat = (ms) => {
    return setInterval(() => {
        ws.send(JSON.stringify({op: 2, d: null}))
    }, ms)
}

let pkg = {
   login: (token, intents, activity)=>{ ws.on('open', function open(data) {
    pkg.token = token
        ws.send(JSON.stringify({
            op: 2,
            d: {
                token: token,
                intents: intents,
                properties: {
                    $os: 'win',
                    $browser: 'squacker',
                    $device: 'squacker'
                },
                presence: {
                    activities: [activity],
                    status: "online",
                    since: 0,
                    afk: false
                },
            }
        }))
    })
   },
   ["INTERACTION_CREATE"]: (d)=>{
console.log('INTERACTION_CREATE')
   },
    ["MESSAGE_CREATE"]: (d)=>{
        console.log('MESSAGE_CREATE')
    },
    ["READY"]: (d)=>{
        console.log('READY')
    },
    ['CHANNEL_CREATE']: (d)=>{
        console.log('CHANNEL_CREATE')
    },
    ['CHANNEL_UPDATE']: (d)=>{
        console.log('CHANNEL_UPDATE')
    },
    ['CHANNEL_DELETE']: (d)=>{
        console.log('CHANNEL_DELETE')
    },
    ['CHANNEL_PINS_UPDATE']: (d)=>{
        console.log('CHANNEL_PINS_UPDATE')
    },
    ["GUILD_CREATE"]: (d)=>{
        console.log('GUILD_CREATE')
    },
    ["GUILD_MEMBER_ADD"]: (d)=>{
        console.log('GUILD_MEMBER_ADD')
    },
    ["GUILD_MEMBER_REMOVE"]: (d)=>{
        console.log('GUILD_MEMBER_REMOVE')
    },
    ["GUILD_MEMBER_UPDATE"]: (d)=>{
        console.log('GUILD_MEMBER_UPDATE')
    },
    ["GUILD_MEMBERS_CHUNK"]: (d)=>{
        console.log('GUILD_MEMBERS_CHUNK')
    },
    ["GUILD_UPDATE"]: (d)=>{
        console.log('GUILD_UPDATE')
    },
    ["GUILD_DELETE"]: (d)=>{
        console.log('GUILD_DELETE')
    },
    ["GUILD_BAN_ADD"]: (d)=>{
        console.log('GUILD_BAN_ADD')
    },
    ["GUILD_BAN_REMOVE"]: (d)=>{
        console.log('GUILD_BAN_REMOVE')
    },
    ["GUILD_EMOJIS_UPDATE"]: (d)=>{
        console.log('GUILD_EMOJIS_UPDATE')
    },
    ["GUILD_INTEGRATIONS_UPDATE"]: (d)=>{
        console.log('GUILD_INTEGRATIONS_UPDATE')
    },
    ["GUILD_ROLE_CREATE"]: (d)=>{
        console.log('GUILD_ROLE_CREATE')
    },
    ["GUILD_ROLE_UPDATE"]: (d)=>{
        console.log('GUILD_ROLE_UPDATE')
    },
    ["GUILD_ROLE_DELETE"]: (d)=>{
        console.log('GUILD_ROLE_DELETE')
    },
    ["GUILD_SYNC"]: (d)=>{
        console.log('GUILD_SYNC')
    },
    ["GUILD_MEMBERS_CHUNK"]: (d)=>{
        console.log('GUILD_MEMBERS_CHUNK')
    },
    ["GUILD_MESSAGE_DELETE"]: (d)=>{
        console.log('GUILD_MESSAGE_DELETE')
    },
    ["GUILD_MESSAGE_BULK_DELETE"]: (d)=>{
        console.log('GUILD_MESSAGE_BULK_DELETE')
    },
    ["GUILD_MESSAGE_UPDATE"]: (d)=>{
        console.log('GUILD_MESSAGE_UPDATE')
    },
    ["GUILD_MESSAGE_DELETE_BULK"]: (d)=>{
        console.log('GUILD_MESSAGE_DELETE_BULK')
    },
    ["GUILD_MESSAGE_REACTION_ADD"]: (d)=>{
        console.log('GUILD_MESSAGE_REACTION_ADD')
    },
    ["GUILD_MESSAGE_REACTION_REMOVE"]: (d)=>{
        console.log('GUILD_MESSAGE_REACTION_REMOVE')
    },
    ["GUILD_MESSAGE_REACTION_REMOVE_ALL"]: (d)=>{
        console.log('GUILD_MESSAGE_REACTION_REMOVE_ALL')
    },
    ["GUILD_MESSAGE_REACTION_REMOVE_EMOJI"]: (d)=>{
        console.log('GUILD_MESSAGE_REACTION_REMOVE_EMOJI')
    },
    ["GUILD_INTEGRATIONS_UPDATE"]: (d)=>{
        console.log('GUILD_INTEGRATIONS_UPDATE')
    },
    ["GUILD_WEBHOOKS_UPDATE"]: (d)=>{
        console.log('GUILD_WEBHOOKS_UPDATE')
    },
    ["GUILD_INVITE_CREATE"]: (d)=>{
        console.log('GUILD_INVITE_CREATE')
    },
    ["GUILD_INVITE_DELETE"]: (d)=>{
        console.log('GUILD_INVITE_DELETE')
    },
    ["GUILD_BAN_ADD"]: (d)=>{
        console.log('GUILD_BAN_ADD')
    },
    ["GUILD_BAN_REMOVE"]: (d)=>{
        console.log('GUILD_BAN_REMOVE')
    },
    ["GUILD_EMOJIS_UPDATE"]: (d)=>{
        console.log('GUILD_EMOJIS_UPDATE')
    },
    INTERACTION: class {
        constructor(d) {
            this.data = d
        }
       repy(reply, embeds, components) {
        // https://discord.com/api/v9/interactions/${this.data.id}/${this.data.token}/callback
        const fetch_arguments = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bot ${pkg.token}`,
        },
        body: JSON.stringify({
            type: 4,
            data: {
                "content": reply,
                "embeds": embeds,
                "components": components,
            }
        })
       }
    //    console.log(this)
         fetch(`https://discord.com/api/v9/interactions/${this.data.id}/${this.data.token}/callback`, fetch_arguments).catch(err => console.log(err))
    }},
    token: null,
    MESSAGE: class {
        constructor(d) {
            this.data = d
            this.channel = {
                id: d.channel_id,
                send: (reply, embeds, components)=>{
                    // https://discord.com/api/v10/channels/${channel.id}/messages
                    const fetch_arguments = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bot ${pkg.token}`,
                    },
                    body: JSON.stringify({
                        "content": reply,
                        "embeds": embeds,
                        "components": components,
                    })
                    }
                    fetch(`https://discord.com/api/v10/channels/${this.data.channel_id}/messages`, fetch_arguments).catch(err => console.log(err))
                }
            }
        }
        reply(reply, embeds, components) {
            // POST https://discord.com/api/v10/channels/${channel.id}/messages
            const fetch_arguments = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bot ${pkg.token}`,
                },
                body: JSON.stringify({
                    "content": `<@${this.data.author.id}>, ${reply}`,
                    "embeds": embeds,
                    "components": components,
                })
    }
    // console.log(this.data)
            fetch(`https://discord.com/api/v10/channels/${this.data.channel_id}/messages`, fetch_arguments).catch(err => console.log(err))
}

      
    },

    command: class {
        constructor(name, type, description, APP_ID,options) {
            this.name = name
            this.type = type
            this.description = description
            this.options = options

            let headers = {
                "Content-Type": "application/json",
                "Authorization": `Bot ${pkg.token}`,
            }
            let uuri = `https://discord.com/api/v10/applications/${APP_ID}/commands`
            let optionscmd = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    "name": name,
                    "type": type,
                    "description": description,
                    "options": options,
                })
            }
            fetch(uuri, optionscmd).catch(err => console.log(err))
        }
    },
    guild_command: class {
        constructor(name, type, description, APP_ID, GUILD_ID, options) {
            this.name = name
            this.type = type
            this.description = description
            this.options = options

            let headers = {
                "Content-Type": "application/json",
                "Authorization": `Bot ${pkg.token}`,
            }
            let uuri = `https://discord.com/api/v10/applications/${APP_ID}/guilds/${GUILD_ID}/commands`
            let optionsguild = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    "name": name,
                    "type": type,
                    "description": description,
                    "options": options,
                })
            }
            fetch(uuri, optionsguild).catch(err => console.log(err))
        }
    },
    on: function(event, callback) {
        const events = require('./events.js')
        pkg[event] = callback
    }
}

module.exports = pkg