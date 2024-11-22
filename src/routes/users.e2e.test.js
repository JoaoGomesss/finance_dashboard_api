import request from 'supertest'
import { app } from '../..'
import { user } from '../tests/fixtures/user.js'

describe('UserRoutesE2ETests', () => {
    it('POST /api/users hould return 201 when user is created', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                ...user,
                id: undefined,
            })

        expect(response.status).toBe(201)
    })
})
