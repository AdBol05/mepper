#include <Arduino.h>

String input = "";
//int out = 0;

void mtr(String ID){
  int step = 0;
  int Delay = 100;
  if(ID == "M"){step = 2;}
  if(ID == "A"){step = 3;}
  if(ID == "B"){step = 4;}
  if(ID == "C"){step = 5;}
  if(ID == "D"){step = 6;}
  if(ID == "E"){step = 7;}
  if(ID == "F"){step = 8;}
  if(ID == "G"){step = 9;}
  if(ID == "H"){step = 10;}
  if(ID == "I"){step = 11;}
  if(ID == "J"){step = 12;}
  if(ID == "K"){step = 13;}
  if(ID == "L"){step = 14;}

  //Serial.print("Step: ");
  //Serial.print(step);
  digitalWrite(step, HIGH);
  delay(Delay);
  digitalWrite(step, LOW);
  delay(Delay);
}

void setup() {
  Serial.begin(9600);
  //Serial.println("welcome");
  for(int i = 2; i <= 14; i++){pinMode(i, OUTPUT);}
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available() > 0) {
    // read the incoming byte:
    input = Serial.readString();
    mtr(input);
  }
}