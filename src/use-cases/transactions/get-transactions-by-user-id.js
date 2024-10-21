import { userNotFoundResponse } from '../../controller/helpers'

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
            return userNotFoundResponse()
        }

        const transactions =
            await this.postgresGetTransactionsByUserIdRepository.execute(
                params.user_id,
            )

        return transactions
    }
}
