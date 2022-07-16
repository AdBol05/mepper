var pcm = require('pcm');
var fs = require('fs');
const Fourier = require('fourier');

var dft = require('./dft.js');

var table = [];

//MP3 to PCM
console.log('Resolving PCM data...');

pcm.getPcmData('test.mp3', {stereo: true, smaplerate: 44100 },
    function(sample, channel) {
    // Sample is from [-1.0...1.0], channel is 0 for left and 1 for right
    //console.log(sample);
    sample = sample.toFixed(22);
    //console.log(sample);
    table.push(sample);
    /*min = Math.min(min, sample);
    max = Math.max(max, sample);*/
  },
  function(err, output) {
    if (err)
      throw new Error(err);
    //console.log('min=' + min + ', max=' + max);
    console.log(table);
    /*table_out = table.toString("utf-8");
    table_out = table_out.replaceAll(",", "\n");
    fs.writeFile('pcm.csv', table_out, 'utf-8', function(err){console.error(err)});
    console.log('Data written to pcm.csv');*/
    console.log(dft(table));
  }
);
//MP3 to PCM