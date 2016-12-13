// Translate one word into Pig Latin (ignore punctuation).
function pigify(str) {
	var finalString = "";
	var regex = /[aeiou]/gi;
	var index = 0;
	if (str[0].match(regex)) {
		finalString = str + "ay";
	} else {
		for (var k = 0; k < str.length; k++) {
			if (str[k].match(regex)) {
				finalString = str.slice(k, str.length) + str.slice(0,k) + "ay";
				break;
			}
		}
	}	
	return finalString;
}

//Determine if a word has a capital letter in it, if it does capitalize the first letter and make the rest lowercase. 
//If it is entirely in caps, leave it as is.
function capitalization(str) {
	var regex = /[A-Z]/g;
	var final;
	if (str === str.toUpperCase() || str === str.toLowerCase()) {
		return str;
	} else {
		for (var i = 0; i < str.length; i++) {
			if (str[i].match(regex)) {
				final = str.toLowerCase();
			}
		}
	}
	return final[0].toUpperCase() + final.slice(1);
}

// Take punctuation that should be at the end of the word (periods, commas, etc.) and move them there.
function punctuation(str) {
	var regex = /[!|?|.|,|:|;]/g;
	var arr = str.split("");
	var punc = "";
	for (var i = arr.length-1; i >= 0; i--) {
		if (arr[i].match(regex)) {
			punc += arr.splice(i, 1);
		}
	}
	return arr.join("") + punc;
}

// Return a string of Pig Latin.
function toPigLatin() {
	var str = document.form.input.value;	
	var finalString = "";
	var array = str.split(" ");
	var hyphen;
	var word;
	var index;
	var inner;
	var final;

	// Create an array of all the words in the string by splitting the string at spaces. If a word has a '-' or
	// a '/', split it at that character so you have an inner array.
	for (var i = 0; i < array.length; i++){
		word = array[i];
		if (word.search("-") > -1 || word.search("/") > -1) {
			index = word.search("-");
			if (index === -1) {
				index = word.search("/");
			}
			array[i] = [];
			array[i].push(word.slice(0, index), word[index], word.slice(index + 1));
		}
	}
	
	// Translate all individual words into Pig Latin and recombine hyphenated or slashed words. Correct 
	// the capitalization so that if a word started with a capital letter, the new first letter is now capitalized
	// and the rest are lower case.
	 for (var j = 0; j < array.length; j++) {
		word = array[j];
		if (Array.isArray(word)) {
			inner = "";
			for (var k = 0; k < word.length; k++) {
				if (word[k] === "-" || word[k] === "/") {
					word[k] === punctuation(capitalization(word[k]));
				} else {
					word[k] = punctuation(capitalization(pigify(word[k])));
				}
				inner += word[k];
			}
			array[j] = inner;
		} else {
			array[j] = punctuation(capitalization(pigify(word)));
		}
	}
	
	// Rejoin all the words in the string and add the string to the 'output' paragraph.
	final = array.join(" ");
	document.getElementById("output").innerHTML = final;
}
