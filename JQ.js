console.log(1)

$(document).ready(function(){


    console.log(2)
    var result=0;
    var prevEntry=0;
    var operation=null;
    var currentEntry= '0';
    var temp=0;  //holds the length of the first entry
    // updateScreen(result);
    var numberOfOperation=0;
    var secondEntry = '';

  

    $('.button').on('click',function(){
        var buttonPressed = $(this).html();
        console.log(buttonPressed)

    if(buttonPressed === "AC"){
        result=0;
        prevEntry=0;
        operation=null;
        currentEntry= '0';
        temp=0;
        numberOfOperation = 0;
        secondEntry="";
    }
    else if(buttonPressed === "BA"){
        debugger
        //its operator
        if(! noPreviousOperator(currentEntry)){
            numberOfOperation-=1;
            operation = '';
            if(numberOfOperation<=1) secondEntry='';
        }
        
        currentEntry = currentEntry.substring(0,currentEntry.length-1)
        if(numberOfOperation===1) secondEntry= second(temp,currentEntry);
        else if(numberOfOperation===0) secondEntry=== 0;

        if(currentEntry===""){
            result=0;
            prevEntry=0;
            operation=null;
            currentEntry= '0';
            temp=0;
            numberOfOperation = 0;
            secondEntry="";
        }
    }
    else if(isNumber(buttonPressed)){
        
         if (currentEntry==='0')
            currentEntry = buttonPressed;
        else{ 
            if (withinRange(currentEntry))
            currentEntry = currentEntry+buttonPressed
        };
        if(numberOfOperation>=1){
            secondEntry = second(temp,currentEntry)
        }
    }
    else if(isOperator(buttonPressed)){
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
        debugger
        console.log("secondEntry: ",secondEntry)
        
        if(operation === null )
            alert("not possible")

        //check if (operator)=
        else if(!noPreviousOperator(currentEntry)){
            secondEntry = prevEntry;
            currentEntry = operate(prevEntry,secondEntry,operation).toString();
            numberOfOperation-=numberOfOperation;
            prevEntry=parseFloat(currentEntry);
        }
        //check ()=
        else if(operate != null && numberOfOperation === 0){    
            var intCurrentEntry= parseInt(currentEntry);
            prevEntry = operate(prevEntry,secondEntry,operation);
            currentEntry = prevEntry.toString();
        }
        else {
            currentEntry = evaluate(prevEntry,currentEntry,temp,operation)
            numberOfOperation = 0;
            prevEntry = parseFloat(currentEntry);
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

//check if the last entry is operator
noPreviousOperator = function(value){
    return !(isOperator(value.substring(value.length-1,value.length)))
}

evaluate = function (prevEntry,currentEntry,temp,operation){
    var secondEntry = currentEntry.substring(temp+1,currentEntry.length);
    result = operate(prevEntry,secondEntry,operation);
    return result.toString();
}



withinRange = function (val){
    return (val.length <10)    
}

second = function(temp,currentEntry){
   return currentEntry.substring(temp+1,currentEntry.length);
}



