//this file servers no purpose other than quick testing of stuff individually.

let fs = require('fs');
let wav = require('./waveFile');
let wfile = "somefile";
wINFO = wav.read(wfile, false);
console.log(wINFO.SMPL);
process.exit();