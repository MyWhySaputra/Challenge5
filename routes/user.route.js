const express = require('express')
const router = express.Router()
const { Insert, Login, Get, GetByPK, Update, Delete } = require('../controller/user.controller')
const { CheckPostUser, CheckIdUser, Restrict } = require('../middleware/middleware')
const { ResponseTemplate } = require('../helper/template.helper')

/**
 * @swagger
 * /api/v2/users:
 *   post:
 *     tags:
 *      - "User"
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
router.post('/users/', CheckPostUser, Insert)

/**
 * @swagger
 * /api/v2/users/login:
 *   post:
 *     tags:
 *      - "User"
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
router.post('/users/login', Login)

// /**
//  * @swagger
//  * /api/v2/users/auth:
//  *   post:
//  *     tags:
//  *      - "User"
//  *     summary: example to get authenticated user
//  *     parameters:
//  *       - in: headers
//  *         name: Authorization
//  *         required: true
//  *         description: The token
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Successful response
//  */
router.post('/users/auth', Restrict, (req, res) => {
    let user = {
        user: req.user
    }
    let resp = ResponseTemplate(user, 'success', null, 200)
    return res.json(resp)
})

/**
 * @swagger
 * /api/v2/users/:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Get all user
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: The name of the user
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: false
 *         description: The email of the user
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: false
 *         description: The password of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */
router.get('/users/', Get)

/**
 * @swagger
 * /api/v2/users/{id}:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Get one user
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
router.get('/users/:id', GetByPK)

/**
 * @swagger
 * /api/v2/users/{id}:
 *   put:
 *     tags:
 *      - "User"
 *     summary: Get one user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
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
 *       400:
 *         description: Bad request
 */
router.put('/users/:id', CheckIdUser, Update)

/**
 * @swagger
 * /api/v2/users/{id}:
 *   delete:
 *     tags:
 *      - "User"
 *     summary: Get one user
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
router.delete('/users/:id', CheckIdUser, Delete)


module.exports = router