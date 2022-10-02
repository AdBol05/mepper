//Work in progress -> might be a piece of junk
const fs = require('fs');
const util = require('util');
//const { Midi } = require('@tonejs/midi');
var midiTiming = require('./midi');

const args = process.argv.slice(2);//process arguments
var inFile = args[0] //input filename
var outFile = inFile.replace(".mid", ".json");//output filename
var outnamename = ""; //name to be writteno into output file
if (args[1] === undefined){outnamename = inFile.replace(".mp3", "")}//if not defined, name should be the same as filename of input file
else{outnamename = args[1];}

//welcome screen
console.log('\x1b[32m%s\x1b[0m',"   ____ ___  ___  ____  ____  ___  _____      ");
console.log('\x1b[32m%s\x1b[0m',"  / __ `__ \\/ _ \\/ __ \\/ __ \\/ _ \\/ ___/ ");
console.log('\x1b[32m%s\x1b[0m'," / / / / / /  __/ /_/ / /_/ /  __/ /          ");
console.log('\x1b[32m%s\x1b[0m',"/_/ /_/ /_/\\___/ .___/ .___/\\___/_/         ");
console.log('\x1b[32m%s\x1b[0m',"              /_/   /_/                       \n");

if(args[0] === undefined){console.log('\x1b[31m%s\x1b[0m',"ERROR: Input file path not provided"); process.exit(9);}

var midiData = fs.readFileSync(args[0], 'binary');
var timing = midiTiming(midiData);

console.log(util.inspect(timing.tracks[0], {showHidden: false, depth: 5, colors: true}));

//var tempoMap = getTempoMap(jsonSong);
//var musicTracks = getMusicTracks(jsonSong.tracks);

/*
const midiData = fs.readFileSync(args[0]);
const midi = new Midi(midiData);

notearray = midi.tracks[2].notes;
console.log(notearray);
fs.writeFileSync(outFile, JSON.stringify(notearray));
*/

//console.log(util.inspect(midi.tracks[2].notes, {showHidden: false, depth: 5, colors: true}));