var pcm = require('pcm');
var fs = require('fs');

var mtr = require('./mtr.js');

const args = process.argv.slice(2);
var inFile = args[0]
var outFile = args[1]

var table = [];
                                        
console.log('\x1b[32m%s\x1b[0m',"   ____ ___  ___  ____  ____  ___  _____      ");
console.log('\x1b[32m%s\x1b[0m',"  / __ `__ \\/ _ \\/ __ \\/ __ \\/ _ \\/ ___/ ");
console.log('\x1b[32m%s\x1b[0m'," / / / / / /  __/ /_/ / /_/ /  __/ /          ");
console.log('\x1b[32m%s\x1b[0m',"/_/ /_/ /_/\\___/ .___/ .___/\\___/_/         ");
console.log('\x1b[32m%s\x1b[0m',"              /_/   /_/                       ");

if(inFile === undefined || outFile === undefined){console.error('\x1b[31m%s\x1b[0m',"ERROR: input or output filename not provided"); process.exit(9);}

console.log('\nResolving PCM data...');

var min = 0;
var max = 0;

pcm.getPcmData(inFile, {stereo: true, sampleRate: 44100 },
    function(sample, channel) {// Sample is from [-1.0...1.0], channel is 0 for left and 1 for right
    sample = parseFloat(sample.toFixed(22));
    table.push(sample);
    min = Math.min(min, sample);
    max = Math.max(max, sample);
  },
  function(err, output) {
    if (err)
      throw new Error(err);
    console.log(table);
    console.log("Min: " + min + " Max: " + max);
    //fs.writeFileSync("pcm.json",JSON.stringify(table), function(err){console.error(err)});
    //console.log('PCM data written to pcm.json');
    var mtr_out = mtr(min, max, table);
    fs.writeFileSync(outFile,JSON.stringify(mtr_out), function(err){console.error(err)});
    console.log('Output written to ' + outFile);
  }
);