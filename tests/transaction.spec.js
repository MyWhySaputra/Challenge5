const { Insert, Get, GetByPK } = require('../controller/transaction.controller')

describe('Insert function', () => {

    const mockRequest = (body) => ({ body })
    const mockResponse = () => {
        const res = {};
        res.json = jest.fn().mockReturnValue(res);
        return res
    }
    
    it('Create: source or destination account not found', async () => {
        const req = mockRequest({
            source_account_id: '1',
            destination_account_id: '2',
            amount: '100'
        })

        const res = mockResponse()

        await Insert(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'Source or destination account not found',
            error: null,
            status: 404,
        })
    });

    it('Create: your balance is not enough', async () => {
        const req = mockRequest({
            source_account_id: '423423',
            destination_account_id: '12345678',
            amount: '1000000000'
        })

        const res = mockResponse()

        await Insert(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'your balance is not enough',
            error: null,
            status: 400,
        })
    });

    it('Create: success', async () => {
        const req = mockRequest({
            source_account_id: '423423',
            destination_account_id: '12345678',
            amount: '100'
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

describe('Get function', () => {

    const mockRequest = (query) => ({ query });
    const mockResponse = () => {
        const res = {};
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    it('get data with query bank account number', async () => {
        const req = mockRequest({
            source_account_id: '123456',
        })
        const res = mockResponse()

        await Get(req, res);

        expect(res.json).toHaveBeenCalledWith({
            data: expect.objectContaining({
                current_page: expect.any(Number),
                total_page: expect.any(Number),
                total_data: expect.any(Number),
                data: expect.any(Array),
            }),
            message: 'success',
            error: null,
            status: 200,
        });
    });

    it('data not found', async () => {
        const req = mockRequest({
            source_account_id: '123456624753',
        })
        const res = mockResponse()

        await Get(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'data not found',
            error: null,
            status: 404,
        })
    })
})

describe('GetByPK function', () => {
    const mockRequest = (params) => ({ params })
    const mockResponse = () => {
        const res = {}
        res.json = jest.fn().mockReturnValue(res)
        return res
    };

    it('should respond with user data when user is found', async () => {
        const req = mockRequest({ id: 1 }) // ID yang ada dalam database
        const res = mockResponse()

        await GetByPK(req, res)

        expect(res.json).toHaveBeenCalledWith({
        data: expect.objectContaining({
            source_account_id: expect.any(Number),
            bank_account_source: expect.objectContaining({
                bank_name: expect.any(String),
                bank_account_number: expect.any(String),
                user: expect.objectContaining({
                    name: expect.any(String),
                }),
            }),
            destination_account_id: expect.any(Number),
            bank_account_destination: expect.objectContaining({
                bank_name: expect.any(String),
                bank_account_number: expect.any(String),
                user: expect.objectContaining({
                    name: expect.any(String),
                }),
            }),
            amount: expect.any(Number),
        }),
        message: 'success',
        error: null,
        status: 200,
        })
    })

    it('should respond with "data not found" when user is not found', async () => {
        const req = mockRequest({ id: 999 }); // ID yang tidak ada dalam database
        const res = mockResponse()

        await GetByPK(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'data not found',
            error: null,
            status: 404,
        })
    })
})