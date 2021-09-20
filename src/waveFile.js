/***************************************************
    copyright © Amit Talwar
    www.amitszone.com
    MyApps : https://midi.amitszone.com

****************************************************/


let fs = require('fs');
let WAVINFO = null;

exports.read = function ($file, getData = true) {

    let error = {
        error: true,
        message: "Invalid Wave File"
    }

    WAVINFO = null;
    if (!fs.existsSync($file)) {
        error.message = "file not found!";
        return error;
    }

    let $fb = fs.readFileSync($file);
    $header = $fb.slice(0, 12);
    $riff = $fb.findString("RIFF");
    $wave = $fb.findString("WAVE");

    if ($riff == 0 && $wave != 8) {
        error.message = "invalid wave File";
        return error;
    }

    return wavInfo($fb, getData);
}

exports.write = function ($filename, channels, format, samplerate, bitdepth, data, chunks = []) {

    let header = {
        RIFF: [0x52, 0x49, 0x46, 0x46],
        RIFFSIZE: [],
    }

    let chunk = {
        WAVE: [0x57, 0x41, 0x56, 0x45],
        FMT: [0x66, 0x6D, 0x74, 0x20, 0x10, 0x00, 0x00, 0x00],
        FORMAT: toBytes(format, 2),
        CHANNELS: toBytes(channels, 2), //:2
        SAMPLERATE: toBytes(samplerate), // :4
        BYTERATE: toBytes(samplerate * channels * bitdepth / 8), //SampleRate * NumChannels * BitsPerSample/ 8  : 4
        BLOCKALIGN: toBytes(channels * bitdepth / 8, 2), //NumChannels * BitsPerSample/8 :2
        BITSPERSAMPLE: toBytes(bitdepth, 2), //NumChannels * BitsPerSample/8 :2
        DATAID: [0x64, 0x61, 0x74, 0x61],
        DATASIZE: toBytes(data.length),

    }

    let total = 0;
    let payload = [];

    Object.keys(chunk).forEach(e => { total += chunk[e].length; payload = payload.concat(chunk[e]); });
    total += data.length;
    total += chunks.length;
    header.RIFFSIZE = toBytes(total);

    let out = header.RIFF.concat(header.RIFFSIZE).concat(payload);
    let odata = Buffer.from(out)

    odata = Buffer.concat([odata, data, Buffer.from(chunks)]);
    fs.writeFileSync($filename, odata);

}

exports.createAkaiChunk = function (START, END, LOOPSTART, LOOPMODE = 1) {
    let chunk = {
        value0: {
            defaultSlice: {
                Start: START,
                End: END,
                LoopStart: LOOPSTART,
                LoopMode: LOOPMODE,
                PulsePosition: 0,
                LoopCrossfadeLength: 0,
                LoopCrossfadeType: 0
            },
            numBars: 2,
            'Num slices': 0
        },
        value1: { value0: { note: 3, scale: 1 } }
    };
    let jstr = JSON.stringify(chunk, null, 2);
    let jbytes = unpack(jstr.trim());
    let header = unpack('atem');
    let size = toBytes(jbytes.length);
    return header.concat(size).concat(jbytes);

    function unpack(str) {
        var bytes = [];
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            //bytes.push(char >>> 8);
            bytes.push(char & 0xFF);
        }
        return bytes;
    }


}

exports.createSMPLChunk = function (ROOT, CENTS, LOOPSTART, LOOPEND) {
    if (CENTS < 0) {
        ROOT -= 1;
        CENTS += 100;
    }
    CENTS /= 100;
    let chunk = {
        HEADER: [0x73, 0x6D, 0x70, 0x6C],
        SIZE: [0x3C, 0x00, 0x00, 0x00],
        MANUFACTURER: toBytes(0),
        PRODUCT: toBytes(0),
        PERIOD: toBytes(0),
        MIDINOTE: toBytes(ROOT),
        MIDICENTS: fractionToBytes(CENTS),
        SMPTE: toBytes(0),
        SMPTEOFFSET: toBytes(0),
        NUMLOOPS: toBytes(1),
        SAMPLERSIZE: toBytes(0),
        CUE: toBytes(0),
        TYPE: toBytes(0), //FWD LOOP
        START: toBytes(LOOPSTART),
        END: toBytes(LOOPEND),
        FRACTION: toBytes(0),
        PLAYCOUNT: toBytes(0), //infinite
    }
    let payload = [];
    Object.keys(chunk).forEach(e => { payload = payload.concat(chunk[e]); });
    return payload;

}

function fractionToBytes($v) {
    return parseInt(($v).toString(16).split(".")[1].slice(-8), 16).toString(2).padStart(32, "0").match(/[0|1]{8}/g).reverse().map(b => parseInt(b, 2));
}

