const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());
app.use(express.static("build"));

app.use(morgan("tiny"));
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "Mum",
    number: "39-23-6423122",
  },
];
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const entries = persons.length;
  const currentDate = new Date();

  const HTMLResponse = `
  <p>Phonebook has info for ${entries} people </p>
  <p>${currentDate}</p>
`;
  response.send(HTMLResponse);
});
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).json({ error: "Person not found" });
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  //after deleting just post the phonenumbers not deleted
  persons = persons.filter((person) => person.id != id);
  response.status(204).end();
});
const generateId = () => {
  const maxId =
    persons.length > 0
      ? Math.max(...persons.map((n) => n.id)) //the three points to convert the array in individual numbers
      : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  // Check if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number is missing",
    });
  }

  // Check if the name already exists in the phonebook
  const existingPerson = persons.find((person) => person.name === body.name);
  if (existingPerson) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  // Create a new person object with a generated id
  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  // Add the new person to the persons array
  persons = persons.concat(newPerson);

  // Send the new person object as a response
  response.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
