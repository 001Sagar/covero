const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

const auth = require('./routes/auth')

 port = process.env.PORT || 8000;


//connect the mongoDB
const db = require('./config/mongoose');

// Set Up the view Engine
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// Route of the main page
app.get('/main', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

//Route of the Sign up page
app.get('/', async (req,res) =>{
    res.render('home');
 })

// Routes 

app.use('/user',auth);
app.use('/articles', articleRouter)

app.listen(port,function(err){
  if(err){
      console.log('Error in connection to the server',err)
  }
  console.log('Server run on port::',port)
})