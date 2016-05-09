import nltk
import string
from collections import Counter
from nltk.corpus import stopwords
from nltk.tokenize import RegexpTokenizer
from nltk.tokenize import sent_tokenize, word_tokenize

stop = stopwords.words('english')
tokenizer = RegexpTokenizer(r'\w+')

# log(Num of documents in a courpus / num of documents that contain a term)

def get_tokens():
	# this will need to get refactored to handle non manual entered scripts
	with open('/Users/navjotsingh/Dropbox/FullStackMain/PopWriter/natlang/shakespeare.txt', 'r') as film:
		text = film.read()
		lowers = text.lower()
		no_punctutation = tokenizer.tokenize(lowers)
		holder = ""
		for i in no_punctutation:
			holder += i
			holder += " "
		tokens = nltk.word_tokenize(holder)
		return tokens

tokens = get_tokens()
print(tokens)
count = Counter(tokens)
# print("MOST COMMON before stopwords", count.most_common(10))

#this will remove stop words
holder = []
for i in tokens:
	if i not in stop:
		holder.append(i)
count = Counter(holder)
# print("After STOPWORDS filter", count.most_common(100))
# print(sent_tokenize(tokens))
