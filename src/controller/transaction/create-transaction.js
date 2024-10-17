import {
    checkIfIdIsValid,
    created,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
    serverError,
    validateRequiredFields,
    checkIfAmountIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidTypeResponse,
} from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']

            const { ok: requiredFieldsWereProvided, missingField } =
                validateRequiredFields(params, requiredFields)

            if (!requiredFieldsWereProvided) {
                return requiredFieldIsMissingResponse(missingField)
            }

            const userIdIsValid = checkIfIdIsValid(params.user_id)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            const amountIsValid = checkIfAmountIsValid(params.amount)

            if (!amountIsValid) {
                invalidAmountResponse()
            }

            const type = params.type.trim().toUpperCase()

            const typeIsValid = checkIfTypeIsValid(type)

            if (!typeIsValid) {
                invalidTypeResponse()
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