function wavInfo($fb, getData = true) {

    $o = {
        error: false,
        file: '',
        name: '',
        samples: 1,
        depth: 16,
        channels: 1,
        samplerate: 44100
    };

    $fmtpos = $fb.findString('fmt', 12);
    $fileSize = getSum($fb, 4, 4)
    $fmtsize = getSum($fb, $fmtpos + 4, 4);
    $format = getSum($fb, $fmtpos + 8, 2);
    $channels = getSum($fb, $fmtpos + 10, 2);
    $samplerate = getSum($fb, $fmtpos + 12, 4);

    $depth = getSum($fb, $fmtpos + 22, 2);
    $datapos = $fb.findString('data', 32);
    $datasize = getSum($fb, $datapos + 4, 4);
    $sampleend = $datasize / ($channels * ($depth / 8));

    let wavdata = $fb.slice($datapos + 8, $datapos + $datasize + 8);

    let $smpls = {};
    $o = {
        numsamples: $sampleend,
        depth: $depth,
        channels: $channels,
        format: $format,
        samplerate: $samplerate,
        multiplier: $depth / 8,
        datalen: wavdata.lenngth,
        hasSMPL: false,
        isAkai: false,
        AKAI: {},
        SMPL: $smpls

    };
    $smplpos = $akai = 0;
    $start = $fb.toString().indexOf('smpl');
    if ($start >= 0) {
        $smplpos = $fb.findString('smpl', $start);
    }

    $start = $fb.toString().indexOf('atem');
    if ($start >= 0) {
        $akai = $fb.findString('atem', $start);
    }

    if ($smplpos > 0) {
        //console.log('smpl chunk found');
        $o.hasSMPL = true;
        $o.SMPL = getSMPL($fb, $smplpos);
    }
    if ($akai > 0) {
        //console.log('akai chunk found');
        $o.isAkai = true;
        let jLen = getSum($fb, $akai + 4, 4);
        let jData = $fb.slice($akai + 8, $akai + 8 + jLen).toString().trim().replace(/\0$/, "");
        // $o.AKAI = JSON.parse(jData);
    }

    if (getData) $o.data = wavdata;;
    this.return = $o;
    this.return.isSerum = isSerum($fb);
    return this.return;
}

function getSMPL($fb, $pos) {
    let smplSize = getSum($fb, $pos + 0x04, 4);
    function getLoops() {
        let n = getSum($fb, $pos + 0x24, 4);
        let loops = [];
        let base = $pos + 0x2C;
        for (let i = 0; i < n; i++) {
            let loop = {
                CUE: getSum($fb, base + 0x00 + (i * 0x18), 4),
                TYPE: getSum($fb, base + 0x04 + (i * 0x18), 4),
                START: getSum($fb, base + 0x08 + (i * 0x18), 4),
                END: getSum($fb, base + 0x0C + (i * 0x18), 4),
                FRACTION: getSum($fb, base + 0x10 + (i * 0x18), 4),
                PLAYCOUNT: getSum($fb, base + 0x14 + (i * 0x18), 4),
            };
            loops.push(loop);
        }
        return loops;
    }

    let Ret = {
        MANUFACTURER: getSum($fb, $pos + 0x08, 4),
        PRODUCT: getSum($fb, $pos + 0x0C, 4),
        PERIOD: getSum($fb, $pos + 0x10, 4),
        MIDINOTE: getSum($fb, $pos + 0x14, 4),
        MIDICENTS: getSum($fb, $pos + 0x18, 4),
        SMPTE: getSum($fb, $pos + 0x1C, 4),
        SMPTEOFFSET: getSum($fb, $pos + 0x20, 4),
        NUMLOOPS: getSum($fb, $pos + 0x24, 4),
        SAMPLERSIZE: getSum($fb, $pos + 0x28, 4),
        LOOPS: getLoops()
    };
    return Ret;

}


function isSerum($data) {
    let $start = $data.toString().indexOf('clm');
    if ($start == -1) return;
    let serumpos = $data.findString("clm ", $start);
    if (serumpos) {
        let da = Array.from($data.slice(serumpos + 11, serumpos + 15));
        return (parseInt(da.map(v => String.fromCharCode(v)).join('')));
    }
    return 0;
}

function byteSum(bytes) {

    $bytes = Array.from(bytes);
    $sum = 0;

    for (let i = 0; i < $bytes.length; i++) {
        $sum += ($bytes[i] << (8 * i));
    }
    return $sum;
}

Buffer.prototype.findString = function (s, start = 0) {
    if (start == -1) return -1;
    let b = this.slice(start);
    let sA = s.split('').map(v => v.charCodeAt(0));

    if (b.length < s.length) return -1;

    for (let i = 0; i < (b.length - s.length); i++) {
        try {

            let subArr = Array.from(b.slice(i, i + s.length));
            if (JSON.stringify(sA) == JSON.stringify(subArr)) {
                return start + i;
            }

        } catch (e) {
            console.log(e);
            return -1;
        }
    }
    return -1;
}

function getSum($data, start, length) {
    return byteSum($data.slice(start, start + length));
}

function toBytes(v, len = 4) {
    let data = v.toString(2).padStart(32, "0").match(/[0|1]{8}/g).reverse().map(b => parseInt(b, 2));
    return data.slice(0, len);
}