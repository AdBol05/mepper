//Work in progress -> might be a piece of junk

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
