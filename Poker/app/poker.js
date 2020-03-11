var poker_info = [];

function get_number_list(poker_list){
    var temp = poker_list.split(" ");
    for(var i = 0; i<temp.length; i++){
        temp[i] = temp[i][0];
    }
    var num_temp = [];
    for(var i = 0; i< temp.length; i++){
        switch(temp[i]){
            case "2":{
                num_temp.push(0);
                break;
            }
            case "3":{
                num_temp.push(1);
                break;
            }
            case "4":{
                num_temp.push(2);
                break;
            }
            case "5":{
                num_temp.push(3);
                break;
            }
            case "6":{
                num_temp.push(4);
                break;
            }
            case "7":{
                num_temp.push(5);
                break;
            }
            case "8":{
                num_temp.push(6);
                break;
            }
            case "9":{
                num_temp.push(7);
                break;
            }
            case "T":{
                num_temp.push(8);
                break;
            }
            case "J":{
                num_temp.push(9);
                break;
            }
            case "Q":{
                num_temp.push(10);
                break;
            }
            case "K":{
                num_temp.push(11);
                break;
            }
            case "A":{
                num_temp.push(12);
                break;
            }
        }
    }
    var result = num_temp.sort(function(a, b){return a - b});
    return result;
}

function get_suit_list(poker_list){
    var temp = poker_list.split(" ");
    for(var i = 0; i<temp.length; i++){
        temp[i] = temp[i][1];
    }
    return temp;
}

// 散牌--1
// 对子--2--
// 两对--3--
// 三条--4--
// 顺子--5--
// 同花--6--
// 葫芦--7--
// 铁支--8--
// 同花顺--9--
function get_poker_type(number_list,suit_list,info_tag){
    var flag5 = 1;
    var flag6 = 1;

    for(var i = 1; i< suit_list.length; i++){

        //判断是不是同花
        if(suit_list[i] != suit_list[i-1]){
            flag6 = 0;
        }

        //判断是不是顺子
        if(number_list[i] - 1 != number_list[i-1]){
            flag5 = 0;
        }   
    }

    if(flag5 == 1 && flag6 == 1){
        if(info_tag ==1 || info_tag == 0){
            poker_info[info_tag].push(number_list[4]);
        }
        return 9;
    }
    else if(flag5 ==1){
        if(info_tag ==1 || info_tag == 0){
            poker_info[info_tag].push(number_list[4]);
        }
        return 5;
    }
    else if(flag6 == 1){
        return 6;
    }

    //判断是不是铁支
    for(var i = 0; i< number_list.length - 3; i ++){
        if(number_list[i] == number_list[i+1] && number_list[i+1] == number_list[i+2] && number_list[i+2] == number_list[i+3]){
            if(info_tag ==1 || info_tag == 0){
                poker_info[info_tag].push(number_list[i]);
            }
            if(i == 0 && (info_tag ==1 || info_tag == 0)){
                poker_info[info_tag].push(number_list[4]);
            }
            else if(i == 1 && (info_tag ==1 || info_tag == 0)){
                poker_info[info_tag].push(number_list[0]);
            }
            return 8;
        }
    }

    //判断有没有三条
    var flag4 = 0;
    for(var i = 0; i < number_list.length-2; i ++){
        if(number_list[i]== number_list[i+1] && number_list[i+1] == number_list[i+2]){
            if(info_tag ==1 || info_tag == 0){
                poker_info[info_tag].push(number_list[i])
            }
            flag4 = 1;
        }
    }
    //判断到底是三条还是葫芦
    if(flag4 == 1){
        if(number_list[0] == number_list[1] && number_list[1] != number_list[2]){
            if(info_tag ==1 || info_tag == 0){
                poker_info[info_tag].push(number_list[0]);
            }
            return 7;
        }
        else if(number_list[3] == number_list[4] && number_list[2] != number_list[3]){
            if(info_tag ==1 || info_tag == 0){
                poker_info[info_tag].push(number_list[4]);
            }
            return 7;
        }
        else{
            return 4;
        }
    }

    //判断有几个对子
    var num_pair = 0;
    for(var i = 0; i < number_list.length - 2; i++){
        if(number_list[i] == number_list[i+1] && number_list[i+1] != number_list[i+2]){
            if(info_tag ==1 || info_tag == 0){
                 poker_info[info_tag].push(number_list[i]);
            }
               
            num_pair++;
        }
    }
    if(number_list[3] == number_list[4]) {
        if(info_tag ==1 || info_tag == 0){
            poker_info[info_tag].push(number_list[4]);
        }
        num_pair++;
    }
    if(num_pair == 1){
        return 2;
    }
    else if(num_pair == 2){
        return 3;
    }
    return 1;
}

