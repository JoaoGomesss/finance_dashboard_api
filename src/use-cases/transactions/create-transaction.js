import { v4 as uuidv4 } from 'uuid'
import { UserNotFoundError } from '../../errors/user'

export class CreateTransactionUseCase {
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(createTransactionsParams) {
        const userId = createTransactionsParams.userId

        const user = await this.getUserByIdRepository(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const transactionId = uuidv4()

        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionsParams,
            id: transactionId,
        })

        return transaction
    }
}
