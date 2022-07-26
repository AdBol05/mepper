var pcm = require('pcm');
var mtr = require('./mtr.js');

const args = process.argv.slice(2);//process arguments
var inFile = args[0] //input filename
var outFile = args[1]//output filename

var table = []; //pcm data table

//welcome screen
console.log('\x1b[32m%s\x1b[0m',"   ____ ___  ___  ____  ____  ___  _____      ");
console.log('\x1b[32m%s\x1b[0m',"  / __ `__ \\/ _ \\/ __ \\/ __ \\/ _ \\/ ___/ ");
console.log('\x1b[32m%s\x1b[0m'," / / / / / /  __/ /_/ / /_/ /  __/ /          ");
console.log('\x1b[32m%s\x1b[0m',"/_/ /_/ /_/\\___/ .___/ .___/\\___/_/         ");
console.log('\x1b[32m%s\x1b[0m',"              /_/   /_/                       ");

//input check
if(inFile === undefined || outFile === undefined){console.error('\x1b[31m%s\x1b[0m',"ERROR: input or output filename not provided"); process.exit(9);}

console.log('\nResolving PCM data from ' + inFile + '...');

var min = 0;
var max = 0;

pcm.getPcmData(inFile, {stereo: true, sampleRate: 180 },
    function(sample) {// Sample is from [-1.0...1.0], channel is 0 for left and 1 for right
    table.push(sample);//add sample to table
    min = Math.min(min, sample);//get min and max values
    max = Math.max(max, sample);
  },
  function(err) {
    if (err){throw new Error(err);}
    console.log(table);
    console.log("Min: " + min + " Max: " + max);
    mtr(min, max, outFile, table); //launch mtr.js and pass min, max output filename and pcm data table to it
  }
);