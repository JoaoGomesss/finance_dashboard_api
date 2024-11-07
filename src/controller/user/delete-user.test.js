import { faker } from '@faker-js/faker'
import { DeleteUserController } from './delete-user'

describe('DeleteUserController', () => {
    class DeleteUserUseCaseStub {
        async execute() {
            return {
                id: faker.string.uuid(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            }
        }
    }

    const makeSut = () => {
        const deleteUserUseCase = new DeleteUserUseCaseStub()
        const sut = new DeleteUserController(deleteUserUseCase)

        return { deleteUserUseCase, sut }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    }

    it('should return 200 if user is deleted', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(200)
    })

    it('should return 400 if id is invalid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({ params: { userId: 'invalid_id' } })

        expect(result.statusCode).toBe(400)
    })

    it('should return 404 if user is not found', async () => {
        const { sut, deleteUserUseCase } = makeSut()

        jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValue(null)

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(404)
    })

    it('should return 500 if DeleteUserUseCase throws', async () => {
        const { sut, deleteUserUseCase } = makeSut()
        jest.spyOn(deleteUserUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(500)
    })
})