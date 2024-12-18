import { EmailAlreadyInUseError, UserNotFoundError } from '../../errors/user'
import { UpdateUserController } from './update-user'
import { faker } from '@faker-js/faker'
import { user } from '../../tests'

describe('UpdateUserController', () => {
    class UpdateUserUseCaseStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const updateUserUseCase = new UpdateUserUseCaseStub()
        const sut = new UpdateUserController(updateUserUseCase)

        return { sut, updateUserUseCase }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 7 }),
        },
    }

    it('should return 200 when updating a user successfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(200)
    })

    it('should return 400 when an invalid email is provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: httpRequest.params,
            body: { ...httpRequest.body, email: 'invalid_email' },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when an invalid password is provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: httpRequest.params,
            body: { ...httpRequest.body, password: 'inv_p' },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when an invalid id is provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: {
                userId: 'invalid_id',
            },
            body: httpRequest.body,
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when an unallowed field is provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: httpRequest.params,
            body: {
                ...httpRequest.body,

                unallowed_field: 'unallowed_value',
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 500 if UpdateUserUseCase throws with generic error', async () => {
        const { sut, updateUserUseCase } = makeSut()

        import.meta.jest
            .spyOn(updateUserUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(500)
    })

    it('should return 400 if UpdateUserUseCase throws EmailAlreadyInUseError', async () => {
        const { sut, updateUserUseCase } = makeSut()

        import.meta.jest
            .spyOn(updateUserUseCase, 'execute')
            .mockRejectedValueOnce(
                new EmailAlreadyInUseError(faker.internet.email()),
            )

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })
    it('should return 404 if UpdateUserUseCase throws UserNotFoundError', async () => {
        const { sut, updateUserUseCase } = makeSut()

        import.meta.jest
            .spyOn(updateUserUseCase, 'execute')
            .mockRejectedValueOnce(new UserNotFoundError(faker.string.uuid()))

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(404)
    })

    it('should call UpdateUserUseCase with correct params', async () => {
        const { sut, updateUserUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(updateUserUseCase, 'execute')

        await sut.execute(httpRequest)

        expect(executeSpy).toHaveBeenCalledWith(
            httpRequest.params.userId,
            httpRequest.body,
        )
    })
})
