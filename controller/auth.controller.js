const { string, number } = require('joi')
const { HashPassword, ComparePassword } = require('../helper/hash_pass_helper')
const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
var jwt = require('jsonwebtoken')

async function Register(req, res) {

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

    if (req.body.identity_type !== 'KTP' && req.body.identity_type !== 'SIM') {
        let resp = ResponseTemplate(null, 'identity type must be KTP or SIM', null, 404)
        res.json(resp)
        return
    }

    if (req.body.identity_number !== parseInt(req.body.identity_number)) {
        let resp = ResponseTemplate(null, 'identity number must be number', null, 404)
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

async function Login(req, res) {

    try {
        const { email, password } = req.body

        const checkUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (checkUser === null) {
            let resp = ResponseTemplate(null, 'email is not found or incorrect', null, 400)
            res.json(resp)
            return
        }

        const checkPassword = await ComparePassword(password, checkUser.password)

        if (!checkPassword) {
            let resp = ResponseTemplate(null, 'password is not correct', null, 400)
            res.json(resp)
            return
        }

        const token = jwt.sign({
            email: checkUser.email,
            user_id: checkUser.id
        }, process.env.SECRET_KEY);

        let resp = ResponseTemplate(token, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}

module.exports = {
    Register,
    Login
}