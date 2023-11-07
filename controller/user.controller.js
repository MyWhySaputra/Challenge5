const { ResponseTemplate } = require('../helper/template.helper')
const { HashPassword } = require('../helper/hash_pass_helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {

    const { name, email, password, identity_type, identity_number, address } = req.body

    const hashPass = await HashPassword(password)

    const payload = {
        name,
        email,
        password: hashPass,
        profile: {
            create: {
                identity_type,
                identity_number,
                address
            }
        }
    }

    const emailUser = await prisma.user.findUnique({
        where: {email: payload.email},
    });

    if (emailUser) {
        let resp = ResponseTemplate(null, 'Email already exist', null, 404)
        res.json(resp)
        return
    }

    try {
        
        await prisma.user.create({
            data: payload,
            include: {
                profile: true
            }
        });

        const userView = await prisma.user.findUnique({
            where: {
                email: payload.email
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        identity_type: true,
                        identity_number: true,
                        address: true
                    }
                }
            },
        });

        let resp = ResponseTemplate(userView, 'success', null, 200)
        res.json(resp);
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return

    }
}

async function Get(req, res) {

    const { name, email, password, page = 1, limit = 10 } = req.query

    const payload = {}

    if (name) payload.name = name
    if (email) payload.email = email
    if (password) payload.password = password

    try {
        const skip = ( page - 1 ) * limit

        //informasi total data keseluruhan 
        const resultCount = await prisma.user.count() // integer jumlah total data user

        //generated total page
        const totalPage = Math.ceil( resultCount / limit)

        const users = await prisma.user.findMany({
            //take : 10,
            take : parseInt(limit),
            //skip : 10
            skip:skip,
            where: payload,
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        identity_type: true,
                        identity_number: true,
                        address: true
                    }
                }
            },
        });
        
        const pagination = {
            current_page: page - 0, // ini - 0 merubah menjadi integer
            total_page : totalPage,
            total_data: resultCount,
            data: users
        }
        const cekUser = (objectName) => {
            return Object.keys(objectName).length === 0
        }
        
        if (cekUser(users) === true) {
            let resp = ResponseTemplate(null, 'data not found', null, 404)
            res.json(resp)
            return
        }

        let resp = ResponseTemplate(pagination, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}

async function GetByPK(req, res) {

    const { id } = req.params

    try {
        const users = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        identity_type: true,
                        identity_number: true,
                        address: true
                    }
                }
            }
        })

        if (users === null) {
            let resp = ResponseTemplate(null, 'data not found', null, 404)
            res.json(resp)
            return
        }

        let resp = ResponseTemplate(users, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}

async function Update(req, res) {

    const { name, email, password, identity_type, identity_number, address } = req.body
    const { id } = req.params

    const payload = {}
    const update = {}
    const profile = {update}

    if (!name && !email && !password && !identity_type && !identity_number && !address) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (name) payload.name = name
    if (email) payload.email = email
    if (password) payload.password = password
    if (identity_type || identity_number || address) payload.profile = profile
    if (identity_type) update.identity_type = identity_type
    if (identity_number) update.identity_number = identity_number
    if (address) update.address = address

    try {
        const users = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: payload,
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        identity_type: true,
                        identity_number: true,
                        address: true
                    }
                }
            }
        })

        let resp = ResponseTemplate(users, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}

async function Delete(req, res) {

    const { id } = req.params

    try {

        const checkUser = await prisma.user.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (checkUser === null) {
            let resp = ResponseTemplate(null, 'data not found', null, 404)
            res.json(resp)
            return
        }

        await prisma.profile.delete({
            where: {
                user_id: Number(id)
            },
        })

        await prisma.user.delete({
            where: {
                id: Number(id)
            },
        })

        let resp = ResponseTemplate(null, 'data deleted', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}


module.exports = {
    Insert,
    Get,
    GetByPK,
    Update,
    Delete
}