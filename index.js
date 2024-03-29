//Work in progress -> might be a piece of junk
const fs = require('fs');
const util = require('util');
var midiTiming = require('./midi.js');
const { Note } = require("@tonaljs/tonal");

const args = process.argv.slice(2);//process arguments
if(args[0] === undefined){console.log('\x1b[31m%s\x1b[0m',"ERROR: Input file path not provided"); process.exit(9);}

var inFile = args[0] //input filename
var outFile = inFile.replace(".mid", ".json");//output filename
var outname = ""; //name to be writteno into output file
if (args[1] === undefined){outname = inFile.replace(".mid", "")}//if not defined, name should be the same as filename of input file
else{outname = args[1];}

//welcome screen
console.log('\x1b[32m%s\x1b[0m',"   ____ ___  ___  ____  ____  ___  _____      ");
console.log('\x1b[32m%s\x1b[0m',"  / __ `__ \\/ _ \\/ __ \\/ __ \\/ _ \\/ ___/ ");
console.log('\x1b[32m%s\x1b[0m'," / / / / / /  __/ /_/ / /_/ /  __/ /          ");
console.log('\x1b[32m%s\x1b[0m',"/_/ /_/ /_/\\___/ .___/ .___/\\___/_/         ");
console.log('\x1b[32m%s\x1b[0m',"              /_/   /_/                       \n");


var midiData = fs.readFileSync(args[0], 'binary');
var timing = midiTiming(midiData);

data = timing.tracks[0];
console.log(util.inspect(timing.tracks[0], {showHidden: false, depth: 5, colors: true}));

let sequenceArray = [];
let timingArray = [];
let pauseArray = [];
let prevtime = 0;

let transpositions = [];

data.forEach( sample => {
  if(prevtime === sample.time){
    transpositions.push(Note.fromMidi(sample.noteNumber));
  }
  else{
    sequenceArray.push(Note.fromMidi(sample.noteNumber).toLowerCase());
  }
  prevtime = sample.time;
  timingArray.push(sample.duration.toFixed());
});

output = {
  "name" : outname,
  "direction": 0,
  "sequence:" : sequenceArray,
  "timing" : timingArray,
  "pause" : pauseArray
};

console.log(output);
fs.writeFileSync(outFile, JSON.stringify(output));