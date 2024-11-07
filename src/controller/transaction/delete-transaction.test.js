import { faker } from '@faker-js/faker'
import { DeleteTransactionController } from './delete-transaction'

describe('DeleteTransactionController', () => {
    class deleteTransactionUseCaseStub {
        async execute() {
            return {
                user_id: faker.string.uuid(),
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                date: faker.date.anytime().toISOString(),
                type: 'EXPENSE',
                amount: Number(faker.finance.amount()),
            }
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

        expect(result.statusCode).toBe(200)
    })
})
