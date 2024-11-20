import { PostgreCreateUserRepository } from './create-user'
import { user } from '../../../tests/index.js'

describe('CreateUserRepository', () => {
    it('should create a user on db', async () => {
        const sut = new PostgreCreateUserRepository()

        const result = await sut.execute(user)

        expect(result).not.toBeNull()
    })
})
