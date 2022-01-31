import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import docs from './docs'
import morgan from 'morgan'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs))

export {app}