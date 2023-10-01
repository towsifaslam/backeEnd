const express = require('express');
const dbConnect = require('./config/dbConnect');
const userRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');

const bodyParser = require('body-parser');
const { notFound, erroHandler } = require('./middlewares/errorHanldle');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

dbConnect()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan('dev'))
// app.use('/',(req,res)=>{
//   res.send('Hollo from server side')
// })

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.use(notFound)
app.use(erroHandler)
app.listen(PORT,()=>{
  console.log(`server is runnig at port ${PORT}`) 
})