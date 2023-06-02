const express = require('express')
const app = express()

const logger = require('morgan')
const cors = require('cors')
const swaggerUi = require("swagger-ui-express")
const swagger = require('./docs/swagger.json');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

const specs = swagger;
app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

//somewhere in here app.use (router)
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})

module.exports = { app }