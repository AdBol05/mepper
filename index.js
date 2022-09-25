//Work in progress -> might be a piece of junk
const fs = require('fs');
var parseMidi = require('midi-file').parseMidi
var writeMidi = require('midi-file').writeMidi

const args = process.argv.slice(2);//process arguments
var inFile = args[0] //input filename
var outFile = inFile.replace(".mid", ".json");//output filename
var name = ""; //name to be writteno into output file
if (args[1] === undefined){name = inFile.replace(".mp3", "")}//if not defined, name should be the same as filename of input file
else{name = args[1];}

//welcome screen
console.log('\x1b[32m%s\x1b[0m',"   ____ ___  ___  ____  ____  ___  _____      ");
console.log('\x1b[32m%s\x1b[0m',"  / __ `__ \\/ _ \\/ __ \\/ __ \\/ _ \\/ ___/ ");
console.log('\x1b[32m%s\x1b[0m'," / / / / / /  __/ /_/ / /_/ /  __/ /          ");
console.log('\x1b[32m%s\x1b[0m',"/_/ /_/ /_/\\___/ .___/ .___/\\___/_/         ");
console.log('\x1b[32m%s\x1b[0m',"              /_/   /_/                       \n");

if(args[0] === undefined){console.log('\x1b[31m%s\x1b[0m',"ERROR: Input file path not provided"); process.exit(9);}


const input = fs.readFileSync(args[0]);
var parsed = parseMidi(input)

console.log(parsed.tracks);