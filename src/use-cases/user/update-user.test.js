import { UpdateUseCase } from './update-user'
import { faker } from '@faker-js/faker'
import { EmailAlreadyInUseError } from '../../errors/user'
import { user } from '../../tests'

describe('UpdateUserUseCase', () => {
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
            return user
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

        expect(result).toBe(user)
    })

    it('should update a user sucessfully (with email)', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getUserByEmailRepository,
            'execute',
        )

        const email = faker.internet.email()

        const result = await sut.execute(userId, {
            email,
        })

        expect(executeSpy).toHaveBeenCalledWith(email)
        expect(result).toBe(user)
    })

    it('should update a user sucessfully (with password)', async () => {
        const { sut, passwordHasherAdpater } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            passwordHasherAdpater,
            'execute',
        )

        const password = faker.internet.password()

        const result = await sut.execute(userId, { password })

        expect(executeSpy).toHaveBeenCalledWith(password)
        expect(result).toBe(user)
    })

    it('should throw EmailAlreadyInUseError if email already in use', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByEmailRepository, 'execute')
            .mockResolvedValueOnce(user)

        const result = sut.execute(userId, { email: user.email })

        await expect(result).rejects.toThrow(
            new EmailAlreadyInUseError(user.email),
        )
    })

    it('should call UpdateUserRepository with correct params', async () => {
        const { sut, updateUserRepository } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            updateUserRepository,
            'execute',
        )

        const updateUserParams = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
        }

        await sut.execute(user.id, updateUserParams)

        expect(executeSpy).toHaveBeenCalledWith(user.id, {
            ...updateUserParams,
            password: 'hashed_password',
        })
    })

    it('should throws if GetUserByEmailRepository throws', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        import.meta.jest
            .spyOn(getUserByEmailRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = sut.execute(userId, { email: faker.internet.email() })

        await expect(result).rejects.toThrow()
    })

    it('should throws if PasswordHasherAdapter throws', async () => {
        const { sut, passwordHasherAdpater } = makeSut()
        import.meta.jest
            .spyOn(passwordHasherAdpater, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = sut.execute(userId, {
            password: faker.internet.password(),
        })

        await expect(result).rejects.toThrow()
    })

    it('should throws if UpdateUserRepository throws', async () => {
        const { sut, updateUserRepository } = makeSut()
        import.meta.jest
            .spyOn(updateUserRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = sut.execute(userId, {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
        })

        await expect(result).rejects.toThrow()
    })
})
