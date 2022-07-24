# mepper
mp3 to 12 stepper motors translation script

# Usage
Paste desired mp3 to script's directory and run index.js with it's name as the first argument and output file name as the second argument.
Example:

    node index.js input.mp3 output.json

The created file can then be used to drive the stepper motors.

        node uploader.js output.json COM1

# index.js
Decodes the mp3 file to pcm data and splits the decoded waveform into "horizontal" sections. Then determines the motor sequence based on these sections.

# uploader.js
uploader.js is used to send the motor data to an arduino or any other microcontroller, which controlls the stepper motors.

# NOTE: This script has not been tested in any way yet!!!

Arduino firmware coming soon...