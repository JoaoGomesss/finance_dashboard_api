import { faker } from '@faker-js/faker'
import { PasswordHasherAdpater } from './password-hasher'

describe('PasswordHasherAdapter', () => {
    it('should return a hashed password', async () => {
        const sut = new PasswordHasherAdpater()
        const password = faker.internet.password()

        const result = await sut.execute(password)

        expect(result).toBeTruthy()
        expect(typeof result).toBe('string')
        expect(result).not.toBe(password)
    })
})