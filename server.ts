import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import docs from './docs'
import morgan from 'morgan'
import logrouter from './logInUsers/loginUsers.route'
import regrouter from './regUsers/regUsers.route'



const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use('/uploads', express.static('uploads'))



app.use('/api-register', regrouter)
app.use('/api-login', logrouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs))

export {app}