const { Insert, Get, GetByPK, Update, Delete } = require('../controller/bank.account.controller')

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
            bank_account_number: '1234567891',
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

describe('Get function', () => {

    const mockRequest = (query) => ({ query });
    const mockResponse = () => {
        const res = {};
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    it('get data with query bank account number', async () => {
        const req = mockRequest({
            bank_account_number: '1234567890',
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
            bank_account_number: '123456',
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
            id: expect.any(Number),
            user_id: expect.any(Number),
            bank_name: expect.any(String),
            bank_account_number: expect.any(String),
            balance: expect.any(Number),
            user: expect.objectContaining({
                name: expect.any(String),
                email: expect.any(String),
                profile: expect.objectContaining({
                    identity_type: expect.any(String),
                    identity_number: expect.any(String),
                    address: expect.any(String),
                }),
            }),
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

describe('Update function', () => {
    const mockRequest = (params, body) => ({ params, body });
    const mockResponse = () => {
        const res = {};
        res.json = jest.fn().mockReturnValue(res);
        return res
    }

    it('should update user data when valid data is provided', async () => {
        const req = mockRequest({ id: 2 }, { bank_name: 'BCA' })
        const res = mockResponse()

        await Update(req, res)

        expect(res.json).toHaveBeenCalledWith({
        data: expect.objectContaining({
            id: expect.any(Number),
            user_id: expect.any(Number),
            bank_name: 'BCA',
            bank_account_number: expect.any(String),
            balance: expect.any(Number),
            user: expect.objectContaining({
                name: expect.any(String),
                email: expect.any(String),
                profile: expect.objectContaining({
                    identity_type: expect.any(String),
                    identity_number: expect.any(String),
                    address: expect.any(String),
                }),
            }),
        }),
        message: 'success',
        error: null,
        status: 200,
        })
    })

    it('should respond with "bad request" when no valid data is provided', async () => {
        const req = mockRequest({ id: 2 }, {}); // memberikan data kosong
        const res = mockResponse()

        await Update(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'bad request',
            error: null,
            status: 400,
        })
    })
})

describe('Delete function', () => {
    const mockRequest = (params) => ({ params })
    const mockResponse = () => {
        const res = {}
        res.json = jest.fn().mockReturnValue(res)
        return res
    }

    it('should respond with "data not found" when user is not found', async () => {
        const req = mockRequest({ bank_account_number: 999 }); // ID yang tidak ada dalam database
        const res = mockResponse()

        await Delete(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'data not found',
            error: null,
            status: 404,
        })
    })

    it('should delete user data and associated profile', async () => {
        const req = mockRequest({ bank_account_number: 1234567890 }) // ID yang ada dalam database
        const res = mockResponse()

        await Delete(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'success',
            error: null,
            status: 200,
        })
    })
})