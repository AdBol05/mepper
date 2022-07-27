# mepper
mp3 to 12 stepper motors translation script

# Before use
You need to install all dependencies as well as ffmpeg.

# Usage
Paste desired mp3 to script's directory and run index.js with it's name as the first argument and output file name as the second argument.

    node index.js input.mp3 output.json

The created file can then be used to drive the stepper motors.

# index.js
Decodes the mp3 file to pcm data and splits the decoded waveform into "horizontal sections". Then determines the motor sequence based on these sections.

# NOTE: This project has not been appropriately tested and is still in development!!! Any feedback or suggestion is welcome.