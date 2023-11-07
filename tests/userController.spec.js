const { Insert, Get, GetByPK, Update, Delete } = require('../controller/user.controller')


describe('Insert function', () => {

    const mockRequest = (body) => ({ body })
    const mockResponse = () => {
        const res = {};
        res.json = jest.fn().mockReturnValue(res);
        return res
    }
    
    it('Create: email already exists', async () => {
        const req = mockRequest({
            name: 'wahyu',
            email: 'wahyu@gmail.com', // isi email yang sudah ada
            password: 'password123',
            identity_type: 'ID',
            identity_number: '123456789',
            address: 'Depok',
        })

        const res = mockResponse()

        await Insert(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'Email already exist',
            error: null,
            status: 404,
        })
    });

    it('Create: create user', async () => {
        const req = mockRequest({
            name: 'Budi',
            email: 'budi@gmail.com',
            password: 'budi12345',
            identity_type: 'ID',
            identity_number: '123456787',
            address: 'Depok',
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

    it('should respond with success and data when users are found', async () => {
        const req = mockRequest({
            name: 'wahyu',
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

    it('should respond with data not found', async () => {
        const req = mockRequest({
            name: 'ininamatidakada',
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
        const req = mockRequest({ id: 35 }) // ID yang ada dalam database
        const res = mockResponse()

        await GetByPK(req, res)

        expect(res.json).toHaveBeenCalledWith({
        data: expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            email: expect.any(String),
            profile: expect.objectContaining({
                identity_type: expect.any(String),
                identity_number: expect.any(String),
                address: expect.any(String),
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
        const req = mockRequest({ id: 35 }, { name: 'ahmad rezza' })
        const res = mockResponse()

        await Update(req, res)

        expect(res.json).toHaveBeenCalledWith({
        data: expect.objectContaining({
            id: expect.any(Number),
            name: 'ahmad rezza',
            email: expect.any(String),
            profile: expect.objectContaining({
                identity_type: expect.any(String),
                identity_number: expect.any(String),
                address: expect.any(String),
            }),
        }),
        message: 'success',
        error: null,
        status: 200,
        })
    })

    it('should respond with "bad request" when no valid data is provided', async () => {
        const req = mockRequest({ id: 35 }, {}); // memberikan data kosong
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
        const req = mockRequest({ id: 999 }); // ID yang tidak ada dalam database
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
        const req = mockRequest({ id: 38 }) // ID yang ada dalam database
        const res = mockResponse()

        await Delete(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'data deleted',
            error: null,
            status: 200,
        })
    })
})
