var pcm = require('pcm');
var fs = require('fs');
const Fourier = require('fourier');

var dft = require('./dft.js');

var table = [];

/*
//PCM to frequency
Fourier.Transform = function(data) {
  var N = data.length;
  var frequencies = [];

  // for every frequency...
  for (var freq = 0; freq < N; freq++) {     
      var re = 0;
      var im = 0;

      // for every point in time...
      for (var t = 0; t < N; t++) {
          // Spin the signal _backwards_ at each frequency (as radians/s, not Hertz)
          var rate = -1 * (2 * Math.PI) * freq;
          // How far around the circle have we gone at time=t?
          var time = t / N;
          var distance = rate * time;
          // datapoint * e^(-i*2*pi*f) is complex, store each part
          var re_part = data[t] * Math.cos(distance);
          var im_part = data[t] * Math.sin(distance);
          // add this data point's contribution
          re += re_part;
          im += im_part;
      }

      // Close to zero? You're zero.
      if (Math.abs(re) < 1e-10) { re = 0; }
      if (Math.abs(im) < 1e-10) { im = 0; }
      // Average contribution at this frequency
      re = re / N;
      im = im / N;

      frequencies[freq] = {
          re: re,
          im: im,
          freq: freq,
          amp: Math.sqrt(re*re + im*im),
          phase: Math.atan2(im, re) * 180 / Math.PI     // in degrees
      };
  }
  return frequencies;
}
//PCM to frequency
*/

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
    fs.writeFile('pcm.csv', table_out, 'utf-8', function(err){console.error(err)});*/
    console.log('Data written to pcm.csv');
    console.log(dft(table));
  }
);
//MP3 to PCM