require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const Person = require('./models/person');


// Configure morgan to log body of POST request
morgan.token('person', (req) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
    return null
  })
app.use(express.static('build'))
app.use(express.json());

app.use(
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :person',
    ),
  )

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-12345634"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-342432"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-423234"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-2482-23824"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
      })
});

app.get(`/api/persons/:id`, (request, response) => {
    const id = Number(request.params.id);
     Person.findById(request.params.id).then(person => {
        if(person){
            console.log(person);
            response.json(person);
        } else{
            response.status(404).end();
        }
      })
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Person.countDocuments({}).then(el => {
        response.send(`<div>Phonebook has info for ${el} people</div>
    <div>${new Date()} </div>`)
    })
    
});

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    console.log('this is body:', body);

    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person( {
        name: body.name,
        date: new Date(),
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson);
    })
    .catch(error => next(error));
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => next(error));
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})