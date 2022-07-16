//const Fourier = require('fourier');
const AsciiBar = require('ascii-bar').default;

module.exports = function(data) {
  console.log("processing frequencies...");
    var N = data.length;
    var frequencies = [];

    const bar = new AsciiBar({
      undoneSymbol: "-",
      doneSymbol: ">",
      width: 20,
      formatString: '#count #bar',
      total: data.length,
      //enableSpinner: false,
      //lastUpdateForTiming: false,
      autoStop : false,
      //print: true,
      //start: 0,
      //startDate: new Date().getTime(),
      stream: process.stdout,
      //hideCursor: false,
    });

    // for every frequency...
    for (var freq = 0; freq < N; freq++) {     
        var re = 0;
        var im = 0;

        bar.update(freq);

        // for every point in time...
        for (var t = 0; t < N; t++) {

            // Spin the signal _backwards_ at each frequency (as radians/s, not Hertz)
            var rate = -1 * (2 * Math.PI) * freq;

            // How far around the circle have we gone at time=t?
            var time = t / N;
            var distance = rate * time;

            // datapoint * e^(-i*2*pi*f) is complex, store each part
            var re_part = parseFloat(data[t]) * Math.cos(distance);
            var im_part = parseFloat(data[t]) * Math.sin(distance);

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
/*
console.log("freq");
console.log(Fourier.Transform);*/