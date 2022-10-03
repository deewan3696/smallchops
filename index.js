require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mysql = require(`mysql`)
const app = express()
const port = 8000


app.use(bodyParser.json())

const connection = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME,
    port : process.env.DATABASE_PORT
});
   
connection.connect();

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

const users = [
    {id:1,
    firstname:"Qudus",
    othername:"Adedokun",
    occupation:"Jobless",
    age:18
    },
    
    {id:2,
    firstname:"Jane",
    othername:"Adeoye",
    occupation:"Retired",
    age:53
    },

    {id:3,
     firstname:"Aliyah",
     othername:"Abolalo",
     occupation:"Doctor",
     age:26
     },
]

//get all customers
app.get("/customers",  (req, res)  => {
    res.status(201).send({
        message:`customers fetched successfully`,
        data:users
    })
})

//create a new customer
app.post("/customer", (req, res) => {
    //id,firstname,othername,occupation,age
    const id = users.length + 1
    const firstname = req.body.firstname
    const othername = req.body.othername
    const occupation = req.body.occupation
    const age = req.body.age

    if (!firstname || !othername || !occupation || !age) {
        res.status(400).send({
            message:"Please fill in all fields"
        })

    } else{
        const newUser = {
            id: id,
            firstname: firstname,
            othername: othername,
            occupation:occupation,
            age: age
        }
        users.push(newUser)

        res.status(201).send({
            message:"User created successfully",
            data:newUser
        })
    }
})

app.get(`/customers/:firstname/:othername`,(req,res) => {
    const {firstname,othername} = req.params

    res.send({
        message:`Customers Get Successfully`,
        data:{
            firstname: firstname,
            othername: othername
        }
    
    })
})
