# Read before powering anything up!

The PCB was designet to be flexible when it comes to power:

1) It can be powered by 12V for motors and separate USB power supply for the pi, which would then provide 3.3V for drivers. (I do not recommend this because of the power limitation on the pi's 3.3V rail)

2) Or it can be powered by a single ATX power supply (12V for motors, 5V for the pi and 3.3V for drivers). In this case DO NOT connect any 3.3V rail to the raspberry pi!! I don't know if anything will be damaged, but just to be safe.

3) The third option is to power the motors by 12V supply and use the onboard AMS1117 regulator (on the bottom of the board) to power drivers from this power supply and have a separate 5V power for the pi. In this case DO NOT connect 3.3V to the pi either!

### I don't take any responsibilies on any damage caused by my PCB.