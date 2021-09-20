let fs = require('fs');
const { Module } = require('module');
let path = require('path');
function isDir($path) {
    try {
        return fs.lstatSync($path).isDirectory();
    }
    catch (e) {
        return false;
    }
}
function isFile($path, $ext = null) {
    try {
        let isFile = fs.lstatSync($path).isFile();
        if ($ext == null) return isFile;
        return isFile && $path.toLowerCase().endsWith($ext.toLowerCase());
    }
    catch (e) {
        return false;
    }
}
module.exports = {
    isDir,
    isFile
}


