const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  if(req.body.username && req.body.password ){

    if ( users.username !=req.body.username){
      users[req.body.username] = {
          "username":req.body.username,
          "password":req.body.password,
          //Add similarly for DOB
          }
          res.status(300).json({message: "User has been added"})
  }else{
    return res.status(300).json({message: "username alredy exists"});
  }

}else{
  return res.status(300).json({message: "User has been registered"});
}
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filteredBooks = [];
  for(let i = 1; i <= 10 ; i++){
    if (books[i].author == author){
      filteredBooks.push(books[i])
    }
  }
  res.send(JSON.stringify(filteredBooks))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filteredBooks = [];
  for(let i = 1; i <= 10 ; i++){
    if (books[i].title == title){
      filteredBooks.push(books[i])
    }
  }
  res.send(JSON.stringify(filteredBooks))
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews)
});

module.exports.general = public_users;
