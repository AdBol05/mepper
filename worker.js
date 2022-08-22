/*module.exports = ({ data, logic }) => {
    let output = [];//output data table
    let Lout = '';  //temporary section storage
    data.forEach( sample => {//determine section for each sample 
        if(sample > 0){
            if(sample <= logic.L1 && sample > logic.L2){Lout = 'A';}
            if(sample <= logic.L2 && sample > logic.L3){Lout = 'B';}
            if(sample <= logic.L3 && sample > logic.L4){Lout = 'C';}
            if(sample <= logic.L4 && sample > logic.L5){Lout = 'D';}
            if(sample <= logic.L5 && sample > logic.L6){Lout = 'E';}
            if(sample <= logic.L6 && sample > 0){Lout = 'F';}
        }
        if(sample < 0){
            if(sample >= logic.L7 && sample < 0){Lout = 'G';}
            if(sample >= logic.L8 && sample < logic.L7){Lout = 'H';}
            if(sample >= logic.L9 && sample < logic.L8){Lout = 'I';}
            if(sample >= logic.L10 && sample < logic.L9){Lout = 'J';}
            if(sample >= logic.L11 && sample < logic.L10){Lout = 'K';}
            if(sample >= logic.L12 && sample < logic.L1){Lout = 'L';}
        }
        if(sample === 0) {Lout = 'M'}    
        output.push(Lout);//add resolved section to output table
    });
    return output;
  };*/

   /*
            L1 -> L2 -> L3 -> L4 -> L5 -> L6 -> 0 <- L7 <- L8 <- L9 <- L10 <- L11 <- L12
                                         MAX -> 0 <- MIN
    */



                                        
                                        
                                        
                                         /*c      1912;
                                         cf     1805;
                                         d      1703;
                                         df     1607;
                                         e      1517;
                                         f      1431;
                                         ff     1351;
                                         g      1275;
                                         gf     1203;
                                         a      1136;
                                         af     1072;
                                         b      1012;*/
                                         console.log(Math.floor(1912/2));
                                         console.log(Math.floor(1805/2));
                                         console.log(Math.floor(1703/2));
                                         console.log(Math.floor(1607/2));
                                         console.log(Math.floor(1517/2));
                                         console.log(Math.floor(1431/2));
                                         console.log(Math.floor(1351/2));
                                         console.log(Math.floor(1275/2));
                                         console.log(Math.floor(1203/2));
                                         console.log(Math.floor(1136/2));
                                         console.log(Math.floor(1072/2));
                                         console.log(Math.floor(1012/2));
                                         /*e0     =e*2;
                                         g0     =g*2;
                                         b0     =b*2;
                                         af0    =af*2;
                                         a0     =a*2;
                                         f0     =f*2;*/
                                         
                                         