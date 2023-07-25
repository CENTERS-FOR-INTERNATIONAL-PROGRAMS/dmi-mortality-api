const express = require('express')
const cors = require('cors')
const app = express()

const db = require('./connection')

app.use(cors())
//routes
app.get("/users", async (req, res) =>{
   // let filterUser = req.body.filter;
    const result = await db.getUsers();
    res.send(result)
})

app.get("/user/:id", async (req, res) =>{
    const id = req.params.id
    const User = await db.getUser(id)
    if(!User) res.status(404).send('User not found')
    res.send(User)

})

//middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

//const Port = process.env.PORT || 3306 
app.listen(8080 , () => {
    console.log(`Listening on port 8080`)
})