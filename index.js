import 'dotenv/config.js'
import express from 'express'

import { CreateUserController } from './src/controller/create-user.js'
import { GetUserByIdController } from './src/controller/get-user-by-id.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(req)

    res.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = await new GetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(req)

    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
    console.log(`Listenning on port: ${process.env.PORT}`)
})
