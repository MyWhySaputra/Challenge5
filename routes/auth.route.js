const express = require('express')
const router = express.Router()
const { Create, Login } = require('../controller/auth.controller')
const { Restrict } = require('../middleware/middleware')
const { ResponseTemplate } = require('../helper/template.helper')

/**
 * @swagger
 * /api/v2/auth/create:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: example to create user
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
router.post('/auth/create', Create)

/**
 * @swagger
 * /api/v2/users/login:
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

/**
 * @swagger
 * /api/v2/auth/authenticate:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: example to get authenticated user
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         description: The token
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post('/auth/authenticate', Restrict, (req, res) => {
    let user = {
        user: req.user
    }
    let resp = ResponseTemplate(user, 'success', null, 200)
    return res.json(resp)
})


module.exports = router