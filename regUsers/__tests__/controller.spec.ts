
import {RegController} from '../regUsers.controller'
let req:any, 
    res:any,
    next:any
describe('Regsiter Controller', function(){
    beforeEach(function(){
         res = {}
         res.status = jest.fn((x) => res)
         res.send = jest.fn((x) => res)

       req = {
            body:{
                firstname: 'prince',
                lastname: 'acquah',
                email: 'info@gmail.com',
                password: '123456',
                status: 'user'
            }
        }

        next = jest.fn()
    })
    test('main function calls the validCredentails function to check if the credentials are valid', async function(){
        let reg = new RegController()
        let spy = jest.spyOn(reg, 'validCredentials')
        let spy2 = jest.spyOn(reg, 'insertIntoDb').mockImplementation((data) => Promise.resolve(''))
        
        await reg.main(req, res, next)
        
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(req.body)

    })

    test('main function calls the errorfunc function when credentials are invalid,  with the appropriate error msg and 300 status code ', async function(){
        let reg = new RegController()
        let spy = jest.spyOn(reg, 'errorfunc')
        let spy2 = jest.spyOn(reg, 'insertIntoDb').mockImplementation((data) => Promise.resolve(''))
        
        await reg.main(req, res, next)
        
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('pic is required', 300)
        expect(next).toHaveBeenCalledTimes(1)

    })

    test('main function calls the express next function ', async function(){
        let reg = new RegController()
        let spy2 = jest.spyOn(reg, 'insertIntoDb').mockImplementation((data) => Promise.resolve(''))
        
        await reg.main(req, res, next)
        

        expect(next).toHaveBeenCalledTimes(1)
    })

    test('main function calls the insertIntoDb function when credentials are valid ', async function(){
        req.body.pic = 'jfsaopjaspoejo'
        let reg = new RegController()
        let spy2 = jest.spyOn(reg, 'insertIntoDb').mockImplementation((data) => Promise.resolve(''))
        
        await reg.main(req, res, next)
        

        expect(spy2).toHaveBeenCalledTimes(1)
    })

    test('main function calls the hashpassword function which hash the password ', async function(){
        req.body.pic = 'jfsaopjaspoejo'
        let reg = new RegController()

        let spy1 = jest.spyOn(reg, 'hashPassword')
        let spy2 = jest.spyOn(reg, 'insertIntoDb').mockImplementation((data) => Promise.resolve(''))
        
        await reg.main(req, res, next)
        

        expect(spy1).toHaveBeenCalledTimes(1)
    })

    test('main function sets the res.status to 201 when credentials are valid ', async function(){
        req.body.pic = 'jfsaopjaspoejo'
        let reg = new RegController()
        let spy2 = jest.spyOn(reg, 'insertIntoDb').mockImplementation((data) => Promise.resolve('user'))
        
        await reg.main(req, res, next)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.status(200).send).toHaveBeenCalledWith({msg: 'user created', user: 'user' })
    })

    test('error function creates a new Error with the msg assigned and sets the statuscode to the err ',  function(){
        let reg = new RegController()
        let msg = 'error'

        let response = reg.errorfunc(msg, 300)

        expect(response.message).toBe(msg)
        expect(response.statusCode).toBe(300)
    })
})