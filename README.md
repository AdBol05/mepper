![image](https://user-images.githubusercontent.com/98588523/152417709-2008e586-28c6-4f2a-9e84-af8307ac01b9.png)

# mepper
mp3 to 12 stepper motors translation script

# Before use
You need to install all dependencies as well as ffmpeg.

# Usage
Paste desired mp3 to script's directory and run index.js with it's name as the first argument and name (not filename but name to be stored inside the file) as the second argument.

    node index.js input.mp3 test

The created file can then be used to drive the stepper motors.

Ouptut.json
```json
{
    "name": "test",                     <-- name which will be printed to stdout 
    "direction": 0,                     <-- motor rotation direction (0=left 1=right)
    "sequence": ["c","cf","d","df"],    <-- sequence of notes
    "timing": [250, 500, 250, 250],     <-- duration of note
    "pause": [0, 0 100, 0]              <-- pause between notes
}
```

# index.js
Decodes the mp3 file to pcm data and splits the decoded waveform into "horizontal sections". Then determines the motor sequence based on these sections.

# firmware.js
Firmware is meant for a raspberry pi. It takes a json file and extracts all data from it. Motors are then controlled based on the sequence stored in the json file.

    node firmware.js input.json

# Hardware
-Raspberry pi (I suggest gen 3 or newer)

-12 stepper motors

-12 stepper motor drivers (I used A4988)

-Adequate power supply (12V for motors + 5V for raspberry pi +3.3V for drivers). In case you use the mepper driver PCB you can hook it up to an ATX power supply, which will power the motors, drivers and the raspberry pi via an ATX 24 pin connector.

# NOTE: This project has not been appropriately tested and is still in development(does not work at all yet) and some information in this README may not be up to date! Any feedback or suggestion is welcome.