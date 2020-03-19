const {app} = require('../src/app.js');

const request = require('supertest');


describe("app", () => {
    describe("get one task", () => {
        it("should return all items", (done) => {
            request(app).get('/api/tasks/1').expect(200).expect({"id":1,"content":"Restful API homework","createdTime":"2019-05-15T00:00:00Z"}).end((err, res) => {
                if(err) throw err;
                done();
            })
        })  
    })

    describe("insert a task", () => {
        it("create a task which didn't exist", (done) => {
            request(app).post('/api/tasks/').send({
                "id": 2,
                "content": "Restful API homework",
                "createdTime": "2019-05-15T00:00:00Z"
            }).expect(201).expect([{
                "id": 1,
                "content": "Restful API homework",
                "createdTime": "2019-05-15T00:00:00Z"
            },{
                "id": 2,
                "content": "Restful API homework",
                "createdTime": "2019-05-15T00:00:00Z"
            }]).end((err, res) => {
                if(err) throw err;
                done();
            })
        })
    })

    describe("get all tasks", () => {
        it("should return all items", (done) => {
            request(app).get('/api/tasks').expect(200).expect([
                {
                    "id": 1,
                    "content": "Restful API homework",
                    "createdTime": "2019-05-15T00:00:00Z"
                },
                {
                    "id": 2,
                    "content": "Restful API homework",
                    "createdTime": "2019-05-15T00:00:00Z"
                }

            ]).end((err, res) => {
                if(err) throw err;
                done();
            })
        })  
    })

    describe("delete one task", () => {
        it("should return all items", (done) => {
            request(app).delete('/api/tasks/2').expect(204).end((err, res) => {
                if(err) throw err;
                done();
            })
        })  
    })

})