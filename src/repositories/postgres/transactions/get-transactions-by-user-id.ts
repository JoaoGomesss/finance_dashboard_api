import { PostgresHelper } from '../../../db/postgres/helper'

export class PostgresGetTransactionsByUserId {
    async execute(user_id) {
        const transactions = await PostgresHelper.query(
            'SELECT * from transactions WHERE user_id = $1',
            [user_id],
        )
        return transactions
    }
}
