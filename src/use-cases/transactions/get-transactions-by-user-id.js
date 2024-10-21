import { UserNotFoundError } from '../../errors/user.js'

export class GetTransctionByUserId {
    constructor(
        postgresGetTransactionsByUserIdRepository,
        getUserByIdRepository,
    ) {
        this.postgresGetTransactionsByUserIdRepository =
            postgresGetTransactionsByUserIdRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.user_id)

        if (!user) {
            throw new UserNotFoundError(params.user_id)
        }

        const transactions =
            await this.postgresGetTransactionsByUserIdRepository.execute(
                params.user_id,
            )

        return transactions
    }
}
