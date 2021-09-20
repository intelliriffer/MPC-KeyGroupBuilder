/***************************************************
    copyright © Amit Talwar
    www.amitszone.com
    MyApps : https://midi.amitszone.com
****************************************************/
let fs = require('fs');
let path = require('path');
let ANSI = require('./ANSI');
const MIDI = require('./midiHelpers');
const helpers = require('./helpers');
const model = require('./model');
const execSync = require('child_process').execSync;
const $config = path.join(__dirname, "../config.txt");
if (!isFile($config)) ANSI.XERROR('Error! ==> Config.txt Not Found!!');
let fdata = fs.readFileSync($config).toString();
let files = fdata.split("\n").filter(v => { return v.trim() != '' && !v.trim().startsWith('#') });
let options = /#OPTIONS (.*)/.exec(fdata);
if (options) {
    let odata = options[1].trim().replaceAll(/\s+/g, ' ').split(' ');
    Object.keys(model.OPTIONS).forEach(k => {
        model.OPTIONS[k] = odata.includes(k.trim());
    });
}

let CONVERTS = validateConfig(files);
CONVERTS.forEach(i => model.Process(i));



/**********************************************************************************************************
 Hoisted Functions
**********************************************************************************************************/

function validateConfig($data) {
    let CLIST = [];
    for (let i = 0; i < $data.length; i++) {
        let chunks = $data[i].trim().split(" ");
        let mode = chunks.shift().trim();
        let folder = chunks.join(' ');
        if (!isDir(folder)) ANSI.XTHROW(`ERROR in Config.txt ***** Line ${i + 1} ,  Folder ${clean(folder)} Does not Exist!`);
        if (!model.isValidMode(mode)) ANSI.XTHROW(`ERROR in Config.txt ***** Line ${i + 1} ,  Invalid Mode [${mode}] , Expected one of the following ( ${model.ModeList().join(", ")} )`);
        if (!isRecursive(folder)) {
            let ITEM = {
                FOLDER: clean(folder),
                MODE: mode
            };
            CLIST.push(ITEM);
        } else {
            let subs = fs.readdirSync(clean(folder)).map(v => path.join(clean(folder), v)).filter(v => isDir(v));
            subs.forEach(v => {
                let ITEM = {
                    FOLDER: v,
                    MODE: mode
                };
                CLIST.push(ITEM);

            });
        }
    }
    return CLIST;
}


function isInt(v) {
    return !isNaN(v) && v.indexOf(".") == -1 && Number.isInteger(parseInt(v));

}


function getMultiFileName(file, sample) {
    return file.replace(/\.[w|W][a|A][v|V]$/, ` - ${sample}.wav`);
}

function isFile($f) {
    $f = clean($f);
    return fs.existsSync($f) && fs.lstatSync($f).isFile();
}
function isDir($f) {
    $f = clean($f);
    return fs.existsSync($f) && fs.lstatSync($f).isDirectory();
}
function isRecursive($f) {
    return $f.endsWith('*');
}
function clean($f) {
    return $f.replace(/\*$/, '');
}

function generateSox($P) {
    $P.forEach(F => {
        console.log(ANSI.YELLOW(`>>>>>> Processing: ${F.FILE} >>>>>>>>>>> `));
        F.MATRIX.forEach(M => {
            $cmd = `sox -v 0.9 "${F.FILE}" "${M.FILE}" pitch -q ${M.CENTS} rate 48000 norm -0.1 dither`;
            console.log(ANSI.BLUE(`<<<<< Creating: ${M.FILE} <<<<<`));
            execSync($cmd).toString();
        });
        console.log(ANSI.GREEN("********* DONE ********\n"));
    });

}