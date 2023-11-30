const express = require('express')
const router = express.Router()
const { Register, Login } = require('../controller/auth.controller')

/**
 * @swagger
 * /api/v2/auth/register:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: example to register user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                identity_type:
 *                  type: string
 *                identity_number:
 *                  type: string
 *                address:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post('/auth/register', Register)

/**
 * @swagger
 * /api/v2/auth/login:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: example to login user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.post('/auth/login', Login)

module.exports = router