//比较散牌
function compare_card(number_list1, number_list2){
    for(var i = number_list1.length-1; i>=0; i--){
        if(number_list1[i] > number_list2[i]){
            return 1;
        }
        else if(number_list1[i] < number_list2[i]){
            return 2;
        }
    }
    return 0;
}

//return 1 --  poker_list1 wins
//return 2 --  poker_list2 wins
//return 0 --  tie
function who_wins(poker_list1, poker_list2){
    poker_info[0] = [];
    poker_info[1] = [];

    var number_list1 = get_number_list(poker_list1);
    var suit_list1 = get_suit_list(poker_list1).sort();
    var number_list2 = get_number_list(poker_list2);
    var suit_list2 = get_suit_list(poker_list2).sort();

    var type1 = get_poker_type(number_list1,suit_list1,0);
    var type2 = get_poker_type(number_list2,suit_list2,1);
    if(type1 > type2){
        return 1;
    }
    else if(type1 < type2){
        return 2;
    }
    else{
        switch(type1){
            case 1:{
                //散牌
                return compare_card(number_list1,number_list2);
            }
            case 2:{
                //对子
                if(poker_info[0][0] == poker_info[1][0]){
                    //提取散值
                    var temp1 = [];
                    var temp2 = [];
                    for(var i = 0; i < number_list1.length; i++){
                        if(number_list1[i] != poker_info[0][0]){
                            temp1.push(number_list1[i]);
                        }
                        if(number_list2[i] != poker_info[1][0]){
                            temp2.push(number_list2[i]);
                        }
                    }

                    return compare_card(temp1,temp2);
                }
                else if(poker_info[0][0] > poker_info[1][0]){
                    return 1;
                }
                else if(poker_info[0][0] < poker_info[1][0]){
                    return 2;
                }
                break;
            }
            case 3:{
                //两对
                poker_info[0].sort((a,b) => a-b);
                poker_info[1].sort((a,b) => a-b);
                var result = compare_card(poker_info[0],poker_info[1]);
                if(result == 0){
                     //提取散值
                     var temp1 = [];
                     var temp2 = [];
                     for(var i = 0; i < number_list1.length; i++){
                         if(number_list1[i] != poker_info[0][0] && number_list1[i] != poker_info[0][1]){
                             temp1.push(number_list1[i]);
                         }
                         if(number_list2[i] != poker_info[1][0] && number_list2[i] != poker_info[1][1]){
                             temp2.push(number_list2[i]);
                         }
                     }
                     return compare_card(temp1,temp2);
                }
                else{
                    return result;
                }
                break;
            }
            case 4:{
                //三条
                if(poker_info[0][0] == poker_info[1][0]){
                    //提取散值
                    var temp1 = [];
                    var temp2 = [];
                    for(var i = 0; i < number_list1.length; i++){
                        if(number_list1[i] != poker_info[0][0]){
                            temp1.push(number_list1[i]);
                        }
                        if(number_list2[i] != poker_info[1][0]){
                            temp2.push(number_list2[i]);
                        }
                    }

                    return compare_card(temp1,temp2);
                }
                else if(poker_info[0][0] > poker_info[1][0]){
                    return 1;
                }
                else if(poker_info[0][0] < poker_info[1][0]){
                    return 2;
                }
                break;
            }
            case 5:{
                //顺子
               return compare_card(poker_info[0], poker_info[1]);
            }
            case 6:{
                //同花
                return compare_card(number_list1,number_list2);
            }
            case 7:{
                //葫芦
                return compare_card(poker_info[0], poker_info[1]);
            }
            case 8:{
                //铁支
                var result = compare_card([poker_info[0][0]],[poker_info[1][0]]);
                if(result == 0){
                    return compare_card([poker_info[0][1]],[poker_info[1][1]])
                }
                else{
                    return result;
                }
            }
            case 9:{
                return compare_card(poker_info[0], poker_info[1]);
            }
        }
    }
}


function get_poker_type_test(poker_list){
    var number_list = get_number_list(poker_list);
    var suit_list = get_suit_list(poker_list).sort();
    return get_poker_type(number_list, suit_list,3);
}
module.exports = {
    get_poker_type_test: get_poker_type_test,
    who_wins: who_wins,
}


