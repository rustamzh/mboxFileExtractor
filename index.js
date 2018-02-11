#!/usr/bin/env node

const fs = require('fs');
const base64 = require('base64js');
var argv = require('minimist')(process.argv.slice(2));
var LineByLineReader = require('line-by-line');

let flag = false;
let file = "";
let filename = "";
var fileNameRegEx = /(?:^|\s)filename="(.*?)"/g;
let i = 0;

if (argv._[0] != null) {
    lr = new LineByLineReader(argv._[0])
} else {
    if (process.stdin.isTTY || (typeof process.stdin.isTTY == 'undefined')){
        process.exit(1);
    }
    console.log(process.stdin.isTTY);
    
    lr = new LineByLineReader(process.stdin)
}

lr.on('error', function (err) {
    console.log(err.syscall);
});

fs.mkdir("output", (err)=>{
    if (err.code == "EEXIST"){
        
    } else {
        console.log(err);
        
    }
});

lr.on('line', function (line) {
	
    let match = fileNameRegEx.exec(line);
    if (match != null) {
        filename = match[1];
    }

    if (flag && line.trim().substring(0, 2) == '--') {
        flag = false;
        i++;
        var dataBuffer = new Buffer(file, 'base64');
        let ws = fs.createWriteStream("output/"+i+'.'+filename);
        ws.end(dataBuffer);
        file = "";
    }
    if (flag) {
        file += line;
    }
    if (!flag && line.trim().substring(0, 15) == 'X-Attachment-Id') {
        flag = true;
    }
});
