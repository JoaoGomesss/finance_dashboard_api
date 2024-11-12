import { UserNotFoundError } from '../../errors/user.js'

export class GetTransactionByUserIdUseCase {
    constructor(
        postgresGetTransactionsByUserIdRepository,
        getUserByIdRepository,
    ) {
        this.postgresGetTransactionsByUserIdRepository =
            postgresGetTransactionsByUserIdRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(userId) {
        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const transactions =
            await this.postgresGetTransactionsByUserIdRepository.execute(userId)

        return transactions
    }
}
