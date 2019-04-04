require('dotenv').config()
const router = require('express').Router()
const UserController = require('../controllers/user')


router.post('/login', UserController.login)

//delete a star from authenticated user specific repo
router.delete('/starred/:owner/:repo', UserController.unstar)

//filter by querry for repos owned by specific user
router.get('/:owner/search', UserController.search)

//filter by querry for *STARRED* repos owned by specific user
router.get('/:owner/search/starred', UserController.searchStarred)

//search all *STARRED* repo owned by user
router.get('/:owner/starred', UserController.starred)

//get list of all stargazers from specific repo
router.get('/:owner/:repo/stargazers', UserController.getStarRepo)

//create repo --> req.body repoName: ...
router.post('/create', UserController.createRepo)

//get all repo from authenticated user ( use api key )
router.get('/create', UserController.read)

//error 404
router.get('/*', (req,res) => {
    res.status(404).json("Error 404")
})



module.exports = router