const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/bank.account.controller')
const { CheckPostBankAccount, CheckIdBankAccount, Auth } = require('../middleware/middleware')

/**
 * @swagger
 * /api/v2/bank_accounts:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Bank Account"
 *     summary: example to create bank account
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: string
 *                bank_name:
 *                  type: string
 *                bank_account_number:
 *                  type: string
 *                balance:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.post('/bank_accounts/', Auth, CheckPostBankAccount, Insert)

/**
 * @swagger
 * /api/v2/bank_accounts:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Bank Account"
 *     summary: Get all bank accounts
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: false
 *         description: The ID of bank account
 *         schema:
 *           type: string
 *       - in: query
 *         name: bank_name
 *         required: false
 *         description: The name of bank account
 *         schema:
 *           type: string
 *       - in: query
 *         name: bank_account_number
 *         required: false
 *         description: The bank_account_number of bank account
 *         schema:
 *           type: string
 *       - in: query
 *         name: balance
 *         required: false
 *         description: The balance of bank account
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get('/bank_accounts/', Auth, Get)

/**
 * @swagger
 * /api/v2/bank_accounts/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Bank Account"
 *     summary: Get one bank account
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get('/bank_accounts/:id', Auth, GetByPK)

/**
 * @swagger
 * /api/v2/bank_accounts/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Bank Account"
 *     summary: Get one bank account
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.put('/bank_accounts/:id', Auth, CheckIdBankAccount, Update)

/**
 * @swagger
 * /api/v2/bank_accounts/{bank_account_number}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Bank Account"
 *     summary: Delete one bank account
 *     parameters:
 *       - in: path
 *         name: bank_account_number
 *         required: true
 *         description: The bank_account_number of the bank account
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.delete('/bank_accounts/:bank_account_number', Auth, Delete)


module.exports = router