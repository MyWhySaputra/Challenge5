const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function Insert(req, res) {

    console.log(req.body)

    const { source_account_id, destination_account_id, amount } = req.body

    const payload = {
        source_account_id: parseInt(source_account_id),
        destination_account_id: parseInt(destination_account_id),
        amount: parseInt(amount),
    }

    try {

        const source = await prisma.bankAccounts.findUnique({
        where: {bank_account_number: payload.source_account_id},
        });
        const destination = await prisma.bankAccounts.findUnique({
        where: {bank_account_number: payload.destination_account_id},
        });

        if (!source || !destination) {
            let resp = ResponseTemplate(null, 'Source or destination account not found', null, 404)
            res.json(resp)
            return
        }

        if (source.balance < payload.amount) {
            let resp = ResponseTemplate(null, 'your balance is not enough', null, 400)
            res.json(resp)
            return
        }

        await prisma.bankAccounts.update({
        where: {bank_account_number: payload.source_account_id},
        data: {balance: {decrement: payload.amount}},
        })

        await prisma.bankAccounts.update({
        where: {bank_account_number: payload.destination_account_id},
        data: {balance: {increment: payload.amount}},
        })

        const transaction = await prisma.transactions.create({
            data: payload
        })

        let resp = ResponseTemplate(transaction, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return

    }
}

async function Get(req, res) {

    const { source_account_id, destination_account_id, amount  } = req.query

    const payload = {}

    if (source_account_id) {
        payload.source_account_id = source_account_id
    }

    if (destination_account_id) {
        payload.destination_account_id = destination_account_id
    }

    if (amount) {
        payload.amount = amount
    }

    try {

        // let page =1
        // let limit = 10
        let { page = 1, limit = 10 } = req.query // menghasilkan string
        let skip = ( page - 1 ) * limit

        //informasi total data keseluruhan 
        const resultCount = await prisma.transactions.count() // integer jumlah total data user

        //generated total page
        const totalPage = Math.ceil( resultCount / limit)

        const transaction = await prisma.transactions.findMany({
            //take : 10,
            take : parseInt(limit),
            //skip : 10
            skip:skip,
            where: payload,
            select: {
                id: true,
                source_account_id: true,
                bank_account_source: {
                    select: {
                        bank_name: true,
                        bank_account_number: true,
                        user: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                destination_account_id: true,
                bank_account_destination: {
                    select: {
                        bank_name: true,
                        bank_account_number: true,
                        user: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                amount: true,
            }
        });

        const pagination = {
            current_page: page - 0, // ini - 0 merubah menjadi integer
            total_page : totalPage,
            total_data: resultCount,
            data: transaction
        }

        if (transaction === null) {
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
        const transaction = await prisma.transactions.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                source_account_id: true,
                bank_account_source: {
                    select: {
                        bank_name: true,
                        bank_account_number: true,
                        user: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                destination_account_id: true,
                bank_account_destination: {
                    select: {
                        bank_name: true,
                        bank_account_number: true,
                        user: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                amount: true,
            }
        })

        if (transaction === null) {
            let resp = ResponseTemplate(null, 'data not found', null, 404)
            res.json(resp)
            return
        }

        let resp = ResponseTemplate(transaction, 'success', null, 200)
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
    GetByPK
}