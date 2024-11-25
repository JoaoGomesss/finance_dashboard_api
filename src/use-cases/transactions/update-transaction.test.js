import { UpdateTransactionUseCase } from './update-transaction'
import { faker } from '@faker-js/faker'
import { transaction } from '../../tests'

describe('UpdateTransctionUseCase', () => {
    class UpdateTransactionRepositoryStub {
        async execute() {
            return transaction
        }
    }

    const makeSut = () => {
        const updateTransactionRepository =
            new UpdateTransactionRepositoryStub()
        const sut = new UpdateTransactionUseCase(updateTransactionRepository)

        return { sut, updateTransactionRepository }
    }

    it('should update a transaction sucessfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(
            transaction.id,

            { amount: Number(faker.finance.amount()) },
        )

        expect(result).toEqual(transaction)
    })

    it('should call UpdateTransactionRepository with correct params', async () => {
        const { sut, updateTransactionRepository } = makeSut()
        const executetSpy = import.meta.jest.spyOn(
            updateTransactionRepository,
            'execute',
        )

        await sut.execute(transaction.id, {
            amount: transaction.amount,
        })

        expect(executetSpy).toHaveBeenCalledWith(transaction.id, {
            amount: transaction.amount,
        })
    })

    it('should throw if UpdateTransactionRepository throws', async () => {
        const { sut, updateTransactionRepository } = makeSut()
        import.meta.jest
            .spyOn(updateTransactionRepository, 'execute')
            .mockRejectedValueOnce(new Error())

        const result = sut.execute(transaction.id, {
            amount: transaction.amount,
        })

        await expect(result).rejects.toThrow()
    })
})
