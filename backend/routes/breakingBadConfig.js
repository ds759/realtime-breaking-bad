module.exports = {
	namespace: "breaking bad",

	UPDATE_TIME: 2000,

	createEndpoint: resource => {
		return `https://www.breakingbadapi.com/api/${resource}`;
	},

	getProfileURL: characterId => {
		return `characters/${characterId}`;
	},

	getQuoteURL: bio => {
		return `quote/random?author=${encode(bio.name)}`;
	},

	getKillURL: bio => {
		return `death-count?name=${encode(bio.name)}`;
	}
};

const encode = name => name.replace(/\s/g, "+");
