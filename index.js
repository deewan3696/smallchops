const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 8000


app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.post('/customer/new', (req, res) => {
    // firstname ,lastname,email,password,

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const password = req.body.password

    if (!firstname || !lastname || !email || !password) {
        res.status(400).send({
        message:`Please fill all fields`
    })
} else {
     //going to create a new user 
    console.log(`data :${firstname} :${lastname} :${email} :${password}`)
    res.status(201).send({
        message:`customer created successfully`
    })

}

    // const data = {
    //     "firstname" :""
    //     "lastname" :""
    //     "email" :""
    //     "password" :""
    // }

});