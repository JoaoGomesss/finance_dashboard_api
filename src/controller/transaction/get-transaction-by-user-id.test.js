import { GetTransactionsByUserIdController } from './get-transaction-by-user-id'
import { faker } from '@faker-js/faker'

describe('GetTransactionByUserIdController', () => {
    class getTransactionsByUserIdUseCaseStub {
        async execute() {
            return [
                {
                    user_id: faker.string.uuid(),
                    id: faker.string.uuid(),
                    name: faker.commerce.productName(),
                    date: faker.date.anytime().toISOString(),
                    type: 'EXPENSE',
                    amount: Number(faker.finance.amount()),
                },
            ]
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
})
