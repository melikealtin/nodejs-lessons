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
