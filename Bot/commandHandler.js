var Commands = {}

module.exports = {
    registerCommand: function (commandID, action) {
        Commands[commandID] = action
    },
    executeCommand: function (commandID, interaction) {
        Commands[commandID](interaction)
    }
}