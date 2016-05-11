

// get wordCount in a screenplay
var wordCount = (screenplay) => {
    var words = screenplay.split(/[^\w]+/gi);
    var frequencyMap = {}
    words.forEach((word) => {
        if(!frequencyMap[word]) {
            frequencyMap[word] = 0
        } else {frequencyMap[word] += 1}
    })
    return frequencyMap;
}

module.exports = {
	wordCount: wordCount
}