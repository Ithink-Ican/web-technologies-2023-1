function spinWords(string){
    string = Array.from(string);
    console.log(string);
    let start = null, end = null;
    for (let i = 0; i < string.length; i++){
        if(string[i] !== " "){
            if(start == null){
                start = i;
            }   
        }
        else{
            if(start !== null){
                end = i - 1;
                if(end - start + 1 >= 5){
                    for(let j = start; j < (end/2|0) + 1; j++){
                        [string[j], string[end-j]] = [string[end-j], string[j]];
                    }
                }
                start = null, end = null;
            }
        }
    }
    return string.join("");
}

const result1 = spinWords( "Привет от Legacy" )
console.log(result1) // тевирП от ycageL

const result2 = spinWords( "This is a test" )
console.log(result2) // This is a test