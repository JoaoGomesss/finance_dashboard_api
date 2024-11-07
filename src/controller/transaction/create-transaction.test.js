import { faker } from '@faker-js/faker'
import { CreateTransactionController } from './create-transaction'

describe('CreateTransactionController', () => {
    class CreateTransactionUseCaseStub {
        async execute(transaction) {
            return transaction
        }
    }

    const baseHttpRequest = {
        body: {
            user_id: faker.string.uuid(),
            name: faker.commerce.productName(),
            date: faker.date.anytime().toISOString(),
            type: 'EARNING',
            amount: Number(faker.finance.amount()),
        },
    }

    const makeSut = () => {
        const createTransactionUseCase = new CreateTransactionUseCaseStub()
        const sut = new CreateTransactionController(createTransactionUseCase)

        return { sut, createTransactionUseCase }
    }

    it('should return 201 when creating a transaction successfully (earning)', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(baseHttpRequest)

        expect(result.statusCode).toBe(201)
    })

    it('should return 201 when creating a transaction successfully (expense)', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: { ...baseHttpRequest.body, type: 'EXPENSE' },
        })

        expect(result.statusCode).toBe(201)
    })

    it('should return 201 when creating a transaction successfully (investment)', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: { ...baseHttpRequest.body, type: 'INVESTMENT' },
        })

        expect(result.statusCode).toBe(201)
    })

    it('should return 400 if user id is not provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...baseHttpRequest,
                user_id: undefined,
            },
        })

        expect(result.statusCode).toBe(400)
    })
    it('should return 400 if name is not provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...baseHttpRequest,
                name: undefined,
            },
        })

        expect(result.statusCode).toBe(400)
    })
    it('should return 400 if date is not provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...baseHttpRequest,
                date: undefined,
            },
        })

        expect(result.statusCode).toBe(400)
    })
    it('should return 400 if type is not provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...baseHttpRequest,
                type: undefined,
            },
        })

        expect(result.statusCode).toBe(400)
    })
    it('should return 400 if amount is not provided', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...baseHttpRequest,
                amount: undefined,
            },
        })

        expect(result.statusCode).toBe(400)
    })
    it('should return 400 if date is invalid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...baseHttpRequest,
                date: 'invalid_date',
            },
        })

        expect(result.statusCode).toBe(400)
    })
    it('should return 400 if type is not EXPENSE, EARNING or INVESTMENT', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: {
                ...baseHttpRequest,
                type: 'invalid_type',
            },
        })

        expect(result.statusCode).toBe(400)
    })
})
