//express
const express = require("express");
const app = express();
const port = 5555;
app.use(express.urlencoded({ extended: false })); //to parse the body that has the data sent from the frontend.

//handlebars
const exphbs = require("express-handlebars");
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine({ defaultLayout: false }));

//imports
let BOOKS_DATA = require("./data.js");

// routing
app.get("/", (req, res) => {
  res.render("home");
});
// get all
app.get("/books", (req, res) => {
  res.render("books", { BOOKS_DATA });
});

// post
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  BOOKS_DATA.push({
    id: (BOOKS_DATA.length + 1).toString(),
    title: title,
    author: author,
  });

  res.render("books", { BOOKS_DATA });
  // note: could be improved performance-wise by sending html that has the data of the new book instead of sending the whole updated list.
});

//delete
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  BOOKS_DATA = BOOKS_DATA.filter((book) => book.id !== id);

  res.status(200).render("books", { BOOKS_DATA });
});

// app.delete("/books/:id", (req, res) => {
//   const id = req.params.id;
//   const idx = BOOKS_DATA.findIndex((book) => book.id === id);
//   BOOKS_DATA.splice(idx, 1);

//   res.status(200).send("");

//   //for this to work we have to change the target to closist li instead of closist ul in the htmx
// });

// stupid research by id
app.post("/single-book", (req, res) => {
  const { id } = req.body;
  const book = BOOKS_DATA.filter((book) => book.id === id)[0];

  res.render("singlebook", { book });
});

//editing

app.get("/edit-form/:id", (req, res) => {
  const { id } = req.params;
  res.render("edit-form", { id });
});

app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  BOOKS_DATA[+id - 1].id = id;
  BOOKS_DATA[+id - 1].title = title;
  BOOKS_DATA[+id - 1].author = author;
  // Note: had the id numbers were random we would have had to use findIndex()

  res.render("books", { BOOKS_DATA });
  // note: could be improved performance-wise by sending html that has the data of the edited book instead of sending the whole updated list.
  // aslo try making the input fields prepopulated by the old values
});

// better search
app.post("/books/search", (req, res) => {
  const searchText = req.body.search.toLowerCase(); // the name of the key in the body object is the value of the name attribute in the html.
  const matches = BOOKS_DATA.filter((b) =>
    b.title.toLowerCase().includes(searchText)
  );

  // res.render("books", { BOOKS_DATA });
  res.render("books", { matches });
});

app.listen(port, () => {
  console.log(`listening on port ${port} `);
});

// uselsess comment
