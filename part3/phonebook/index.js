require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require('cors')

const app = express()
//adding a cors middleware to allow communication aross different origins (server: 3001 browser: 5173)
app.use(cors())
app.use(express.json())
const Person = require("./models/person")



//the dist folder cointannins the production build of the frontend
//express fetches the html and the javascript using the static middleware
//if the HTTP GET request finds the correct file, it then returns it
app.use(express.static('build'))

//define middleware to show requests body
/*app.use((request,response,next)=> {
    console.log("Method: ",request.method)
    console.log("Path: ",request.path)
    console.log("Body: ",request.body)
    console.log("--------------------")
    next()
})*/

morgan.token("body",(request) => {
    console.log("morgan")
    return JSON.stringify(request.body)
})
//app.use(express.json())
//morgan predefined string format
app.use(morgan("tiny"))

let persons =  [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



app.get("/info", (req,res) => {
    const date = new Date()
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <br>
        <p>${date}</p>`
    )
    .catch(error => next(error))
})



app.get("/api/persons" , (req,res) => {
    Person
    .find({})
    .then(persons => {
        return res.json(persons)
    })
    .catch(error => next(error))
})

app.get("/api/persons/:id",(req,res,next) => {
    console.log(`api/persons/${req.params.id}`)
    Person.findById(req.params.id)
    .then(person => {
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
    })
    .catch(error => next(error))
    /*.catch(error => {
    console.log(error)
    res.status(400).send({ error: 'malformatted id' })
    })*/
})

app.delete("/api/persons/:id",(req,res,next) => {
    /*const id = Number(req.params.id)
    const person = people.filter(p => p.id === id)
    people = people.filter(p => p.id !== id)
    console.log("person to delete",person)
    console.log(people)
    res.status(204).end()*/
    console.log("id to be deleted",req.params.id)
    Person.findByIdAndDelete(req.params.id)
    .then(result => {
      return res.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

const postMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')

app.post("/api/persons",(req,res)=> {
    let person = req.body
    console.log("post req.body",person)
    //let id = generateId()
    const alreadyAdded = persons.map(p => p.name)

    if(!req.body.name || !req.body.number) {
        return response.status(400).json({
            error: 'missing name or number'
        })
    } else if(alreadyAdded.includes(person.name)) {
        console.log("Already added contact or empty name")
        return res.status(400).json({ 
            error: 'name must be unique' 
          })
    }else {
        /*person = { id:id , ...person}
        console.log("person added in the backend ",person)
        console.log(people)
        people.push(person)*/

        const p = new Person({
            //id: generateId(),
            name: person.name,
            number: person.number
        })
        p.save().then(person => {
            console.log('person saved!')
            res.json(person)
        })
    }
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const person = {
      name: body.name,
      number: body.number,
    }
    console.log("person to update backend", person)
    console.log("id to find to update", req.params.id)
    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query'  })
      .then(updatedPerson => {
        res.json(updatedPerson)
      })
      .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  // handler of requests with unknown endpoint
  app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }
  
    next(error)
  }
  
// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})