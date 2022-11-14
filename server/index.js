require("dotenv").config()
const express = require('express')
const app = express()
app.use(express.json())
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
app.use(cors())
const port = process.env.PORT || 4000
const posts = [
    {
      username: "karthik",
      title: "Post one",
      content: "what I am thinking is...."
    },
    {
      username: "ghost",
      title: "Post two",
      content: "well.."
    },
    {
      username: "karthik",
      title: "Post three",
      content: "should ask her out..."
    },
    {
      username: "paul",
      title: "Post four",
      content: "maybe yes, why not?"
    },
]
const users = [
    {
        "name": "ghost",
        "password": "$2b$10$qbOn1BKilwGoCKIud99N7uIg1hDZvgbrJfFH6B5Y/sFiJMEAYN9Au"
    }
]
let refreshTokens = []

app.get('/users',(req,res)=>{
    res.json(users)
})
app.post('/users',async (req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10)

        const user = { 
            name: req.body.name, 
            password: hashedPassword
        }
        users.push(user)
        res.status(201)
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})

app.post('/token',(req,res)=>{
    const refreshToken = req.body.token
    if (refreshToken==null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403)
    }
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.send({accessToken:accessToken})
    })
})

app.post('/login', async (req,res)=>{

    const user = users.find(user => user.name === req.body.name)
    if (user == null){
        res.sendStatus(400).send("cannot find user")
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)
            res.send({accessToken:accessToken, refreshToken:refreshToken})
        }else{
            res.send("not allowed")
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send()
    }
})

app.delete('/logout',(req,res)=>{
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'7200s'})
}

app.get('/posts',(req,res)=>{
    res.send(posts)
})

app.post("/posts/create-a-post",(req,res)=>{
    let post = req.body.post
    posts.push(post)
    res.send(posts)
})

app.delete('/posts/delete-post',(req,res)=>{
    posts.splice(req.body.id,1)
    res.send(posts)
})

app.listen(port)