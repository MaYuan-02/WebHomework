for(var i = 0; i <= 100; i++){
    console.log(fabonacci(i));
}
    

function fabonacci(num){
    if(num <= 0){
        return "wrong parameter";
    }

    if(num <= 2){
        return 1;
    }else{
        var temp1 = 1;
        var temp2 = 1;
        var result;
        for(var i = 3;i <= num; i++){
            result = temp1 + temp2;
            temp1 = temp2;
            temp2 = result;
        }
        return result;
    }
}