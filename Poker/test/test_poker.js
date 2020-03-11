const poker = require("../app/poker");
const {expect} = require('chai');

describe("test poker",function(){

    describe("test get_poker_type", function(){
        it("散牌", function(){
            expect(poker.get_poker_type_test("3D 5S 9C KD 2H")).to.be.equal(1);
        });

        it("对子", function(){
            expect(poker.get_poker_type_test("3D 3S 9C KD 2H")).to.be.equal(2);
        });

        it("两对", function(){
            expect(poker.get_poker_type_test("3D 3S 9C 9D 2H")).to.be.equal(3);
        });

        it("三条", function(){
            expect(poker.get_poker_type_test("3D 3S 3C 9D 2H")).to.be.equal(4);
        });

        it("顺子", function(){
            expect(poker.get_poker_type_test("3D 4S 5C 6D 7H")).to.be.equal(5);
        });

        it("同花", function(){
            expect(poker.get_poker_type_test("3D 5D 9D KD 2D")).to.be.equal(6);
        });

        it("葫芦", function(){
            expect(poker.get_poker_type_test("3D 3S 3C 2D 2H")).to.be.equal(7);
        });

        it("铁支", function(){
            expect(poker.get_poker_type_test("3D 3S 3C 2D 3H")).to.be.equal(8);
        });

        it("同花顺", function(){
            expect(poker.get_poker_type_test("9D TD JD QD KD")).to.be.equal(9);
        });
    });

    describe("test who_wins", function(){
        it("不同type比较", function(){
            expect(poker.who_wins("3D 5S 9C KD 2H","3D 3S TC KD 2H")).to.be.equal(2);
        });

        it("相同type比较--散牌", function(){
            expect(poker.who_wins("3D 6S TC KD 2H","3D 5S 9C KD 2H")).to.be.equal(1);
        });

        it("相同type比较--散牌相同", function(){
            expect(poker.who_wins("3D 6S TC KD 2H","3D 6S TC KD 2H")).to.be.equal(0);
        });

        it("相同type比较--对子", function(){
            expect(poker.who_wins("3D 3S TC KD 2H","4D 5S 4C KD 2H")).to.be.equal(2);
        });

        it("相同type比较--对子相同", function(){
            expect(poker.who_wins("3D 3S TC KD 2H","3D 5S 3C KD 2H")).to.be.equal(1);
        });

        it("相同type比较--两对", function(){
            expect(poker.who_wins("3D 3S TC TD 2H","4D 5S 4C TD TH")).to.be.equal(2);
        });

        it("相同type比较--两对相同", function(){
            expect(poker.who_wins("3D 3S TC TD 2H","3D 5S 3C TD TH")).to.be.equal(2);
        });

        it("相同type比较--三条", function(){
            expect(poker.who_wins("3D 3S 3C TD 2H","4D 4S 4C TD TH")).to.be.equal(2);
        });

        it("相同type比较--三条相同", function(){
            expect(poker.who_wins("3D 3S 3C KD 2H","3D 3S 3C TD 2H")).to.be.equal(1);
        });

        it("相同type比较--顺子", function(){
            expect(poker.who_wins("4D 5S 6C 7D 8H","8D 9S TC JD QH")).to.be.equal(2);
        });

        it("相同type比较--顺子相同", function(){
            expect(poker.who_wins("8D 9S TC JD QH","8D 9C TC JD QH")).to.be.equal(0);
        });

        it("相同type比较--同花", function(){
            expect(poker.who_wins("4D 5D TD 7D 8D","8S 9S TS 2S QS")).to.be.equal(2);
        });

        it("相同type比较--同花相同", function(){
            expect(poker.who_wins("8D 9D AD JD QD","8S 9S AS JS QS")).to.be.equal(0);
        });

        it("相同type比较--葫芦", function(){
            expect(poker.who_wins("3D 3S 3C TD TH","4D 4S 4C TD TH")).to.be.equal(2);
        });

        it("相同type比较--葫芦相同", function(){
            expect(poker.who_wins("3D 3S 3C TD TH","3D 3S 3C TD TH")).to.be.equal(0);
        });

        it("相同type比较--铁支", function(){
            expect(poker.who_wins("3D 3S 3C 3D TH","4D 4S 4C 4D TH")).to.be.equal(2);
        });

        it("相同type比较--铁支相同", function(){
            expect(poker.who_wins("3D 3S 3C 3D TH","3D 3S 3C 3D AH")).to.be.equal(2);
        });

        it("相同type比较--同花顺", function(){
            expect(poker.who_wins("3D 4D 5D 6D 7D","2D 3D 4D 5D 6D")).to.be.equal(1);
        });

        it("相同type比较--同花顺相同", function(){
            expect(poker.who_wins("3D 4D 5D 6D 7D","3S 4S 5S 6S 7S")).to.be.equal(0);
        });
    })

})