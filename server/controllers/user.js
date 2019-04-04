require('dotenv').config()
const axios = require('axios')
const ax = axios.create({
    baseURL: 'https://api.github.com'
})
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


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
            if(!req.query.name) console.log('ngga ada query nih')
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

    static login(req,res) {

        const token = req.body.token
        client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
          .then(ticket => {
              const payload = ticket.getPayload();
              const userid = payload.sub

              User.findOne({email:payload.email})
                .then(data=> {
                    const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    if(!data) {
                        console.log('masuk if')
                        User.create({
                            id: userid,
                            name: payload.name,
                            image: payload.image,
                            email: payload.email,
                            password: bcrypt.hashSync(random,10)
                        })
                        .then(user => {
                            const token = jwt.sign({
                                name: user.name,
                                image: user.image,
                                email: user.email
                            }, process.env.JWT_TOKEN)
                            res.json(token)
                        })
                        .catch(err => {
                            res.json({message:err, keterangan:"eror di user create"})
                        })
                    } else {
                        console.log('masuk else')
                        const token = jwt.sign({
                            name: data.name,
                            image: data.image,
                            email: data.email
                        }, process.env.JWT_TOKEN)
                        res.json({token:token,})
                    }
                })
                .catch(err => {
                    res.json({message:err, keterangan:'eror di findOne'})
            })
        })
        

    }
}

module.exports = UserController