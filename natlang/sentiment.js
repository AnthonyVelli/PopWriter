
const fs = require("fs")
const sentiment = require('sentiment');



// make an array of sentences from the text and then
// then do a loop over the array and pass each sentence into the sentiment function
// save result into new array
var words = "death of death"

var test1 = sentiment(words)
console.log(test1)