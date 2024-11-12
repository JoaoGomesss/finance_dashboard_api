import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(postgresGetUserBalanceRepository, getUserByIdRepository) {
        this.postgresGetUserBalanceRepository = postgresGetUserBalanceRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(userId) {
        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const balance =
            await this.postgresGetUserBalanceRepository.execute(userId)

        return balance
    }
}
