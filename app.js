const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config()
// const bcrypt = require('bcrypt')
// const saltRounds = 10
const mongoose = require('mongoose')
const url = `${process.env.MONGO}/todolistmainDB`
const {Schema} = mongoose
const app = express()
const port = 3000

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
const itemsSchema = new Schema({
    listItem:{
        type:String,
        required:true
    }
})
// const usersSchema = new Schema({
//     username:{
//         type:String
//     },
//     email:{
//         type:String
//     },
//     password:{
//         type:String
//     }
// })
const Item = mongoose.model('active', itemsSchema)
itemsSchema.set('toObject', {virtuals:true})
const Completed = mongoose.model('copy', itemsSchema)
// const User = mongoose.model('user', usersSchema)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

// //AUTHENTICATION ROUTES
// app.get('/', (req, res) => {
//     res.render('home')
// })
// app.get('/register', (req, res) => {
//     res.render('register')
// })
// app.post('/register', (req, res) => {
//     const username = req.body.username
//     const password = req.body.password
//     const email = req.body.email
//     bcrypt.hash(password, saltRounds, function(err, hash) {
//         User.create({username, password:hash, email}, (err) => err && err)
//     });
//     res.redirect('/active')
// })
//TODOLIST ROUTES
app.get('/', (req, res) => {
    Item.find((err, result) => {
        res.render('active', {newListItem: result})
    })
    
})
app.get('/completed', (req, res) => {
    Completed.find((err, result) => {
        res.render('completed', {existingListItem: result})
    })
})
app.get('/all', (req, res) => {
    Item.find((err, result1) => {
        Completed.find((err, result) => {
            res.render('all', {existingListItem:result, newListItem:result1})
        })
    })
    
    
})
app.post('/all', (req, res) => {
    const newItem = req.body.newItem
    Item.create({listItem: newItem}, (err) => {
        if(err) return err
    })
    res.redirect('/all')
})
app.post('/', (req, res) => {
    
    const newItem = req.body.newItem
    Item.create({listItem: newItem}, (err) => {
        if(err) return err
    })
    res.redirect('/')
})
app.post('/delete', (req, res) => {
    const deleteItem = req.body.deleteItem
    Item.deleteOne({_id:deleteItem}, (err, result) => {
        if(err) return err
    })
    res.redirect('/')
})
app.post('/all/delete', (req, res) => {
    const deleteItem = req.body.deleteItem
    Item.deleteOne({_id:deleteItem}, (err, result) => {
        if(err) return err
    })
    res.redirect('/all')
})
app.post('/del', (req, res) => {
    const deleteItem = req.body.delItem
    Completed.deleteOne({_id:deleteItem}, (err, result) => {
        if(err) return err
    })
    res.redirect('/completed')
})
app.post('/d', (req, res) => {
    Completed.deleteMany({}, (err) => {
        if(err) return err
    })
    res.redirect('/')
})
app.post('/completed', (req, res) => {
    const listItem = req.body.checked
    Item.deleteOne({listItem}, (err) => {
        if(err) return err
    })
    Completed.create({listItem}, (err) => {
        if(err) return err
    })
    res.redirect('/')
})
app.post('/all/completed', (req, res) => {
    const listItem = req.body.checked
    Item.deleteOne({listItem}, (err) => {
        if(err) return err
    })
    Completed.create({listItem}, (err) => {
        if(err) return err
    })
    res.redirect('/all')
})
app.listen(process.env.PORT || 3000, () => console.log(`App listening on port 3000!`))