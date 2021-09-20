/***************************************************
    copyright © Amit Talwar
    www.amitszone.com
    MyApps : https://midi.amitszone.com
****************************************************/

let ANSI = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',

    //Foreground Colors
    FgBlack: '\x1b[30m',
    FgRed: '\x1b[31m',
    FgGreen: '\x1b[32m',
    FgYellow: '\x1b[33m',
    FgBlue: '\x1b[34m',
    FgMagenta: '\x1b[35m',
    FgCyan: '\x1b[36m',
    FgWhite: '\x1b[37m',

    //Background Colors
    BgBlack: '\x1b[40m',
    BgRed: '\x1b[41m',
    BgGreen: '\x1b[42m',
    BgYellow: '\x1b[43m',
    BgBlue: '\x1b[44m',
    BgMagenta: '\x1b[45m',
    BgCyan: '\x1b[46m',
    BgWhite: '\x1b[47m',
}

module.exports = {
    ANSI, wrap, ERROR, GREEN, YELLOW, CYAN, BLUE

}

function wrap($color, $data) {
    return ANSI[$color] + $data + ANSI['Reset'];

}

function ERROR($data) {
    return wrap('FgRed', $data);
}

function GREEN($data) {
    return wrap('FgGreen', $data);
}
function YELLOW($data) {
    return wrap('FgYellow', $data);
}
function CYAN($data) {
    return wrap('FgCyan', $data);
}
function BLUE($data) {
    return wrap('FgBlue', $data);
}