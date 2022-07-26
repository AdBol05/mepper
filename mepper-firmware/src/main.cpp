#include <Arduino.h>

String input = "";

void mtr(String ID){
  int step = 0;
  int Delay = 10;//TODO: find the right timing
  if(ID == "M"){step = 13;}//integrated LED -> silence

  if(ID == "A"){step = 22;}
  if(ID == "B"){step = 23;}
  if(ID == "C"){step = 24;}

  if(ID == "D"){step = 25;}
  if(ID == "E"){step = 26;}
  if(ID == "F"){step = 27;}

  if(ID == "G"){step = 28;}
  if(ID == "H"){step = 29;}
  if(ID == "I"){step = 30;}

  if(ID == "J"){step = 31;}
  if(ID == "K"){step = 32;}
  if(ID == "L"){step = 33;}

  digitalWrite(step, HIGH);
  delay(Delay);
  digitalWrite(step, LOW);
  delay(Delay);
  Serial.println(1);
}

void setup() {
  Serial.begin(250000);
  pinMode(13, OUTPUT);
  for(int i = 22; i <= 32; i++){pinMode(i, OUTPUT);}
}

void loop() {
  input = Serial.readString();
  mtr(input);
}