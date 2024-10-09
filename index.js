import 'dotenv/config.js'
import express from 'express'

import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
} from './src/controller/index.js'
import { DeleteUserController } from './src/controller/delete-user.js'

const app = express()

app.use(express.json())

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = await new GetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(req)

    res.status(statusCode).send(body)
})

app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(req)

    res.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (req, res) => {
    const updateUserController = new UpdateUserController()

    const { statusCode, body } = await updateUserController.execute(req)

    res.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (req, res) => {
    const deleteUserController = new DeleteUserController()

    const { statusCode, body } = await deleteUserController.execute(req)

    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
    console.log(`Listenning on port: ${process.env.PORT}`)
})
