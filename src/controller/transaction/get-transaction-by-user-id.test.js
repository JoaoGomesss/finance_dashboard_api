import { GetTransactionsByUserIdController } from './get-transaction-by-user-id'
import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '../../errors/user'
import { transaction } from '../../tests'

describe('GetTransactionByUserIdController', () => {
    class getTransactionsByUserIdUseCaseStub {
        async execute() {
            return [transaction]
        }
    }

    const makeSut = () => {
        const getTransactionsByUserIdUseCase =
            new getTransactionsByUserIdUseCaseStub()
        const sut = new GetTransactionsByUserIdController(
            getTransactionsByUserIdUseCase,
        )

        return { sut, getTransactionsByUserIdUseCase }
    }

    it('should return 200 when finding transaction by user id successfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            query: { userId: faker.string.uuid() },
        })

        expect(result.statusCode).toBe(200)
    })

    it('should return 400 when userId is missing', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({ query: { userId: undefined } })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when userId is invalid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            query: { userId: 'invalid_userId' },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 404 when GetTransactionByUserIdUseCase throws UserNotFoundError', async () => {
        const { sut, getTransactionsByUserIdUseCase } = makeSut()

        import.meta.jest
            .spyOn(getTransactionsByUserIdUseCase, 'execute')
            .mockRejectedValueOnce(new UserNotFoundError())

        const result = await sut.execute({
            query: { userId: faker.string.uuid() },
        })

        expect(result.statusCode).toBe(404)
    })

    it('should return 500 when GetTransactionByUserIdUseCase throws generic error', async () => {
        const { sut, getTransactionsByUserIdUseCase } = makeSut()

        import.meta.jest
            .spyOn(getTransactionsByUserIdUseCase, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = await sut.execute({
            query: { userId: faker.string.uuid() },
        })

        expect(result.statusCode).toBe(500)
    })

    it('should call GetTransactionByUserIdUseCase with correct params', async () => {
        const { sut, getTransactionsByUserIdUseCase } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            getTransactionsByUserIdUseCase,
            'execute',
        )

        const userId = faker.string.uuid()

        await sut.execute({ query: { userId: userId } })

        expect(executeSpy).toHaveBeenCalledWith(userId)
    })
})
