# mepper
mp3 to 12 stepper motors translation script

# Usage
Paste desired mp3 to script's directory, rename it to input.mp3 and run index.js
The script should output mtr.json(motor sequence), pcm.json(raw pcm data), and mtr_cnt.json(count of each motor's steps). mtr.json can be then used to drive these stepper motors.

# index.js
Decodes the mp3 file to pcm data and splits the decoded waveform into "horizontal" sections. Then determines the motor sequence based in these sections.

# uploader.js
uploader.js is used to send the motor data to an arduino or any other microcontroller, which controlls the stepper motors.