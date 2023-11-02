const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {

    const { user_id, bank_name, bank_account_number, balance } = req.body

    const payload = {
        user_id: parseInt(user_id),
        bank_name,
        bank_account_number: parseInt(bank_account_number),
        balance: parseInt(balance)
    }

    try {
        const account = await prisma.bankAccounts.create({
            data: payload,
        })

        let resp = ResponseTemplate(account, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return

    }
}

async function Get(req, res) {

    const { user_id, bank_name, bank_account_number, balance  } = req.query

    const payload = {}

    if (user_id) {
        payload.user_id = user_id
    }

    if (bank_name) {
        payload.bank_name = bank_name
    }

    if (bank_account_number) {
        payload.bank_account_number = bank_account_number
    }

    if (balance) {
        payload.balance = balance
    }

    try {

        // let page =1
        // let limit = 10
        let { page = 1, limit = 10 } = req.query // menghasilkan string
        let skip = ( page - 1 ) * limit

        //informasi total data keseluruhan 
        const resultCount = await prisma.bankAccounts.count() // integer jumlah total data user

        //generated total page
        const totalPage = Math.ceil( resultCount / limit)

        const bankAccount = await prisma.bankAccounts.findMany({
            //take : 10,
            take : parseInt(limit),
            //skip : 10
            skip:skip,
            where: payload,
            select: {
                id: true,
                user_id: true,
                bank_name: true,
                bank_account_number: true,
                balance: true,
                user: {
                    select: {
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
                }
            }
        });

        const pagination = {
            current_page: page - 0, // ini - 0 merubah menjadi integer
            total_page : totalPage,
            total_data: resultCount,
            data: bankAccount
        }

        if (bankAccount === null) {
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
        const bankAccount = await prisma.bankAccounts.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                user_id: true,
                bank_name: true,
                bank_account_number: true,
                balance: true,
                user: {
                    select: {
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
                }
            }
        });

        if (bankAccount === null) {
            let resp = ResponseTemplate(null, 'data not found', null, 404)
            res.json(resp)
            return
        }

        let resp = ResponseTemplate(bankAccount, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {

    const { user_id, bank_name, bank_account_number, balance } = req.body
    const { id } = req.params

    const payload = {}

    if (!user_id && !bank_name && !bank_account_number && !balance) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (user_id) {
        payload.user_id = user_id
    }

    if (bank_name) {
        payload.bank_name = bank_name
    }

    if (bank_account_number) {
        payload.bank_account_number = bank_account_number
    }

    if (balance) {
        payload.balance = balance
    }


    try {
        const account = await prisma.bankAccounts.update({
            where: {
                id: Number(id)
            },
            data: payload
        })

        let resp = ResponseTemplate(account, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Delete(req, res) {

    const { bank_account_number } = req.params

    try {

        const source = await prisma.transactions.findUnique({
            where: {
                source_account_id: Number(bank_account_number)
            }
        })

        const destination = await prisma.transactions.findUnique({
            where: {
                destination_account_id: Number(bank_account_number)
            }
        })

        if (source) {
            await prisma.transactions.delete({
                where: {
                    source_account_id: Number(bank_account_number)
                },
            })
        }

        if (destination) {
            await prisma.transactions.delete({
                where: {
                    destination_account_id: Number(bank_account_number)
                },
            })
        }

        await prisma.bankAccounts.delete({
            where: {
                bank_account_number: Number(bank_account_number)
            },
        })

        let resp = ResponseTemplate(null, 'success', null, 200)
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