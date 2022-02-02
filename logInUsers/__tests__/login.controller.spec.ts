import {loginController} from '../loginUsers.controller'

let req:any, 
    res:any,
    next:any
describe('loginController', function(){
    beforeEach(function(){

        res = {}
        res.status = jest.fn((x) => res)
        res.send = jest.fn((x) => res)

      req = {
           body:{
      
               email: 'info@gmail.com',
               password: '123456'
        
           }
       }

       next = jest.fn()
    })
    test('mainLogin calls the validatefunction to validate credentials', async function(){
        let log = new loginController()
        let spy = jest.spyOn(log, 'validateData')
        let spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation((data) => Promise.resolve(''))

        await log.mainLogin(req, res, next)

        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('mainLogin calls the errorfunc and sets the msg to the appropriate err msg with a 300 code if not valid credentials provided(email)', async function(){
        let log = new loginController()
        req.body.email = 'prince'
        let spy = jest.spyOn(log, 'errorfunc')
        let spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation((data) => Promise.resolve(''))

        await log.mainLogin(req, res, next)

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('email must be a valid email', 300)
    })

    test('mainLogin calls the errorfunc and sets the msg to no such email with a 400 code if no such email', async function(){
        let log = new loginController()
        let spy = jest.spyOn(log, 'errorfunc')
        let spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation((data) => Promise.resolve(''))

        await log.mainLogin(req, res, next)

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('no such user', 400)
    })

    test('mainLogin calls the comparePassword function if theres a valid user', async function(){
        let log = new loginController()
        let spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation((data) => Promise.resolve('ZCX'))
        let spy3 = jest.spyOn(log, 'comparePassword').mockImplementation((data) => Promise.resolve(false))

        await log.mainLogin(req, res, next)

        expect(spy3).toHaveBeenCalledTimes(1)
        expect(spy3).toHaveBeenCalledWith(req.body, 'ZCX')
    })
    

    test('mainLogin calls the errorfunc and sets the msg passwords dont much with a 400 code if password is incorrect', async function(){
        let log = new loginController()
        let spy = jest.spyOn(log, 'errorfunc')
        let spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation((data) => Promise.resolve('ZCX'))
        let spy3 = jest.spyOn(log, 'comparePassword').mockImplementation((data) => Promise.resolve(false))

        await log.mainLogin(req, res, next)

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith("passwords dont much", 300)
    })

    test('mainLogin calls the generateToken which generates jwt token if user is found', async function(){
        let log = new loginController()
        let user = {_id: 1, status: 'user'}
        let spy = jest.spyOn(log, 'generateToken').mockImplementation((data) => '12345')
        let spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation((data) => Promise.resolve(user))
        let spy3 = jest.spyOn(log, 'comparePassword').mockImplementation((data) => Promise.resolve(true))

        await log.mainLogin(req, res, next)

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(user._id)
    })

    test('mainLogin calls res.status with 200 and send with a msg (successful) plus a response obj containing token and user status', async function(){
        let log = new loginController()
        let user = {_id: 1, status: 'user'}
        let spy = jest.spyOn(log, 'generateToken').mockImplementation((data) => '12345')
        let spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation((data) => Promise.resolve(user))
        let spy3 = jest.spyOn(log, 'comparePassword').mockImplementation((data) => Promise.resolve(true))

        await log.mainLogin(req, res, next)

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.status(200).send).toHaveBeenCalledTimes(1)
        expect(res.status(200).send).toHaveBeenCalledWith({msg: 'succesful', response:{token: '12345', status:user.status }})
    })

   
})