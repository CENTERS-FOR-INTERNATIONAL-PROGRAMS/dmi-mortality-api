const express = require('express')
const cors = require('cors')
const app = express()

const connect = require('./connection')

app.use(cors())
//routes
app.get("/api/allrecords", async (req, res) =>{
   // let filterUser = req.body.filter;
    const result = await connect.getUsers();
    res.send(result)
})

app.get("/api/allrecords/:genderId", async (req, res) =>{
    const genderId = req.params.genderId
    const User = await connect.getUsersByGender(genderId)
    if(!User) res.status(404).send('No gender data found')
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