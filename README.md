![image](https://user-images.githubusercontent.com/98588523/152417709-2008e586-28c6-4f2a-9e84-af8307ac01b9.png)

# mepper
music stepper motor driver and interpreter 

# Before use
You need to install all dependencies

    npm i 

# Usage
Paste desired midi file into the script's directory and run index.js with it's name as the first argument and name (name to be stored inside the file and which will be then printed by firmware) as the second argument.

    node index.js input.mp3 test

The created file can then be used to drive the stepper motors.

Ouptut.json
```json
{
    "name": "test",                     <-- name which will be printed to stdout 
    "direction": 0,                     <-- motor rotation direction
    "sequence": ["c","cf","d","df"],    <-- sequence of notes
    "timing": [250, 500, 250, 250],     <-- duration of note
    "pause": [0, 0, 100, 0]             <-- pause between notes
}
```

# index.js
Determines notes from a given file. Should resolve notes from a midi file.

# firmware.js
Firmware is meant for a raspberry pi. It takes a json file and extracts all data from it. Motors are then controlled based on the sequence stored in the json file.

    node firmware.js input.json

# Hardware
-Raspberry pi (I suggest gen 3 or newer)

-12 stepper motors

-12 stepper motor drivers (I used A4988)

-Adequate power supply (12V for motors + 5V for raspberry pi +3.3V for drivers). In case you use the mepper driver PCB you can hook it up to an ATX power supply, which will power the motors, drivers and the raspberry pi via an ATX 24 pin connector.

# NOTE: This project has not been appropriately tested and is still in development! (Firmware is not able to play more notes simultaneously and midi interpreter is in development) Any feedback or suggestion is welcome.