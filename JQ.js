console.log(1)

$(document).ready(function(){


    console.log(2)
    var result=0;
    var prevEntry=0;
    var operation=null;
    var currentEntry= '0';
    var temp=0;
    // updateScreen(result);
    var numberOfOperation=0;

  

    $('.button').on('click',function(){
        var buttonPressed = $(this).html();
        console.log(buttonPressed)

    if(buttonPressed === "AC"){
         result=0;
        prevEntry=0;
        operation=null;
        currentEntry= '0';
        temp=0;
    }
    else if(buttonPressed === "BA"){
       currentEntry = currentEntry.substring(0,currentEntry.length-1)
    }
    else if(isNumber(buttonPressed)){
        if (currentEntry==='0')
            currentEntry = buttonPressed;
        else{ 
            if (withinRange(currentEntry))
            currentEntry = currentEntry+buttonPressed
        };
    }
    else if(isOperator(buttonPressed)){
        
        console.log("current entry in is operator :" , currentEntry)
        if(noPreviousOperator(currentEntry)){
           
            numberOfOperation+= 1;
            console.log("checking. number: ",numberOfOperation)
            if (numberOfOperation>1){
                console.log(" reached before the evaluate",currentEntry)
                currentEntry = evaluate(prevEntry,currentEntry,temp,operation)
                updateScreen(currentEntry);
                numberOfOperation = 1;
            }

            
                prevEntry = parseFloat(currentEntry);
                operation=buttonPressed;
                // currentEntry='';
                temp= currentEntry.length;
                currentEntry = currentEntry+operation;
        }
    }
    else if(buttonPressed === "%"){
        prevEntry = parseFloat(currentEntry)
        prevEntry=prevEntry/100;
        currentEntry= prevEntry.toString();
    }
    else if(buttonPressed === "."){
        currentEntry += ".";
    }
    


    // numer (operator = NAN)   fix this
    else if(buttonPressed === "="){ 
        if(operation === null || !noPreviousOperator)
            alert("no possible")
        else {
            console.log(currentEntry.length , temp)
        
            currentEntry = evaluate(prevEntry,currentEntry,temp,operation)
            console.log("after :" , currentEntry)
            // currentEntry = currentEntry.substring(0,10);
            console.log("after,after :" , currentEntry)
            numberOfOperation = 0;
        }
    }
    updateScreen(currentEntry);
    // console.log("screen is : ",currentEntry);
})

})

isNumber = function(value){
    // if (isNaN(value)) alert("here")
    return !isNaN(value);
}

isOperator = function(value){
    return ( value ==='/' || value === '*' || value ==='-' ||value ==='+')
}

operate = function (a, b,operator){
    b = parseFloat(b);
    if(operator === '/') return a/b;
    if(operator === '*') return a*b;
    if(operator === '-') return a-b;
    if(operator === '+'){
     return a+b;
    }
}

updateScreen = function(displayVal){
    
    $('.screen').html(displayVal.substring(0,10));
}

noPreviousOperator = function(value){
    return !(isOperator(value.substring(value.length-1,value.length)))
}

evaluate = function (prevEntry,currentEntry,temp,operation){
    var secondEntry = currentEntry.substring(temp+1,currentEntry.length);
    result = operate(prevEntry,secondEntry,operation);
    console.log("evaluate: " , result)
    console.log("evaluate string: " , result.toString())
    return result.toString();
}



withinRange = function (val){
    return (val.length <10)    
}

