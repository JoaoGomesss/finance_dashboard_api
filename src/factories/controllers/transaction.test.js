import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionsByUserIdController,
    makeUpdateTransactionController,
} from './transaction'
import {
    CreateTransactionController,
    DeleteTransactionController,
    UpdateTransactionController,
    GetTransactionsByUserIdController,
} from '../../controller'

describe('TransactionControllerFactories', () => {
    it('should return a valid CreateTransactionController instance', async () => {
        expect(makeCreateTransactionController()).toBeInstanceOf(
            CreateTransactionController,
        )
    })
    it('should return a valid UpdateTransactionController instance', async () => {
        expect(makeUpdateTransactionController()).toBeInstanceOf(
            UpdateTransactionController,
        )
    })
    it('should return a valid DeleteTransactionController instance', async () => {
        expect(makeDeleteTransactionController()).toBeInstanceOf(
            DeleteTransactionController,
        )
    })
    it('should return a valid GetTransactionsByUserIdController instance', async () => {
        expect(makeGetTransactionsByUserIdController()).toBeInstanceOf(
            GetTransactionsByUserIdController,
        )
    })
})
