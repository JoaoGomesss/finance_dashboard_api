import { DeleteTransactionUseCase } from './delete-transaction'
import { faker } from '@faker-js/faker'
import { transaction } from '../../tests'

describe('DeleteTransactionUseCase', () => {
    class DeleteTransactionRepositoryStub {
        async execute() {
            return transaction
        }
    }

    const makeSut = () => {
        const deleteTransactionRepository =
            new DeleteTransactionRepositoryStub()
        const sut = new DeleteTransactionUseCase(deleteTransactionRepository)

        return { sut, deleteTransactionRepository }
    }

    it('should delete a transaction sucessfully', async () => {
        const { sut } = makeSut()

        const id = faker.string.uuid()

        const result = await sut.execute(id)

        expect(result).toEqual(transaction)
    })

    it('should call DeleteTransactionRepository with correct params', async () => {
        const { sut, deleteTransactionRepository } = makeSut()
        const executeSpy = import.meta.jest.spyOn(
            deleteTransactionRepository,
            'execute',
        )

        const id = faker.string.uuid()

        await sut.execute(id)

        expect(executeSpy).toHaveBeenCalledWith(id)
    })

    it('should throw if DeleteTransactionRepository throws', async () => {
        const { sut, deleteTransactionRepository } = makeSut()
        import.meta.jest
            .spyOn(deleteTransactionRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(transaction.id)

        await expect(promise).rejects.toThrow()
    })
})
