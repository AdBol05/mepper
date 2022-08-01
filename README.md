# mepper
mp3 to 12 stepper motors translation script

# Before use
You need to install all dependencies as well as ffmpeg.

# Usage
Paste desired mp3 to script's directory and run index.js with it's name as the first argument and name (not filename but name to be stored inside the file) as the second argument.

    node index.js input.mp3 test

The created file can then be used to drive the stepper motors.

# index.js
Decodes the mp3 file to pcm data and splits the decoded waveform into "horizontal sections". Then determines the motor sequence based on these sections.

# firmware.js
Firmware is meant to be ran on a raspberry pi. It takes a json file and extracts all data from it. Motors are then controlled based on the sequence stored in the json file.

    node firmware.js input.json

# Hardware
-Raspberry pi (I suggest gen 3 or newer)
-12 stepper motors
-12 stepper motor drivers (I used A4988)
-Adequate power supply (12V for motrs + 5V for raspberry pi)

# NOTE: This project has not been appropriately tested and is still in development!!! Any feedback or suggestion is welcome.