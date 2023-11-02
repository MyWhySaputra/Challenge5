const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/bank.account.controller')
const { CheckPostBankAccount, CheckIdBankAccount } = require('../middleware/middleware')

/**
 * @swagger
 * /api/v2/bank_accounts:
 *   post:
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
 */
router.post('/bank_accounts/', CheckPostBankAccount, Insert)

/**
 * @swagger
 * /api/v2/bank_accounts:
 *   get:
 *     tags:
 *      - "Bank Account"
 *     summary: Get all bank accounts
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/bank_accounts/', Get)

/**
 * @swagger
 * /api/v2/bank_accounts/{id}:
 *   get:
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
 */
router.get('/bank_accounts/:id', GetByPK)

/**
 * @swagger
 * /api/v2/bank_accounts/{id}:
 *   put:
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
 */
router.put('/bank_accounts/:id', CheckIdBankAccount, Update)

/**
 * @swagger
 * /api/v2/bank_accounts/{bank_account_number}:
 *   delete:
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
 */
router.delete('/bank_accounts/:bank_account_number', Delete)


module.exports = router