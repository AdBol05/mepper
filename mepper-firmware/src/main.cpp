#include <Arduino.h>

int input = 0;

void mtr(int ID, int Delay){
  digitalWrite(ID, HIGH);
  delay(Delay);
  digitalWrite(ID, LOW);
  delay(Delay);
}

void setup() {
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available() > 0) {
    // read the incoming byte:
    input = Serial.read();
    mtr(input, 1);
  }
}