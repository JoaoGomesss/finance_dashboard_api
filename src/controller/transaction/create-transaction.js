import validator from 'validator'
import {
    checkIfIdIsValid,
    created,
    invalidIdResponse,
    serverError,
} from '../helpers'
import { badRequest } from '../helpers'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.params

            const requiredFields = [
                'id',
                'userId',
                'name',
                'date',
                'amount',
                'type',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().lenght === 0) {
                    return badRequest({ message: `Missing param: ${field}` })
                }
            }

            const userIdIsValid = httpRequest.params.userId

            checkIfIdIsValid(userIdIsValid)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            if (params.amount <= 0) {
                return badRequest({
                    message: 'The amount must be greater than 0.',
                })
            }

            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                },
            )

            if (!amountIsValid) {
                return badRequest({
                    message: 'The amount must be a valid currency.',
                })
            }

            const type = params.type.trim().toUpperCase()

            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type,
            )

            if (!typeIsValid) {
                return badRequest({
                    message: 'The type must be EARNING, EXPENSE, INVESTMENT',
                })
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            })

            return created(transaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
