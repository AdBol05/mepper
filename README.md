# mepper
mp3 to 12 stepper motors translation script

# Usage
Paste desired mp3 to script's directory and run index.js with it's name as the first argument and output file name as the second argument.

    node index.js input.mp3 output.json

The created file can then be used to drive the stepper motors. Run uploader.js with json file and port number as arguments. Optionally you can set custom baud rate as a third argument(9600 is default, firmware is set to 250000).

    node uploader.js output.json /dev/ttyUSB0 250000

# index.js
Decodes the mp3 file to pcm data and splits the decoded waveform into "horizontal sections". Then determines the motor sequence based on these sections.

# uploader.js
uploader.js is used to send the motor data to an arduino or any other microcontroller, which controlls the stepper motors.

# NOTE: This project has not been appropriately tested and is still in development!!! Any feedback or suggestion is welcome.