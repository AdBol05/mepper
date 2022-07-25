module.exports = ({ data, logic }) => {
    let output = [];//output data table
    let Lout = '';  //temporary section storage
    data.forEach( sample => {//determine section for each sample 
        if(sample > 0){
            if(sample <= logic.L1 && sample > logic.L2){Lout = '1';}
            if(sample <= logic.L2 && sample > logic.L3){Lout = '2';}
            if(sample <= logic.L3 && sample > logic.L4){Lout = '3';}
            if(sample <= logic.L4 && sample > logic.L5){Lout = '4';}
            if(sample <= logic.L5 && sample > logic.L6){Lout = '5';}
            if(sample <= logic.L6 && sample > 0){Lout = '6';}
        }
        if(sample < 0){
            if(sample >= logic.L7 && sample < 0){Lout = '7';}
            if(sample >= logic.L8 && sample < logic.L7){Lout = '8';}
            if(sample >= logic.L9 && sample < logic.L8){Lout = '9';}
            if(sample >= logic.L10 && sample < logic.L9){Lout = '10';}
            if(sample >= logic.L11 && sample < logic.L10){Lout = '11';}
            if(sample >= logic.L12 && sample < logic.L1){Lout = '12';}
        }
        if(sample === 0) {Lout = '0'}    
        output.push(Lout);//add resolved section to output table
    });
    return output;
  };

   /*
            L1 -> L2 -> L3 -> L4 -> L5 -> L6 -> 0 <- L7 <- L8 <- L9 <- L10 <- L11 <- L12
                                         MAX -> 0 <- MIN
    */