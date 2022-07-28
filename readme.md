[![npm version](https://badge.fury.io/js/crapcord.svg)](https://www.npmjs.com/package/crapcord)

# crapcord

> A small library for making discord bots, using the gateway *unlike* discord-easy-slash *(my last library)*

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Getting Started


## Installation
<br>

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

<br>

To install and set up the library, run:

```sh
$ npm install crapcord
```

Or if you prefer using Yarn:

```sh
$ yarn add --dev crapcord
```

## Usage

### First, Start by importing the library

```js
var client = require('crapcord');
```
<br>
### Then, log in with your token, intents, and presence.

```js
client.login('TOKEN', 513, {
    name: "Froggy",
    type: client.activityTypes["Playing"],
});
  ```
  <br>

### Making a command:

```js
new client.command('help', 1, 'help command?', <APP_ID> ,null) // GLOBAL COMMAND
new client.guild_command('help', 1, 'help command?', <APP_ID> , <GUILD_ID>, null) // GUILD COMMAND
```

The *command* class takes 5 arguments, *Name* (Of the command), *Type* (Of the command), *Description* (Of the command), the *APP_ID* (Of the bot), and *Options* (any options that the command takes).

The *guild_command* class takes 6 arguments, *Name* (Of the command), *Type* (Of the command), *Description* (Of the command), the *APP_ID* (Of the bot), the *GUILD_ID* (Of the guild), and *Options* (any options that the command takes).

### For types:
![](./command_types.png)
or look at this [page](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types) by discord.

### For options:
They look like this:
```js
[ { "name": "nameofoption", "description": "descriptionofoption", "type": 4, "required": true, } ]
```
It takes an array, with all the options for the command. Because of this, you can have multiple options for a single command.

For types of objects:
![](./option_types.png)
or look at this [page](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type) by discord.

### Main Event Listener:

```js
client.on('INTERACTION_CREATE', (interaction)=>{
  // do stuff
  const message = new client.MESSAGE(msg)
  message.reply(`Oh, nice message!`)
})

client.on('MESSAGE_CREATE', (msg)=>{
  // do stuff
  const interact = new client.INTERACTION(msg)
  interact.reply(`Oh, nice interaction!`)
})

// and so on...
```

[List of all events](https://discord.com/developers/docs/topics/gateway#commands-and-events)

<br>

client.reply takes 3 arguments, *message*, which is the message to send, *embeds*, which is an array of embeds for the command to send, and *components*, which is an array of components for the command to send.

```js
client.reply(message, embeds, components)
```

### For embeds:

```js
[ { "title": "title", "description": "description", "color": "color", "fields": [ { "name": "name", "value": "value", "inline": true }, { "name": "name", "value": "value", "inline": true } ] } ]
```

### Making our bot search for interactions/logging-in/turning it on:

```js
client.login('TOKEN', 513, {
    name: "Froggy",
    type: client.activityTypes["Playing"],
  });
```


### Serving the app

```sh
$ npm start
```

## Contributing

You can contribute to the project by making a pull request on [GitHub](https://github.com).

## Credits

# Amukh1.

## Built With

* [Node](https://nodejs.org/)
* [Express + Cors](https://expressjs.com)
* [Discord](https://discord.com/developers/docs/intro)
* [Love](https://amukh1.dev)

## Authors

* **Amukh1** - [Github](https://github.com/amukh1)

See also the list of [contributors](https://github.com/amukh1/crapcord/contributors) who participated in this project.

## License

[MIT License](https://andreasonny.mit-license.org/2022) © Amukh1