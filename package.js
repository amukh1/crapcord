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
    if(pkg[t]){
    pkg[t](d)
    }
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
    },
    activityTypes: {
        "Playing": 0,
        "Streaming": 1,
        "Listening": 2,
        "Watching": 3,
        "Custom": 4,
        "Competing": 5,
    },
}

module.exports = pkg