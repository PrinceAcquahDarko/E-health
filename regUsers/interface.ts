export interface IRegister{
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    status: 'user | health'
    profession?: string,
    description?: string,
    work?: string

}