dieMap = {
    1 : () => draw_1(),
    2 : () => draw_2(),
    3 : () => draw_3(),
    4 : () => draw_4(),
    5 : () => draw_5(),
    6 : () => draw_6(),
}

module.exports = {
    drawDice: function (die1, die2) {
        let returnStr = ""
        returnStr += "```\n"
        returnStr += dieMap[die1]()
        returnStr += dieMap[die2]()
        returnStr += "```"

        return returnStr
    }
}

function draw_1() {
    let die = " _____\n"
    die    += "|     |\n"
    die    += "|  ●  |\n"
    die    += "|_____|\n"
    return die
}

function draw_2() {
    let die = " _____\n"
    die    += "| ●   |\n"
    die    += "|     |\n"
    die    += "|____●|\n"
    return die
}

function draw_3() {
    let die = " _____\n"
    die    += "|●    |\n"
    die    += "|  ●  |\n"
    die    += "|____●|\n"
    return die
}

function draw_4() {
    let die = " _____\n"
    die    += "|●   ●|\n"
    die    += "|     |\n"
    die    += "|●___●|\n"
    return die
}

function draw_5() {
    let die = " _____\n"
    die    += "|●   ●|\n"
    die    += "|  ●  |\n"
    die    += "|●___●|\n"
    return die
}

function draw_6() {
    let die = " _____\n"
    die    += "|●   ●|\n"
    die    += "|●   ●|\n"
    die    += "|●___●|\n"
    return die
}