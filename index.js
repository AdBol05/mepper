var pcm = require('pcm');
var fs = require('fs');
//const Fourier = require('fourier');

//var dft = require('./dft.js');
//var fft = require('fft-js').fft;
var mtr = require('./mtr.js');

var table = [];

//MP3 to PCM
console.log('Resolving PCM data...');

var min = 0;
var max = 0;

pcm.getPcmData('test.mp3', {stereo: true, smaplerate: 44100 },
    function(sample, channel) {
    // Sample is from [-1.0...1.0], channel is 0 for left and 1 for right
    //console.log(sample);
    sample = parseFloat(sample.toFixed(22));
    //console.log(sample);
    table.push(sample);
    min = Math.min(min, sample);
    max = Math.max(max, sample);
  },
  function(err, output) {
    if (err)
      throw new Error(err);
    //console.log('min=' + min + ', max=' + max);
    console.log(table);
    console.log("Min: " + min + " Max: " + max);
    //table_out = table.toString("utf-8");
    //table_out = table_out.replaceAll(",", "\n");
    fs.writeFileSync("pcm.json",JSON.stringify(table), function(err){console.error(err)});
    console.log('PCM data written to pcm.json');
    var mtr_out = mtr(min, max, table);
    console.log(mtr_out);
    fs.writeFileSync("mtr.json",JSON.stringify(mtr_out), function(err){console.error(err)});
    console.log('Output written to mtr.json');
  }
);
//MP3 to PCM