
let ANSI = require('./ANSI');

const model = require('./model');


if (process.argv.length !== 4) throw (ANSI.ERROR('Mode and Wav Folder not Provided'));
console.log(ANSI.YELLOW('ANANAN'));
var $mode = process.argv[2];
var $path = process.argv[3];
let ITEM = {
    FOLDER: $path,
    MODE: $mode
};

console.log(model.RemoteProcess(ITEM));
