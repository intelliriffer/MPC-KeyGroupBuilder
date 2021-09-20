//this file servers no purpose other than quick testing of stuff individually.

let fs = require('fs');
let wav = require('./waveFile');
let wfile = "/Volumes/EX2/wts-4088-3+25.wav";
wINFO = wav.read(wfile, false);
console.log(wINFO.SMPL);
process.exit();
//wav.createAkaiChunk(0, 2047, 0);
//console.log(wINFO.SMPL);

let bs = [0x80, 0x00, 0x00, 0x00];

function bytesToCents(bs) {
    let hs = parseInt(bs.map(v => v.toString(16).padStart(2, 0)).join(''), 16);
    console.log(toCents(hs));
    console.log("hs is " + hs);
}

bytesToCents(bs);

//console.log(toBytes(hs).reverse());
//console.log(centsToFractionsAsBytes(50));
function toBytes(v, len = 4) {
    let data = v.toString(2).padStart(32, "0").match(/[0|1]{8}/g).reverse().map(b => parseInt(b, 2));
    return data.slice(0, len);
}
let cnts = 77;
//cf = centsToFraction(cnts);
/*console.log(cf);
console.log(toCents(cf));*/
function toCents(v) {
    return Math.round(v * (1.00 / 2 ** 32) * 100);
}

function centsToFraction(cents) {
    cents = cents / 100;
    console.log(cents);
    return Math.round(cents * (2 ** 32));
}
function centsToFractionsAsBytes(cents) {
    if (cents > 99) cents = 99;
    let i = centsToFraction(cents);
    console.log(i);
    return toBytes(i).reverse();
    console.log(i);
}
//console.log(byteSum(bs));

function byteSum(bytes) {

    $bytes = Array.from(bytes);
    $sum = 0;

    for (let i = 0; i < $bytes.length; i++) {
        $sum += ($bytes[i] << (8 * i));
    }
    return $sum;
}


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