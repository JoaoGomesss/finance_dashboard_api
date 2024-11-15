import e from 'express'
import { UpdateUseCase } from './update-user'
import { faker } from '@faker-js/faker'

describe('UpdateUserUseCase', () => {
    const updatedUser = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
    }

    const userId = faker.string.uuid()

    class GetUserByEmailRepositoryStub {
        async execute() {
            return null
        }
    }

    class PasswordHasherAdpaterStub {
        async execute() {
            return 'hashed_password'
        }
    }

    class UpdateUserRepositoryStub {
        async execute() {
            return updatedUser
        }
    }

    const makeSut = () => {
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub()
        const updateUserRepository = new UpdateUserRepositoryStub()
        const passwordHasherAdpater = new PasswordHasherAdpaterStub()
        const sut = new UpdateUseCase(
            getUserByEmailRepository,
            updateUserRepository,
            passwordHasherAdpater,
        )

        return {
            sut,
            getUserByEmailRepository,
            updateUserRepository,
            passwordHasherAdpater,
        }
    }

    it('should update a user sucessfully (without email and password)', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(userId, {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
        })

        expect(result).toBe(updatedUser)
    })

    it('should update a user sucessfully (with email)', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        const executeSpy = jest.spyOn(getUserByEmailRepository, 'execute')

        const email = faker.internet.email()

        const result = await sut.execute(userId, {
            email,
        })

        expect(executeSpy).toHaveBeenCalledWith(email)
        expect(result).toBe(updatedUser)
    })

    it('should update a user sucessfully (with password)', async () => {
        const { sut, passwordHasherAdpater } = makeSut()
        const executeSpy = jest.spyOn(passwordHasherAdpater, 'execute')

        const password = faker.internet.password()

        const result = await sut.execute(userId, { password })

        expect(executeSpy).toHaveBeenCalledWith(password)
        expect(result).toBe(updatedUser)
    })
})
