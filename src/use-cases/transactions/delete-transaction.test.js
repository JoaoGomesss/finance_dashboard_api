import { DeleteTransactionUseCase } from './delete-transaction'
import { faker } from '@faker-js/faker'

describe('DeleteTransactionUseCase', () => {
    class DeleteTransactionRepositoryStub {
        async execute(transactionId) {
            return { ...transaction, id: transactionId }
        }
    }

    const makeSut = () => {
        const deleteTransactionRepository =
            new DeleteTransactionRepositoryStub()
        const sut = new DeleteTransactionUseCase(deleteTransactionRepository)

        return { sut, deleteTransactionRepository }
    }

    const transaction = {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.commerce.productName(),
        date: faker.date.anytime().toISOString(),
        type: 'EARNING',
        amount: Number(faker.finance.amount()),
    }

    it('should delete a transaction sucessfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(transaction.id)

        expect(result).toEqual({ ...transaction, id: transaction.id })
    })

    it('should call DeleteTransactionRepository with correct params', async () => {
        const { sut, deleteTransactionRepository } = makeSut()
        const executeSpy = jest.spyOn(deleteTransactionRepository, 'execute')

        const id = faker.string.uuid()

        await sut.execute(id)

        expect(executeSpy).toHaveBeenCalledWith(id)
    })

    it('should throw if DeleteTransactionRepository throws', async () => {
        const { sut, deleteTransactionRepository } = makeSut()
        jest.spyOn(
            deleteTransactionRepository,
            'execute',
        ).mockRejectedValueOnce(new Error())

        const promise = sut.execute(transaction.id)

        await expect(promise).rejects.toThrow()
    })
})
