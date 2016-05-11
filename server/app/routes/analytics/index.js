'use strict';

const router = require('express').Router();
const sentiment = require('sentiment');
const natural = require('natural');

module.exports = router;

// make an array of sentences from the text and then
// then do a loop over the array and pass each sentence into the sentiment function
// save result into new array

// var test1 = sentiment(words)
// console.log(test1)

router.get('/', (req, res, next) => {
	if(!req.user) res.sendStatus(403)
	else {
		Character.find({})
		.then(characters => res.json(characters))
		.catch(next);
	};
});

var textSample = `FROM fairest creatures we desire increase,
That thereby beauty's rose might never die,
But as the riper should by time decease,
His tender heir might bear his memory:
But thou, contracted to thine own bright eyes,
Feed'st thy light'st flame with self-substantial fuel,
Making a famine where abundance lies,
Thyself thy foe, to thy sweet self too cruel.
Thou that art now the world's fresh ornament
And only herald to the gaudy spring,
Within thine own bud buriest thy content
And, tender churl, makest waste in niggarding.
Pity the world, or else this glutton be,
To eat the world's due, by the grave and thee.`

