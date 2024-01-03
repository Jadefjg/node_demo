// const mocha = require('mocha')
// const assert = require('assert');

// const user = require("router/user.js")


// describe('router/user.js', () => {

//     describe('register api', () => {
//         before(function () {
//             console.log('before:');
//         });

//         after(function () {
//             console.log('after.');
//         });

//         beforeEach(function () {
//             console.log('  beforeEach:');
//         });

//         afterEach(function () {
//             console.log('  afterEach.');
//         });

//         it('Registered user already exists', () => {

//             assert.strictEqual(sum(), 0);
//         });

//         it('Registered user successfully', () => {

//             assert.strictEqual(sum(1), 1);
//         });
//     });

//     describe('Login api', () => {
//         before(function () {
//             console.log('before:');
//         });

//         after(function () {
//             console.log('after.');
//         });

//         beforeEach(function () {
//             console.log('  beforeEach:');
//         });

//         afterEach(function () {
//             console.log('  afterEach.');
//         });

//         it('Registered user already exists', () => {

//             assert.strictEqual(sum(), 0);
//         });

//         it('login user successfully', () => {

//             assert.strictEqual(sum(1), 1);
//         });
//     });

//     describe('Logout api', () => {
//         before(function () {
//             console.log('before:');
//         });

//         after(function () {
//             console.log('after.');
//         });

//         beforeEach(function () {
//             console.log('  beforeEach:');
//         });

//         afterEach(function () {
//             console.log('  afterEach.');
//         });

//         it('logout user already exists', () => {

//             assert.strictEqual(sum(), 0);
//         });

//         it('logout user successfully', () => {

//             assert.strictEqual(sum(1), 1);
//         });
//     });
// })


// 方法2: axios 和 jest

// const axios = require('axios');

// describe('POST /Register',()=>{
//     it("user adlready exit", async() =>{
//         const data = {
//             username:"feng"
//         };

//         const res = await axios.post('http://localhost:3000/register',data);

//         expect(res.status).toBe(200);
//         expect(res.data.username).toBe(data.username);

//     });

//     it("user register succesful",()=>{
//         const data = {
//             username:"feng",
//             password:'123456'
//         };

//         const res = await axios.post('http://localhost:3000/register',data);
        
//         expect(res.statusCode).toEqual(200);
//     });
// });





// 方法3: 使用 Express.js 创建你的 API, supertest 和 jest 开发接口自动化代码

// const request = require('supertest');
// const app = require('../app'); // 你的 Express 应用

// describe('GET /userinfo', () => {
//   it('should return user info', async () => {
//     const res = await request(app).get('/user');

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('name');
//     expect(res.body).toHaveProperty('email');
//   });
// });


// describe('POST /user', () => {
//     it('Get userinfo',async () => {
//         const data = {
//             username:'feng',
//             email:'feng@gmail.com'
//         };

//         const res = await (await request(app).post('/userinfo').send(data));

//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty('id');
//         expect(res.body).toEqual(data.uername);
//         expect(res.email).toEqual(data.email);

//     });
// });





// 方法4: 使用 Express.js 创建你的 API, supertest 和 jest 开发接口自动化代码

const chai = require('chai');
const chaiHttp = require('chai-http');
const sion = require('sinon');

const app = require('../app');   // 导入你的 Express 应用

const expect = chai.expect;


chai.use(chaiHttp);


describe('GET /user', function() {
    it('should return user info', function(done) {
      // 使用 Sinon 创建一个假的函数
      const fakeFunc = sinon.fake.returns({ name: 'John', email: 'john@example.com' });
  
      // 替换原有的函数
      sinon.replace(app, 'getUser', fakeFunc);
  
      chai.request(app)
        .get('/user')
        .end(function(err, res) {
            // 使用 Chai 进行断言
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('name').eql('John');
            expect(res.body).to.have.property('email').eql('john@example.com');
    
            // 恢复原有的函数
            sinon.restore();
            done();
        });
    });

    // POST 请求
    it('POST /users should create a user', done => {
        chai.request(app)
            .post('/users')
            .send({ name: 'John', email: 'john@example.com' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('name', 'John');
                expect(res.body).to.have.property('email', 'john@example.com');
                done();
            });
    });

  // PUT 请求
    it('PUT /users/:id should update a user', done => {
    const testId = '12345'; // 假设存在一个ID为12345的用户
    chai.request(app)
        .put(`/users/${testId}`)
        .send({ name: 'John Updated', email: 'john-updated@example.com' })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('name', 'John Updated');
            expect(res.body).to.have.property('email', 'john-updated@example.com');
            done();
        });
    });
});



// 方法4: 使用 Express.js 创建你的 API, supertest 和 jest 开发接口自动化代码
// 引入需要的库
var chai = require('chai');
var expect = chai.expect;

// 引入需要测试的模块
var myModule = require('../myModule');

describe('myModule', function() {
    // 测试 add 函数
    describe('#add()', function() {
        it('should add two numbers correctly', function() {
            var num1 = 5;
            var num2 = 10;
            var expectedSum = 15;

            // 调用 add 函数
            var result = myModule.add(num1, num2);

            // 判断结果是否正确
            expect(result).to.equal(expectedSum);
        });
    });

    // 测试 subtract 函数
    describe('#subtract()', function() {
        it('should subtract two numbers correctly', function() {
            var num1 = 10;
            var num2 = 5;
            var expectedDifference = 5;

            // 调用 subtract 函数
            var result = myModule.subtract(num1, num2);

            // 判断结果是否正确
            expect(result).to.equal(expectedDifference);
        });
    });
});



