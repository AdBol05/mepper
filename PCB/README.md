# Read before powering anything up!

The PCB was designed to be flexible when it comes to power:

1) It can be powered by 12V for motors and separate USB power supply for the pi, which would then provide 3.3V for drivers. (I do not recommend this because of the power limitation on the pi's 3.3V rail). You would need to bridge the two solder joints at the bottom of the board labeled "3.3V-RPI_1" and "3.3V-RPI_2" to recieve power from the pi.

2) Or it can be powered by a single ATX power supply (12V for motors, 5V for the pi and 3.3V for drivers).

3) The third option is to power the motors by 12V supply and use the onboard AMS1117 regulator (on the bottom of the board) to power drivers from this power supply and have a separate 5V power for the pi. Join the 3.3V solder joints it this case as well.


### I don't take responsibility for any damage caused by my design.
