const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'new-default-view'))

app.use(expressLayouts)
app.set('layout', path.resolve(__dirname, 'new-default-view/layout-new'))

app.get('/', (req, res) => {
    // res.send({
    //     message: 'merhaba'
    // })

    // res.sendFile(path.resolve(__dirname, 'index.html'))

    const peopleArray = [
        {name:'melo', id:1},
        {name:'melo2', id:2},
        {name:'melo3', id:3},
        {name:'melo4', id:4},
    ]

    const lessonName = 'Node JS'
    const age = 25
    const colors = ['red', 'blue',' yellow']
    const content = "<h1>title</h1> <p>paragraph"

    res.render('index', {
        layout: './layout-new/new.ejs',
        people: peopleArray,
        lesson : lessonName,
        age,
        colors,
        content
    })
})

app.listen(3000, () => {
    console.log("the server started on port 3000");
})