// const { Insert, Login, Get, GetByPK, Update, Delete } = require('../controller/user.controller')
// const jwt = require('jsonwebtoken')
// const { PrismaClient} = require('@prisma/client')

// const prisma = new PrismaClient()


// describe('Insert function', () => {

//     const mockRequest = (body) => ({ body })
//     const mockResponse = () => {
//         const res = {};
//         res.json = jest.fn().mockReturnValue(res);
//         return res
//     }
    
//     it('Create: email already exists', async () => {
//         const req = mockRequest({
//             name: 'John Doe',
//             email: 'johndoe@example.com', // isi email yang sudah ada
//             password: 'password123',
//             identity_type: 'ID',
//             identity_number: '1234567890',
//             address: '123 Main St',
//         })

//         const res = mockResponse()

//         await Insert(req, res)

//         expect(res.json).toHaveBeenCalledWith({
//             data: null,
//             message: 'Email already exist',
//             error: null,
//             status: 404,
//         })
//     });

//     it('Create: create user', async () => {
//         const req = mockRequest({
//             name: 'New User',
//             email: 'newuser36@example.com',
//             password: 'newpassword123',
//             identity_type: 'ID',
//             identity_number: '1234567890',
//             address: '456 New St',
//         })
//         const res = mockResponse();

//         await Insert(req, res)

//         expect(res.json).toHaveBeenCalledWith({
//             data: expect.any(Object), // User data
//             message: 'success',
//             error: null,
//             status: 200,
//         })
//     })
// })

// describe('Login function', () => {
//     const mockRequest = (body) => ({ body });
//     const mockResponse = () => {
//         const res = {};
//         res.status = jest.fn().mockReturnValue(res)
//         res.json = jest.fn().mockReturnValue(res)
//         return res;
//     }

//     it('should login and return a JWT token', async () => {
//         const email = 'dakuy@gmail.com'
//         const password = 'dakuy12345'

//         // Mock Prisma findFirst method to return a user
//         const mockUser = { id: 1, email, password: 'hashedPassword' }
//         jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(mockUser)

//         // Mock jwt.sign to return a token
//         jest.spyOn(jwt, 'sign').mockReturnValue('mockedToken')

//         const req = mockRequest({ email, password })
//         const res = mockResponse()

//         await Login(req, res)

//         expect(res.json).toHaveBeenCalledWith({
//             data: 'mockedToken',
//             message: 'success',
//             error: null,
//             status: 200,
//         })
//     })

//     it('should respond with "email is not found or incorrect" for invalid email', async () => {
//         const email = 'joko@gmail.com'
//         const password = 'password123'

//         jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null)

//         const req = mockRequest({ email, password })
//         const res = mockResponse()

//         await Login(req, res)

//         expect(res.json).toHaveBeenCalledWith({
//             data: null,
//             message: 'email is not found or incorrect',
//             error: null,
//             status: 400,
//         })
//     })

//     it('should respond with "password is not correct" for incorrect password', async () => {
//         const email = 'johndoe@example.com'
//         const password = 'incorrectPassword'

//         const mockUser = { id: 1, email, password: 'hashedPassword' }
//         jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(mockUser)

//         const req = mockRequest({ email, password })
//         const res = mockResponse()

//         await Login(req, res)

//         expect(res.json).toHaveBeenCalledWith({
//             data: null,
//             message: 'password is not correct',
//             error: null,
//             status: 400,
//         })
//     })
// })

// describe('Get function', () => {

//     const mockRequest = (query) => ({ query });
//     const mockResponse = () => {
//         const res = {};
//         res.json = jest.fn().mockReturnValue(res);
//         return res;
//     };

//     it('should respond with success and data when users are found', async () => {
//         const req = mockRequest({
//             name: 'John Doe',
//         })
//         const res = mockResponse()

//         await Get(req, res);

