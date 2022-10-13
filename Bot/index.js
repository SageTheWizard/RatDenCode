// Includes
const Discord = require('discord.js')
const CommandHandler = require("./commandHandler.js")
const Drawing = require('./customLibs/drawing.js')
const OSRS = require('./customLibs/runescape.js')

require('dotenv').config()

// Stuff for Discord API
const { Client, GatewayIntentBits } = require('discord.js')
const { REST, SlashCommandBuilder, Routes } = require('discord.js')
const rest = new REST({ version: '10' }).setToken(process.env.BotToken);

// Command Registering
const commands = [
    new SlashCommandBuilder().setName('despa').setDescription('cito'),
    new SlashCommandBuilder().setName('lunks_gpa').setDescription('Get Lunks GPA'),
    new SlashCommandBuilder().setName('daily_dose').setDescription("Get a daily dose of DRIP"),
    new SlashCommandBuilder().setName('roll').setDescription("Play Craps with Friends"),
    new SlashCommandBuilder()
        .setName('osrs_price')
        .setDescription("Get a price of an OSRS item")
        .addStringOption(option =>
            option.setName("item")
                .setDescription("OSRS item name")
                .setRequired(true)),
    new SlashCommandBuilder()
        .setName("rng")
        .setDescription("roll a random number between \"low\" and \"high\" value")
        .addIntegerOption(option =>
            option.setName("low")
                .setDescription("Lowest value for random numbers")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName("high")
                .setDescription("Highest value for random numbers")
                .setRequired(true))

].map(command => command.toJSON())

rest.put(Routes.applicationGuildCommands(process.env.BotID, process.env.RatDenID), { body: commands })
    .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
    .catch(console.error);

// Client Init
const client = new Discord.Client({ intents: [GatewayIntentBits.Guilds] })


// Main Code
client.on('ready', () => {
    initializeCommandHandler()
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return

    const { commandName } = interaction
    CommandHandler.executeCommand(commandName, interaction)
})

// Initialize response generation here
function initializeCommandHandler() {
    // COMMAND -- DESPA
    CommandHandler.registerCommand("despa", async interaction => {
        await interaction.reply("CITO! -- For your Enjoyment - https://www.youtube.com/watch?v=kJQP7kiw5Fk")
    })

    // COMMAND -- LUNKS GPA
    CommandHandler.registerCommand("lunks_gpa", async interaction => {
        await interaction.reply("Lunks Current GPA is: " + (Math.random() * 4.0) + " ... Alfatoxins be wylin")
    })

    // COMMAND -- DAILY DOSE
    CommandHandler.registerCommand("daily_dose", async interaction => {
        await interaction.reply("I'm at the baaaaar with herrrr oooooo she looking at me - https://www.youtube.com/watch?v=Lt2wjJlP2N4")
    })

    // COMMAND -- ROLL
    CommandHandler.registerCommand("roll", async interaction => {
        let die1 = Math.floor(Math.random() * 6) + 1
        let die2 = Math.floor(Math.random() * 6) + 1
        await interaction.reply("You Rolled a " + die1 + " and a " + die2 + "\n" + Drawing.drawDice(die1, die2))
    })

    // COMMAND -- RNG
    CommandHandler.registerCommand("rng", async interaction => {
        let low = interaction.options.getInteger("low")
        let high = interaction.options.getInteger("high")
        let delta = high - low
        let value = Math.floor(Math.random() * delta) + low
        await interaction.reply("RNG between " + low + " and " + high + ": **" + value + "**")

    })

    // COMMAND -- OSRS_PRICE
    CommandHandler.registerCommand("osrs_price", async interaction => {
        let item = interaction.options.getString('item')
        let replyStr = await OSRS.GetPrice(item).then((dataJSON) => {
            if (dataJSON === -1) {
                replyStr = "Error Getting Price... maybe incorect name?"
                return replyStr
            }
            else if (dataJSON === {}) {
                replyStr = "Error Contacting GE API... Try again later..."
                return replyStr
            }

            let GP = dataJSON["price"]
            let trend = dataJSON["trend"]

            console.log("ITEM: " + item + " GP: " + GP + " TREND: " + trend)

            let replyStr = "Price for " + item + ": " + GP + " GP." + "\n"
            replyStr += "Today the price has gone "
            if (trend === "positive") {
                replyStr += "UP!"
            }
            else if (trend === "negative") {
                replyStr += "DOWN!"
            }
            else {
                replyStr += "... nowhere... its about the same..."
            }
            return replyStr
        })
        await interaction.reply(replyStr)
    })
}

client.login(process.env.BotToken)