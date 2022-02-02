import userSchema from '../regUsers.model'

describe('User', function(){

    describe('Schema', function(){

        test('firstname', function(){
            const firstname = userSchema.schema.obj.firstname;
            expect(firstname).toEqual({
                type: String,
                required: true,
                trim: true,
                maxlength: 50
            })
        })

        test('lastname', function(){
            const lastname = userSchema.schema.obj.lastname;
            expect(lastname).toEqual({
                type: String,
                required: true,
                trim: true,
                maxlength: 50
            })
        })

        test('email', function(){
            const email = userSchema.schema.obj.email;
            expect(email).toEqual({
                type: String,
                required: true,
                unique: true,
                trim: true
            })
        })

        test('status', function(){
            const status = userSchema.schema.obj.status;
            expect(status).toEqual({
                type: String,
                required: true,
                enum: ['user', 'health'],
                default: 'user'
            })
        })

         test('password', function(){
            const password = userSchema.schema.obj.password;
            expect(password).toEqual({
                type: String,
                required: true,
                
            })
        })

        test('work', function(){
            const work = userSchema.schema.obj.work;
            expect(work).toEqual({
                type: String,
                
            })
        })

        test('profession', function(){
            const profession = userSchema.schema.obj.profession;
            expect(profession).toEqual({
                type: String,
                
            })
        })

        test('description', function(){
            const description = userSchema.schema.obj.description;
            expect(description).toEqual({
                type: String,
                
            })
        })

        
    })
})