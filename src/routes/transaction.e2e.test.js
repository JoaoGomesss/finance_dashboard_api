import request from 'supertest'
import { app } from '../app'
import { transaction, user } from '../tests'

describe('TransactionsRoutesE2ETests', () => {
    it('POST /api/transaction should return 201 when creating a transaction successfully', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users/')
            .send({ ...user, id: undefined })

        const response = await request(app)
            .post('/api/transactions')
            .send({
                ...transaction,
                user_id: createdUser.id,
                id: undefined,
            })

        expect(response.status).toBe(201)
        expect(response.body.user_id).toBe(createdUser.id)
        expect(response.body.type).toBe(transaction.type)
        expect(response.body.amount).toBe(String(transaction.amount))
    })

    it('GET /api/transaction?userId should return 200 when fetching transactions successfully', async () => {
        const { body: createdUser } = await request(app)
            .post('/api/users')
            .send({ ...user, id: undefined })

        const { body: createdTransaction } = await request(app)
            .post('/api/transactions')
            .send({
                ...transaction,
                user_id: createdUser.id,
                id: undefined,
            })

        const response = await request(app).get(
            `/api/transactions?userId=${createdUser.id}`,
        )

        expect(response.status).toBe(200)
        expect(response.body[0].id).toBe(createdTransaction.id)
    })
})
