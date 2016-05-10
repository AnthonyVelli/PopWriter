import urllib
import requests
import nltk
import string
import os
import random
from collections import Counter
from nltk.corpus import stopwords
from nltk.corpus import movie_reviews
from nltk.tokenize import RegexpTokenizer
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.stem import PorterStemmer
from nltk.corpus import state_union
from nltk.tokenize import PunktSentenceTokenizer
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

def punkt_sent_tok():
	train_text = state_union.raw('2005-GWBush.txt')
	custom_sent_tokenizer = PunktSentenceTokenizer(train_text)
	tokenized = custom_sent_tokenizer.tokenize(script)
	def process_content():
		try:
			for i in tokenized:
				words = nltk.word_tokenize(i)
				tagged = nltk.pos_tag(words)
				return tagged
		except Exception as e:
			print(str(e))
	newCount = process_content()
	print(newCount, len(newCount))
	return newCount
# punkt_sent_tok()

################################################################

################################################################
# Analytics # 3

# stemmer = PorterStemmer()

# def stem_tokens(tokens, stemmer):
# 	stemmed = []
# 	for item in tokens:
# 		stemmed.append(stemmer.stem(item))
# 	return stemmed

# def tokenize(text):
# 	tokens = nltk.word_tokenize(text)
# 	stems = stem_tokens(tokens, stemmer)
# 	return stems

################################################################
# Analytics 4 
# Text Classifier for sentiment analysis 
# Positive versus negative 

def get_sentiment(someScript):
	r = requests.post("http://text-processing.com/api/sentiment/", data={'text': someScript})
	return r.text
sentiment = get_sentiment()

################################################################

# documents = [(list(movie_reviews.words(fileid)), category)
# 			for category in movie_reviews.categories()
# 			for fileid in movie_reviews.fileids(category)]

# random.shuffle(documents)

# all_words = []
# for words in movie_reviews.words():
# 	all_words.append(words.lower())

# all_words = nltk.FreqDist(all_words)
# word_features = list(all_words.keys())[:3000]

# def find_features(documents):
# 	words = set(documents)
# 	features = {}
# 	# if a word is in the top 3000 words
# 	for word in word_features:
# 		features[w] = (word in words)
# 	return features

# print((find_features()))






