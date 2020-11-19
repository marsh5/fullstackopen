// const { response } = require('express');
const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
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
    response.json(persons);
});

app.get(`/api/persons/:id`, (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(el => el.id === id);
    
    if(person){
        response.json(person);
    } else{
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(el => el.id !== id);

    response.status(204).end();
})

app.get('/info', (request, response) => {
    response.send(`<div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date()} </div>`);
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    console.log('this is body:', body);

    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000),
    }

    response.json(persons.concat(person));
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})