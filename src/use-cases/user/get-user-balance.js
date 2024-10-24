import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(postgresGetUserBalanceRepository, getUserByIdRepository) {
        this.postgresGetUserBalanceRepository = postgresGetUserBalanceRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            throw new UserNotFoundError(params.userId)
        }

        const balance = await this.postgresGetUserBalanceRepository.execute(
            params.userId,
        )

        return balance
    }
}
