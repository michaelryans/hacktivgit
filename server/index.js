const app = require('express')()
const router = require('./routers')

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use('/git', router)

const PORT = 3000
app.listen(PORT, (req,res) => {
    console.log(`Listening on port ${PORT}`)
})