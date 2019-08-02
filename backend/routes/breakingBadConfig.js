module.exports = {
	namespace: "breaking bad",

	createEndpoint: resource => {
		return `https://www.breakingbadapi.com/api/${resource}`;
	},

	getCharacterURL: characterId => {
		return `characters/${characterId}`;
	},

	getQuoteURL: bio => {
		return `quote/random?author=${encode(bio.name)}`;
	},

	getKillURL: bio => {
		return `death-count?name=${encode(bio.name)}`;
	}
};

const encode = name => {
	return name.replace(/ /g, "+");
};
