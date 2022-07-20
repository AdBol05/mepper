var pcm = require('pcm');
var fs = require('fs');

var mtr = require('./mtr.js');

var table = [];

console.log('Resolving PCM data...');

var min = 0;
var max = 0;

pcm.getPcmData('input.mp3', {stereo: true, sampleRate: 44100 },
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
    fs.writeFileSync("pcm.json",JSON.stringify(table), function(err){console.error(err)});
    console.log('PCM data written to pcm.json');
    var mtr_out = mtr(min, max, table);
    fs.writeFileSync("mtr.json",JSON.stringify(mtr_out), function(err){console.error(err)});
    console.log('Output written to mtr.json');
  }
);