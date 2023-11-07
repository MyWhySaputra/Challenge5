const { Insert, Get, GetByPK, Update, Delete } = require('../controller/bank.account.controller')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

describe('Insert function', () => {

    const mockRequest = (body) => ({ body })
    const mockResponse = () => {
        const res = {};
        res.json = jest.fn().mockReturnValue(res);
        return res
    }

    it('Create: user not found', async () => {
        const req = mockRequest({
            user_id: '1',
            bank_name: 'BCA',
            bank_account_number: '1234567890',
            balance: '100000'
        })

        const res = mockResponse()

        await Insert(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'user not found',
            error: null,
            status: 404,
        })
    })

    it('Create: bank account number already exists', async () => {
        const req = mockRequest({
            user_id: '1',
            bank_name: 'BCA',
            bank_account_number: '1234567890',
            balance: '100000'
        })

        const res = mockResponse()

        await Insert(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'bank account number already exists',
            error: null,
            status: 400,
        })
    })

    it('Create: create bank account', async () => {
        const req = mockRequest({
            user_id: '29',
            bank_name: 'BCA',
            bank_account_number: '12345678',
            balance: '100000'
        })
        const res = mockResponse();

        await Insert(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: expect.any(Object), // User data
            message: 'success',
            error: null,
            status: 200,
        })
    })
})