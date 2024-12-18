import { PostgresUpdateTransactionRepository } from './update-transactions'
import { prisma } from '../../../../prisma/prisma'
import { transaction, user } from '../../../tests/'
import dayjs from 'dayjs'
import { TransactionType } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { TransactionNotFoundError } from '../../../errors'

describe('PostgresUpdateTransactionRepository', () => {
    it('should update transactions on db', async () => {
        await prisma.user.create({ data: user })
        await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        })
        const params = {
            id: faker.string.uuid(),
            user_id: user.id,
            name: faker.commerce.productName(),
            date: faker.date.anytime().toISOString(),
            type: TransactionType.EARNING,
            amount: Number(faker.finance.amount()),
        }

        const sut = new PostgresUpdateTransactionRepository()

        const result = await sut.execute(transaction.id, params)

        expect(result.name).toBe(params.name)
        expect(result.id).toBe(params.id)
        expect(result.user_id).toBe(user.id)
        expect(result.type).toBe(params.type)
        expect(String(result.amount)).toBe(String(params.amount))
        expect(dayjs(result.date).daysInMonth()).toBe(
            dayjs(params.date).daysInMonth(),
        )
        expect(dayjs(result.date).month()).toBe(dayjs(params.date).month())
        expect(dayjs(result.date).year()).toBe(dayjs(params.date).year())
    })

    it('should call Prisma with correct params', async () => {
        await prisma.user.create({ data: user })
        await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        })
        const sut = new PostgresUpdateTransactionRepository()
        const prismaSpy = import.meta.jest.spyOn(prisma.transaction, 'update')

        await sut.execute(transaction.id, { ...transaction, user_id: user.id })

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: transaction.id,
            },
            data: { ...transaction, user_id: user.id },
        })
    })

    it('shoul throw if Prisma throws', async () => {
        const sut = new PostgresUpdateTransactionRepository()
        import.meta.jest
            .spyOn(prisma.transaction, 'update')
            .mockRejectedValueOnce(new Error())

        const promise = sut.execute(transaction.id, transaction)

        await expect(promise).rejects.toThrow()
    })

    it('should throw TransactionNotFoundError if Prisma does not find record to update', async () => {
        const sut = new PostgresUpdateTransactionRepository()
        import.meta.jest
            .spyOn(prisma.transaction, 'update')
            .mockRejectedValueOnce(
                new PrismaClientKnownRequestError('', { code: 'P2025' }),
            )

        const promise = sut.execute(transaction.id, transaction)

        await expect(promise).rejects.toThrow(
            new TransactionNotFoundError(transaction.id),
        )
    })
})
