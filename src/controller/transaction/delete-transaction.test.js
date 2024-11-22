import { faker } from '@faker-js/faker'
import { DeleteTransactionController } from './delete-transaction'
import { transaction } from '../../tests'
import { TransactionNotFoundError } from '../../errors'

describe('DeleteTransactionController', () => {
    class deleteTransactionUseCaseStub {
        async execute() {
            return transaction
        }
    }
    const makeSut = () => {
        const deleteTransactionUseCase = new deleteTransactionUseCaseStub()
        const sut = new DeleteTransactionController(deleteTransactionUseCase)

        return { sut, deleteTransactionUseCase }
    }

    it('should return 200 when deleting a transaction successfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: { transactionId: faker.string.uuid() },
        })

        expect(result.statusCode).toBe(200)
    })

    it('should return 400 when id is invalid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: { transactionId: 'invalid_id' },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 404 when transaction is not found', async () => {
        const { sut, deleteTransactionUseCase } = makeSut()

        jest.spyOn(deleteTransactionUseCase, 'execute').mockRejectedValueOnce(
            new TransactionNotFoundError(),
        )

        const result = await sut.execute({
            params: { transactionId: faker.string.uuid() },
        })

        expect(result.statusCode).toBe(404)
    })
    it('should return 500 when DeleteTransactioUseCase throws', async () => {
        const { sut, deleteTransactionUseCase } = makeSut()

        jest.spyOn(deleteTransactionUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        const result = await sut.execute({
            params: { transactionId: faker.string.uuid() },
        })

        expect(result.statusCode).toBe(500)
    })

    it('should call DeleteTransactionUseCase with correct params', async () => {
        const { sut, deleteTransactionUseCase } = makeSut()
        const executeSpy = jest.spyOn(deleteTransactionUseCase, 'execute')

        const transactionId = faker.string.uuid()

        await sut.execute({ params: { transactionId: transactionId } })

        expect(executeSpy).toHaveBeenCalledWith(transactionId)
    })
})
