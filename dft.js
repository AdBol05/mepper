/*-import ComplexNumber from '../complex-number/ComplexNumber';

const CLOSE_TO_ZERO_THRESHOLD = 1e-10;
-*/
/**
 * Discrete Fourier Transform (DFT): time to frequencies.
 *
 * Time complexity: O(N^2)
 *
 * @param {number[]} inputAmplitudes - Input signal amplitudes over time (complex
 * numbers with real parts only).
 * @param {number} zeroThreshold - Threshold that is used to convert real and imaginary numbers
 * to zero in case if they are smaller then this.
 *
 * @return {ComplexNumber[]} - Array of complex number. Each of the number represents the frequency
 * or signal. All signals together will form input signal over discrete time periods. Each signal's
 * complex number has radius (amplitude) and phase (angle) in polar form that describes the signal.
 *
 * @see https://gist.github.com/anonymous/129d477ddb1c8025c9ac
 * @see https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/
 */
/*-
export default function dft(inputAmplitudes, zeroThreshold = CLOSE_TO_ZERO_THRESHOLD) {
  const N = inputAmplitudes.length;
  const signals = [];

  // Go through every discrete frequency.
  for (let frequency = 0; frequency < N; frequency += 1) {
    // Compound signal at current frequency that will ultimately
    // take part in forming input amplitudes.
    let frequencySignal = new ComplexNumber();

    // Go through every discrete point in time.
    for (let timer = 0; timer < N; timer += 1) {
      const currentAmplitude = inputAmplitudes[timer];

      // Calculate rotation angle.
      const rotationAngle = -1 * (2 * Math.PI) * frequency * (timer / N);

      // Remember that e^ix = cos(x) + i * sin(x);
      const dataPointContribution = new ComplexNumber({
        re: Math.cos(rotationAngle),
        im: Math.sin(rotationAngle),
      }).multiply(currentAmplitude);

      // Add this data point's contribution.
      frequencySignal = frequencySignal.add(dataPointContribution);
    }

    // Close to zero? You're zero.
    if (Math.abs(frequencySignal.re) < zeroThreshold) {
      frequencySignal.re = 0;
    }

    if (Math.abs(frequencySignal.im) < zeroThreshold) {
      frequencySignal.im = 0;
    }

    // Average contribution at this frequency.
    // The 1/N factor is usually moved to the reverse transform (going from frequencies
    // back to time). This is allowed, though it would be nice to have 1/N in the forward
    // transform since it gives the actual sizes for the time spikes.
    frequencySignal = frequencySignal.divide(N);

    // Add current frequency signal to the list of compound signals.
    signals[frequency] = frequencySignal;
  }

  return signals;
}
-*/
const Fourier = require('fourier');

module.exports = function(data) {
  console.log("processing frequencies...");
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
/*
console.log("freq");
console.log(Fourier.Transform);*/