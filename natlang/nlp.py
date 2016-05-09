

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

stop_words = set(stopwords.words('english'))
# returns text that is lowercase 
def get_Text(): 
        with open('/Users/navjotsingh/Dropbox/FullStackMain/PopWriter/natlang/shakespeare.txt', 'r') as film:
                plainText = film.read()
                lowers = plainText.lower()
                return lowers
sampleText = get_Text()
# tokenize words
words = word_tokenize(sampleText)

filtered_sentence = []

for word in words: 
	if word not in stop_words:
		filtered_sentence.append(words)
print(filtered_sentence)


	
