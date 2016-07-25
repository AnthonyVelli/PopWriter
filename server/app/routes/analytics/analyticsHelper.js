const sentiment = require('sentiment');
const natural = require('natural');
natural.PorterStemmer.attach();
const tokenizer = new natural.WordTokenizer();
const nlp = require('nlp-toolkit');
const Promise = require('bluebird');

module.exports.scenesToStrings = arrayOfScenes => {
	sceneMaster = [];
	arrayOfScenes.forEach(function(scene) {
		var charByScene = {};
		scene.forEach(function(comp) {
			if (comp[1]) {
				if (charByScene[comp[0]]) {
					charByScene[comp[0]] += (' '+comp[1]);
				} else {
					charByScene[comp[0]] = comp[1];
				}
			}
		});
		sceneMaster.push(charByScene);
	});
	return sceneMaster;

};

module.exports.sceneStringsToEmotion = arrayOfSceneStrings => {
	var emotion = {};
	arrayOfSceneStrings.forEach((scene, idx) => {
		for (var char in scene){
			var sentimentRes = sentiment(scene[char].tokenizeAndStem().join(' '));
			if (emotion[char]) {
				emotion[char].push({x: idx+1, y: sentimentRes.comparative, sentiment: sentimentRes});
			} else if (scene[char]) {
				emotion[char] = [];
				emotion[char].push({x: idx+1, y: sentimentRes.comparative, sentiment: sentimentRes});
			}
		}
	});
	return emotion;
};

module.exports.arrayOfStringsToEmotion = arrayOfStrings => {
	return arrayOfStrings.map((ele, idx) => {
		var sentimentRes = sentiment(ele.tokenizeAndStem().join(' '));
		return {x: idx+1, y: sentimentRes.comparative, sentiment: sentimentRes};
	});
};

module.exports.objectOfStringsToEmotion = objOfStrings => {
	var emotionArray = [];
	for (var x in objOfStrings) {
		if (objOfStrings[x]) {
			var sentimentRes = sentiment(objOfStrings[x].tokenizeAndStem().join(' '));
			emotionArray.push({x: parseInt(x)+1, y: sentimentRes.comparative, sentiment: sentimentRes});
		}
	}
	return emotionArray;
};

module.exports.processText = (textArr, stopwordsSupp) => {
	const TfIdf = new natural.TfIdf();
	console.log(stopwordsSupp.length);
	textArr = textArr.map(text => nlp.tokenizer(text).filter(word => word.length > 3));
	var tokenstopMap = textArr.map(text => {
		return nlp.stopwords(text, {additionalWords: {all: stopwordsSupp}})
		.then(processedTxt => {
			TfIdf.addDocument(processedTxt);
		});
	});
	return Promise.all(tokenstopMap)
	.then(all => {
		return TfIdf;
	});
};