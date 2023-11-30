const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK } = require('../controller/transaction.controller')
const { CheckPostTransaction, Auth } = require('../middleware/middleware')

/**
 * @swagger
 * /api/v2/transactions:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Transaction"
 *     summary: example to create transaction
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                source_account_id:
 *                  type: string
 *                destination_account_id:
 *                  type: string
 *                amount:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post('/transactions/', Auth, CheckPostTransaction, Insert)

/**
 * @swagger
 * /api/v2/transactions:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Transaction"
 *     summary: Get all transactions
 *     parameters:
 *       - in: query
 *         name: source_account_id
 *         required: false
 *         description: The ID of source_account
 *         schema:
 *           type: string
 *       - in: query
 *         name: destination_account_id
 *         required: false
 *         description: The ID of destination_account
 *         schema:
 *           type: string
 *       - in: query
 *         name: amount
 *         required: false
 *         description: The amount of bank account
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/transactions/', Auth, Get)

/**
 * @swagger
 * /api/v2/transactions/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Transaction"
 *     summary: Get one transaction
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the transaction
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/transactions/:id', Auth, GetByPK)

module.exports = router