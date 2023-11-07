const { Create, Login } = require('../controller/auth.controller')
const jwt = require('jsonwebtoken')
const { PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

describe('Create function', () => {

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
            identity_type: 'KTP',
            identity_number: '123456789',
            address: 'Depok',
        })

        const res = mockResponse()

        await Create(req, res)

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
            identity_type: 'KTP',
            identity_number: '123456787',
            address: 'Depok',
        })
        const res = mockResponse();

        await Create(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: expect.any(Object), // User data
            message: 'success',
            error: null,
            status: 200,
        })
    })
})

describe('Login function', () => {
    const mockRequest = (body) => ({ body });
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        return res;
    }

    it('should login and return a JWT token', async () => {
        const email = 'kiki@gmail.com'
        const password = 'kiki1234'

        const mockUser = { id: 1, email, password: 'hashedPassword' }
        jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(mockUser)

        jest.spyOn(jwt, 'sign').mockReturnValue('mockedToken')

        const req = mockRequest({ email, password })
        const res = mockResponse()

        await Login(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: 'mockedToken',
            message: 'success',
            error: null,
            status: 200,
        })
    })

    it('should respond with "email is not found or incorrect" for invalid email', async () => {
        const email = 'wahyu@gmail.com'
        const password = 'password123'

        jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null)

        const req = mockRequest({ email, password })
        const res = mockResponse()

        await Login(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'email is not found or incorrect',
            error: null,
            status: 400,
        })
    })

    it('should respond with "password is not correct" for incorrect password', async () => {
        const email = 'wahyu@gmail.com'
        const password = 'wahyu1234567'

        const mockUser = { id: 1, email, password: 'hashedPassword' }
        jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(mockUser)

        const req = mockRequest({ email, password })
        const res = mockResponse()

        await Login(req, res)

        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'password is not correct',
            error: null,
            status: 400,
        })
    })
})