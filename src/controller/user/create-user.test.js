import { CreateUserController } from './create-user'
import { faker } from '@faker-js/faker'
import { EmailAlreadyInUseError } from '../../errors/user'
import { user } from '../../tests'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const sut = new CreateUserController(createUserUseCase)

        return { createUserUseCase, sut }
    }

    const httpRequest = {
        body: {
            ...user,
            id: undefined,
        },
    }

    it('should return 201 when creating a user successfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(201)
        expect(result.body).toBe(user)
    })

    it('should return 400 if first_name is not provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                first_name: undefined,
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if last_name is not provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                last_name: undefined,
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: undefined,
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not valid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: 'invalid_email',
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if password is not provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: undefined,
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if the password does not have at least 6 characters', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: faker.internet.password({ length: 5 }),
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should call CreateUserUseCase with correct params', async () => {
        const { sut, createUserUseCase } = makeSut()
        const executeSpy = jest.spyOn(createUserUseCase, 'execute')

        await sut.execute(httpRequest)

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    it('should return 500 if CreateUserUseCase throws', async () => {
        const { sut, createUserUseCase } = makeSut()
        jest.spyOn(createUserUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(500)
    })

    it('should return 400 if CreateUserUseCase throws EmailAlreadyInUseError', async () => {
        const { sut, createUserUseCase } = makeSut()
        jest.spyOn(createUserUseCase, 'execute').mockRejectedValueOnce(
            new EmailAlreadyInUseError(httpRequest.body.email),
        )

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })
})
