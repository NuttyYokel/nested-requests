const express = require("express");
var cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const books = [
  {
    name: "A horror story",
    year: "1998",
    author: {
      name: "Jake Meiad",
      age: 32
    }
  },
  {
    name: "Margaret in the garden",
    year: "1987",
    author: {
      name: "Louis Ifes",
      age: 87
    }
  },
  {
    name: "Murder in the lavender field",
    year: "1999",
    author: {
      name: "Peter Hoggins",
      age: 45
    }
  }
];

const persons = [
  {
    name: "Jake Meiad",
    age: 32,
    nationality: "MK",
    married: true
  },
  {
    name: "Louis Ifes",
    age: 87,
    nationality: "FR",
    married: false
  },
  {
    name: "Peter Hoggins",
    age: 45,
    nationality: "UK",
    married: true
  }
];

const nationalities = [
  {
    code: "MK",
    name: "Macedon"
  },
  {
    code: "FR",
    name: "French"
  },
  {
    code: "UK",
    name: "Irish"
  }
];

app.get("/books", (request, response) => {
  response.send(books);
});

app.get("/persons", (request, response) => {
  response.send(persons);
});

app.post("/nationality", (request, response) => {
  const { code } = request.body;
  response.send(nationalities.find(nationality => nationality.code === code));
});

app.get("/", (request, response) => {
  response.send("Hello from Express!");
});

app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
