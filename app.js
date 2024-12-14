const express = require('express');
const morgan = require('morgan')

const app = express();
const userModel = require('./models/user')
const dbConnection = require('./config/db')

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


app.set("view engine", 'ejs')



app.get('/', (req, res) => {
    res.render('index')


})
app.get('/about', (req, res) => {
    res.send('Hello i am abhinash')

})
app.get('/profile', (req, res) => {
    res.send('profile page')

})
app.get('/register', (req, res) => {
    res.render('register')

})
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    const newUser = await userModel.create({
        username: username,
        email: email,
        password: password
    })
    res.send(newUser)
})

app.get('/get-users', (req, res) => {
    userModel.findOne({
        username:"a"
    }).then((user) => {
        res.send(user)
    })
})


app.get('/update-user', async (req, res) => {
    await userModel.findOneAndUpdate({
        username: "a"
        }, {
            email:"c@gyg.com"
        })
        res.send("user update")
    })

app.get('/delete-user', async(req, res) =>{
       await userModel.findOneAndDelete({
        username: "a"
       })
       res.send("user deleted")}
    
    )    


app.post('/get-form-data', (req, res) => {
    console.log(req.body);

    res.send('data received')

})

app.listen(3000)