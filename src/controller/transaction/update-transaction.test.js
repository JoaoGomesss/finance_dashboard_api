import { UpdateTransactionController } from './update-transaction'
import { base, faker } from '@faker-js/faker'

describe('UpdateTransactionController', () => {
    class UpdateTransactionUseCaseStub {
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
        const updateTransactionUseCase = new UpdateTransactionUseCaseStub()
        const sut = new UpdateTransactionController(updateTransactionUseCase)

        return { sut, updateTransactionUseCase }
    }

    const baseHttpRequest = {
        params: { transactionId: faker.string.uuid() },
        body: {
            name: faker.commerce.productName(),
            date: faker.date.anytime().toISOString(),
            type: 'EXPENSE',
            amount: Number(faker.finance.amount()),
        },
    }

    it('should return 200 when updating a transaction successfully', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(baseHttpRequest)

        expect(result.statusCode).toBe(200)
    })

    it('should return 400 when transaction id is invalid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: { transactionId: 'invalid_transaction_id' },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when an unallowed field is provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            ...baseHttpRequest,
            body: {
                ...baseHttpRequest.body,
                unallowedField: 'unallowed_field',
            },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when an invalid amount is provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            ...baseHttpRequest,
            body: { ...baseHttpRequest.body, amount: 'invalid_amount' },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 400 when an invalid type is provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            ...baseHttpRequest,
            body: { ...baseHttpRequest.body, type: 'invalid_ type' },
        })

        expect(result.statusCode).toBe(400)
    })

    it('should return 500 when UpdateTransactionUseCase throws generic error', async () => {
        const { sut, updateTransactionUseCase } = makeSut()

        jest.spyOn(updateTransactionUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        const result = await sut.execute(baseHttpRequest)

        expect(result.statusCode).toBe(500)
    })
})
