const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/user.controller')
const { CheckPostUser, CheckIdUser, Auth } = require('../middleware/middleware')

/**
 * @swagger
 * /api/v2/users:
 *   post:
 *     security:
 *      - bearerAuth: []
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
router.post('/users/', Auth, CheckPostUser, Insert)

/**
 * @swagger
 * /api/v2/users/:
 *   get:
 *     security:
 *      - bearerAuth: []
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
router.get('/users/', Auth, Get)

/**
 * @swagger
 * /api/v2/users/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
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
router.get('/users/:id', Auth, GetByPK)

/**
 * @swagger
 * /api/v2/users/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
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
router.put('/users/:id', Auth, CheckIdUser, Update)

/**
 * @swagger
 * /api/v2/users/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
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
router.delete('/users/:id', Auth, CheckIdUser, Delete)


module.exports = router