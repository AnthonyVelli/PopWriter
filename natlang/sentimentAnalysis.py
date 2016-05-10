import requests, nltk, string, os
from collections import Counter
from nltk.corpus import stopwords, state_union
from nltk.tokenize import sent_tokenize, word_tokenize, RegexpTokenizer, PunktSentenceTokenizer
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.stem.porter import PorterStemmer

stop = stopwords.words('english')
tokenizer = RegexpTokenizer(r'\w+')
ps = PorterStemmer()

# PreProcessing of Data
# log(Num of documents in a courpus / num of documents that contain a term)

# This just opens a scripts and converts it to lowercase text
def get_script():
	# this will need to get refactored to handle non manual entered scripts
	with open('/Users/navjotsingh/Dropbox/FullStackMain/PopWriter/natlang/shakespeare.txt', 'r') as film:
		text = film.read()
		lowers = text.lower()
		return lowers
script = get_script()

################################################################
# ANALYTICS #1 this tokenizes words and shows how often they appear 
# This also takes away any punctutation a script might have
mainHolder = ""
def get_tokens():
	global mainHolder
	no_punctutation = tokenizer.tokenize(script)
	for i in no_punctutation:
		mainHolder += i
		mainHolder += " "
	tokens = nltk.word_tokenize(mainHolder)
	return tokens
tokens = get_tokens()
count = Counter(tokens)
# print("MOST COMMON before stopwords", count.most_common(10))

#this will remove stop words
def remove_stop_words():
	holder = []
	for i in tokens:
		if i not in stop:
			holder.append(i)
	return holder
usefulWords = remove_stop_words()
count = Counter(usefulWords)
# print("After STOPWORDS filter", count.most_common(100))

################################################################

# porterStemmer: removing ing from words n such
# part of speech tagging

################################################################
# Currently NOT WORKING... only returns a small sample of actual text
# ANALYTICS # 2
# PunktSentenceTokenizer is unsupervised ML tokenizer
# comes pretrained 

# def punkt_sent_tok():
# 	train_text = state_union.raw('2005-GWBush.txt')
# 	custom_sent_tokenizer = PunktSentenceTokenizer(train_text)
# 	tokenized = custom_sent_tokenizer.tokenize(script)
# 	def process_content():
# 		try:
# 			for i in tokenized:
# 				words = nltk.word_tokenize(i)
# 				tagged = nltk.pos_tag(words)
# 				return tagged
# 		except Exception as e:
# 			print(str(e))
# 	newCount = process_content()
# 	print(newCount, len(newCount))
# 	return newCount
# # punkt_sent_tok()

################################################################

################################################################
# Analytics 4 
# Sends request out to API for sentiment of overall script

def get_sentiment(someScript):
	r = requests.post("http://text-processing.com/api/sentiment/", data={'text': someScript})
	print(r.text)
sentiment = get_sentiment("")

################################################################







