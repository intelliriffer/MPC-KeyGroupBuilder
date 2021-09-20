/***************************************************
    copyright © Amit Talwar
    www.amitszone.com
    MyApps : https://midi.amitszone.com
****************************************************/

exports.NoteName = function ($n) {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    return `${notes[$n % 12]}${Math.floor($n / 12)}`;
}

exports.getNote = function ($v) {
    if (!isNaN($v)) {
        return $v;
    }
    let valids = [
        ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
        ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
    ];

    let pattern = /^([C|D|E|F|G|A|B|][b|#]?)([0-9]{1,2})$/;
    let matches = $v.match(pattern);
    if (!matches || matches.length != 3) {
        return null;
    }
    let noteNum = valids[0].findIndex(v => v == matches[1]);
    if (noteNum == -1) noteNum = valids[1].findIndex(v => v == matches[1]);
    if (noteNum == -1) return null;

    return {
        NOTE: matches[1],
        INDEX: noteNum,
        VALUE: noteNum + (matches[2] * 12)
    }


}