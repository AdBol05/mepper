//var pcm = require('pcm');
//var mtr = require('./mtr.js');
var path = require('path');
const Mp32Wav = require('mp3-to-wav');
const ap = require('audio-processing');

const args = process.argv.slice(2);//process arguments
var inFile = args[0] //input filename
var outFile = inFile.replace(".mp3", ".json");//output filename
var name = ""; //name to be writteno into output file
if (args[1] === undefined){name = inFile.replace(".mp3", "")}//if not defined, name should be the same as filename of input file
else{name = args[1];}

//var table = []; //pcm data table

//welcome screen
console.log('\x1b[32m%s\x1b[0m',"   ____ ___  ___  ____  ____  ___  _____      ");
console.log('\x1b[32m%s\x1b[0m',"  / __ `__ \\/ _ \\/ __ \\/ __ \\/ _ \\/ ___/ ");
console.log('\x1b[32m%s\x1b[0m'," / / / / / /  __/ /_/ / /_/ /  __/ /          ");
console.log('\x1b[32m%s\x1b[0m',"/_/ /_/ /_/\\___/ .___/ .___/\\___/_/         ");
console.log('\x1b[32m%s\x1b[0m',"              /_/   /_/                       \n");

async function prepare(inFile){
  if(inFile === undefined || outFile === undefined){console.error('\x1b[31m%s\x1b[0m',"ERROR: input or output filename not provided"); process.exit(9);}
  if(!inFile.endsWith(".mp3") && !inFile.endsWith(".wav")){console.error('\x1b[31m%s\x1b[0m',"ERROR: input file format not supported (expected .wav or .mp3 file)"); process.exit(1);}
  if(inFile.endsWith(".mp3")){console.log("Converting to .wav file..."); await new Mp32Wav(path.resolve(inFile)).exec();}
}

async function audio(wavfile){
  let audio = await ap.readAudio(wavfile);
  let data = new Float32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
  let freq_data = await ap.fft(data)
  //console.log(freq_data);
  console.log(ap.ifft(freq_data.real, freq_data.imag));
  
}

let wavfile = path.resolve(inFile).replace(".mp3", ".wav");
console.log(wavfile);

prepare(inFile).then(() => {audio(wavfile);}); 


/*
console.log('\nResolving PCM data from ' + inFile + '...');

var min = 0;
var max = 0;
var samplerate = 50;//PCM sample rate

pcm.getPcmData(inFile, {stereo: true, sampleRate: samplerate },
    function(sample) {// Sample is from [-1.0...1.0], channel is 0 for left and 1 for right
    table.push(sample);//add sample to tablefind the right samplerate
    min = Math.min(min, sample);//get min and max values
    max = Math.max(max, sample);
  },
  function(err) {
    if (err){throw new Error(err);}
    console.log(table);
    console.log("Min: " + min + " Max: " + max);
    let delay = 1000/samplerate/4;//resolve delay between motor steps (WIP...)
    mtr(min, max, outFile, table, delay, name); //launch mtr.js and pass min, max output filename and pcm data table to it
  }
);*/