//         expect(res.json).toHaveBeenCalledWith({
//             data: expect.objectContaining({
//                 current_page: expect.any(Number),
//                 total_page: expect.any(Number),
//                 total_data: expect.any(Number),
//                 data: expect.any(Array),
//             }),
//             message: 'success',
//             error: null,
//             status: 200,
//         });
//     });

//     it('should respond with data not found', async () => {
//         const req = mockRequest({
//             name: 'NonExistentUser',
//         })
//         const res = mockResponse()

//         await Get(req, res)

//         expect(res.json).toHaveBeenCalledWith({
//             data: null,
//             message: 'data not found',
//             error: null,
//             status: 404,
//         })
//     })
// })

// describe('GetByPK function', () => {
//     const mockRequest = (params) => ({ params })
//     const mockResponse = () => {
//         const res = {}
//         res.json = jest.fn().mockReturnValue(res)
//         return res
//     };

//     it('should respond with user data when user is found', async () => {
//         const req = mockRequest({ id: 21 }) // ID yang ada dalam database
//         const res = mockResponse()

//         await GetByPK(req, res)

//         expect(res.json).toHaveBeenCalledWith({
//         data: expect.objectContaining({
//             id: expect.any(Number),
//             name: expect.any(String),
//             email: expect.any(String),
//             profile: expect.objectContaining({
//                 identity_type: expect.any(String),
//                 identity_number: expect.any(String),
//                 address: expect.any(String),
//             }),
//         }),
//         message: 'success',
//         error: null,
//         status: 200,
//         })
//     })

//     it('should respond with "data not found" when user is not found', async () => {
//         const req = mockRequest({ id: 999 }); // ID yang tidak ada dalam database
//         const res = mockResponse()

//         await GetByPK(req, res)

//         expect(res.json).toHaveBeenCalledWith({
//             data: null,
//             message: 'data not found',
//             error: null,
//             status: 404,
//         })
//     })
// })

// describe('Update function', () => {
//     const mockRequest = (params, body) => ({ params, body });
//     const mockResponse = () => {
//         const res = {};
//         res.json = jest.fn().mockReturnValue(res);
//         return res
//     }

//     it('should update user data when valid data is provided', async () => {
//         const req = mockRequest({ id: 30 }, { name: 'Updated Name' })
//         const res = mockResponse()

//         await Update(req, res)

//         expect(res.json).toHaveBeenCalledWith({
//         data: expect.objectContaining({
//             id: expect.any(Number),
//             name: 'Updated Name',
//             email: expect.any(String),
//             profile: expect.objectContaining({
//                 identity_type: expect.any(String),
//                 identity_number: expect.any(String),
//                 address: expect.any(String),
//             }),
//         }),
//         message: 'success',
//         error: null,
//         status: 200,
//         })
//     })

//     it('should respond with "bad request" when no valid data is provided', async () => {
//         const req = mockRequest({ id: 1 }, {}); // memberikan data kosong
//         const res = mockResponse()

//         await Update(req, res)

//         expect(res.json).toHaveBeenCalledWith({
//             data: null,
//             message: 'bad request',
//             error: null,
//             status: 400,
//         })
//     })
// })

// describe('Delete function', () => {
//     const mockRequest = (params) => ({ params })
//     const mockResponse = () => {
//         const res = {}
//         res.json = jest.fn().mockReturnValue(res)
//         return res
//     }

//     it('should respond with "data not found" when user is not found', async () => {
//         const req = mockRequest({ id: 999 }); // ID yang tidak ada dalam database
//         const res = mockResponse()

//         await Delete(req, res)

//         expect(res.json).toHaveBeenCalledWith({
//             data: null,
//             message: 'data not found',
//             error: null,
//             status: 404,
//         })
//     })

//     it('should delete user data and associated profile', async () => {
//         const req = mockRequest({ id: 32 }) // ID yang ada dalam database
//         const res = mockResponse()

//         await Delete(req, res)

//         expect(res.json).toHaveBeenCalledWith({
//             data: null,
//             message: 'data deleted',
//             error: null,
//             status: 200,
//         })
//     })
// })
