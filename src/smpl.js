//this file servers no purpose other than quick testing of stuff individually.

let fs = require('fs');
let wav = require('./waveFile');
//let wfile = "/Volumes/EX3/my.force/media/FORCE/Keygroups/Midi 001-Auto sampled-064 E3.WAV";
//wINFO = wav.read(wfile, false);
wav.createAkaiChunk(0, 2047, 0);
//console.log(wINFO);
//console.log(wINFO.AKAI);
/*
let note = {
    ROOT: 5,
    CENTS: -23
}
if (note.CENTS < 0) {
    note.ROOT -= 1;
    note.CENTS += 100;
}
console.log(note);
getCentFractions(note.CENTS);
function getCentFractions($cents) {
    $cents /= 100;
    console.log($cents);
    console.log($cents.toString(16));
    console.log(toBytes($cents));
}

function toBytes(v, len = 4) {

    let data = v.toString(2).padStart(32, "0").match(/[0|1]{8}/g).reverse().map(b => parseInt(b, 2));
    return data.slice(0, len);
}

function fractionToBytes($v) {
    return parseInt(($v).toString(16).split(".")[1].slice(0, 8), 16).toString(2).padStart(32, "0").match(/[0|1]{8}/g).reverse().map(b => parseInt(b, 2));
}
console.log(toBytes(0.5));
console.log(fractionToBytes(0.25));*/