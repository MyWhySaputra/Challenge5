const express = require('express')
const router = express.Router()
const { Insert, Get, GetByPK, Update, Delete } = require('../controller/user.controller')
const { CheckPostUser, CheckIdUser } = require('../middleware/middleware')

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
 */
router.post('/users/', CheckPostUser, Insert)

/**
 * @swagger
 * /api/v2/users/:
 *   get:
 *     tags:
 *      - "User"
 *     summary: Get all user
 *     responses:
 *       200:
 *         description: Successful response
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
 *     responses:
 *       200:
 *         description: Successful response
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
 */
router.delete('/users/:id', CheckIdUser, Delete)



module.exports = router