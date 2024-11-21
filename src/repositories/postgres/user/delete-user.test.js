import { PostgresDeleteUserRepository } from '../../../repositories/postgres/index.js'
import { user } from '../../../tests/index.js'
import { prisma } from '../../../../prisma/prisma.js'

describe('PostgresDeleteUserRepository', () => {
    it('should delete a user on db', async () => {
        await prisma.user.create({ data: user })
        const sut = new PostgresDeleteUserRepository()

        const result = await sut.execute(user.id)

        expect(result).toStrictEqual(user)
    })
})
