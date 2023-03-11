![logo_green](https://user-images.githubusercontent.com/98588523/194335228-4940c632-fed4-4666-a9ba-6ba85d1c5870.png)
# mepper
music stepper motor driver and interpreter 

# Before use
You need to install all dependencies

    npm i 

# Usage
Paste desired midi file into the script's directory and run index.js with it's path as the first argument. Optionaly you can set a different display name (stored inside the file and then printed by firmware) as the second argument.

    node index.js input.mid test

The created file can then be used to drive the stepper motors.

Ouptut.json
```json
{
    "name": "test",                     <-- name which will be printed to stdout 
    "direction": 0,                     <-- motor rotation direction
    "sequence": ["c","cf","d","df"],    <-- sequence of notes
    "timing": [250, 500, 250, 250],     <-- duration of note
    "pause": [0, 0, 100, 0]             <-- pause after a note
}
```

# index.js
(work in progress) Should convert a midi file to a json, which will be used by firmware.
Based on midi-timing by kevin-roak: https://github.com/kevin-roark/midi-timing

# firmware.js
Firmware is meant for a raspberry pi. Rotates motor according to data from json file.

    node firmware.js input.json

# Hardware
-Raspberry pi (I suggest gen 3 or newer)

-12 stepper motors

-12 stepper motor drivers (I used A4988)

-Adequate power supply (12V for motors + 5V for raspberry pi +3.3V for drivers). In case you use the mepper driver PCB you can hook it up to an ATX power supply, which will power the motors, drivers and the raspberry pi via an ATX 24 pin connector.

# NOTE: This project has not been appropriately tested and is still in development! (MIDI interpreter is still in an early phase of development) Any feedback or suggestion is welcome.
