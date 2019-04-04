const app = require('express')()
const router = require('./routers')


var bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/git_database', {useNewUrlParser:true})

const cors = require('cors')
 
app.use(cors())


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use('/git', router)

const PORT = 3000
app.listen(PORT, (req,res) => {
    console.log(`Listening on port ${PORT}`)
})