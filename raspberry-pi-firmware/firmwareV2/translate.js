let tempo = 120;
let oct = 5;

module.exports = (input) => {

    let data = {
        "pin": [],
        "action": []
    };

    for(i in input){
        let delay = notemap.get(input.sequence[i] * oct);
        let count = Math.floor((duration * 5 * tempo) / delay);
        for(i = 0; i < count; i++){} 
    }

    return data;
};