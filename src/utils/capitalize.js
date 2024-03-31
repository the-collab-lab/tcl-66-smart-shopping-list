const capitalizeFirstLetterOfEachWord = (str) => {
	// Split the string into words
	const words = str?.split(' ');

	// Capitalize the first letter of each word
	const capitalizedWords = words?.map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});

	// Join the words back into a single string
	return capitalizedWords?.join(' ');
};

export default capitalizeFirstLetterOfEachWord;
