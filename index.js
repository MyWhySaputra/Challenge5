const express = require('express')
const app = express()
const router = require('./routes/route')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
const swaggerDefinition = require('./helper/swagger_template.helper')

require('dotenv').config()

const port = process.env.PORT || 3000

const swaggerSpec = swaggerJsdoc(swaggerDefinition)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})