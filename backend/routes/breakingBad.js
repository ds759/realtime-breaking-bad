const router = require("express").Router();
const axios = require("axios");
const config = require("./breakingBadConfig");
const socket = require("../socketioAPI");

router.get("/", function(req, res, next) {
	setInterval(updatePageWithRandomCharacter, config.UPDATE_TIME);
	res.render("index", { title: "Breaking Bad Page" });
});

const updatePageWithRandomCharacter = () => {
	createCharacter().then(character => socket.push(config.namespace, character));
};

const createCharacter = async () => {
	const characterId = getRandomCharacterId();
	return getCharacterDetails(characterId);
};

const getRandomCharacterId = () => {
	return Math.floor(Math.random() * (LAST_ID = 54)) + (FIRST_ID = 1);
};

const getCharacterDetails = async characterId => {
	const bio = await queryAPI(config.getProfileURL(characterId));
	const { quote } = await queryAPI(config.getQuoteURL(bio));
	const { deathCount: kills } = await queryAPI(config.getKillURL(bio));
	return { bio, quote, kills };
};

const queryAPI = async resource => {
	const response = await axios.get(config.createEndpoint(resource));
	return response.data[0] || { name: [], quote: [], deathCount: [] };
};

module.exports = router;
