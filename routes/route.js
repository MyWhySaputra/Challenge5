const express = require('express')
const userRoute = require('./user.route')
const accountRoute = require('./bank.account.route')
const transactionRoute = require('./transaction.route')
const morgan = require('morgan')

// version 1 
const v1 = express.Router()
v1.use(morgan('dev'));
v1.use('/', [userRoute, accountRoute, transactionRoute])

// version 2
const v2 = express.Router()
v2.use(morgan('dev'))
v2.use('/', [userRoute, accountRoute, transactionRoute])

const router = express.Router()
router.use('/api/v1', v1)
router.use('/api/v2', v2)

// default version
router.use('/api', v2)

module.exports = router