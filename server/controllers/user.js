require('dotenv').config()
const axios = require('axios')
const ax = axios.create({
    baseURL: 'https://api.github.com'
})

ax.defaults.headers.common['Authorization'] = `token ${process.env.GIT_TOKEN}`

class UserController {
    static getStarRepo(req,res) {
        ax
         .get(`/repos/${req.params.owner}/${req.params.repo}/stargazers`)
         .then(({data}) => {
             res.status(201).json(data)
         })
         .catch(err => {
             res.status(500).json(err)
         })
    }

    static starred(req,res) {
        ax.get(`/users/${req.params.owner}/starred`)
         .then( ({ data }) => {
            console.log(req.query)
            if(!req.query.name) console.log('ngga ada nih')
            res.status(200).json(data)
         })
         .catch(err => {
             res.status(500).json(err)
         })
    }

    static search(req,res) {
        ax
         .get(`/users/${req.params.owner}/repos`)
         .then( ({ data }) => {

            let mapped = []
            let datacopy = data
            datacopy.forEach(el => {
                if (el.name.includes(req.query.name)) {
                    mapped.push(el)
                } 
            })
             res.json(mapped)
         })
         .catch( err => {
             res.status(500).json(err)
         })
    }

    static searchStarred(req,res) {
        ax
         .get(`/users/${req.params.owner}/starred`)
         .then( ({ data }) => {
             
            console.log(req.query)

            let mapped = []
            let datacopy = data
            datacopy.forEach(el => {
                if (el.name.includes(req.query.name)) {
                    mapped.push(el)
                } 
            })
             res.json(mapped)
         })
         .catch( err => {
             res.status(500).json(err)
         })
    }

    static createRepo(req,res) {
        ax
         .post(`/user/repos`, {name: req.body.repoName})
         .then( ({ data }) => {
             res.status(201).json(data)
         })
         .catch( err => {
             res.status(500).json(err)
         })
    }

    static read(req,res) {
        ax
         .get(`/user/repos`)
         .then( ({ data }) => {
             let output = data.map(el => el = el.name)
             console.log(output)
             res.status(201).json(output)
         })
         .catch( err => {
             res.status(500).json(err)
         })
    }

    static unstar(req,res) {
        ax
         .delete(`/user/starred/${req.params.owner}/${req.params.repo}`)
         .then(({data}) => {
             console.log(req.params)
             res.json(data)
         })
         .catch(err => {
             res.status(500).json(err)
         })
    }
}

module.exports = UserController