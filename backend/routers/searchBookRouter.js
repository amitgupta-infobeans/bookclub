const express = require("express");
const { searchBookTitle,searchAllBooks } = require("../controllers/SearchBook");
const searchBookRouter = express.Router();

searchBookRouter.get("/", searchBookTitle);
searchBookRouter.get("/books", searchAllBooks);

module.exports = { searchBookRouter };
