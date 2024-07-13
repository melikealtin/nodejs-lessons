const express = require('express');
require('./db/db-connection')
const errorHandler = require('./middleware/error-handler')

//ROUTES
const userRouter = require('./router/user-router')

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users', userRouter)

app.get('/', (req,res) => {
    res.status(200).json({'message': 'welcome'})
})

app.use(errorHandler)

///use bcrypt for password
// const bcrypt = require('bcrypt')

// const test = async () => {
//   const password ="melo"
//   const hashPassword = await bcrypt.hash(password,10)

//   console.log(password, hashPassword);
  
//   const result = await bcrypt.compare("meloo", hashPassword)
//   console.log(result); 
// }

// test()

// app.get('/:id', (req,res) => {
//   console.log(req.query.sortBy);
//   res.status(200).json({'id':req.params.id})
// })

// app.post('/', (req,res) => {
//   res.status(200).json(req.body)
// })

app.listen(3000, () => {
  console.log('server uprising on port 3000');
});
